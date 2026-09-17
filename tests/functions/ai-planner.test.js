import test from "node:test";
import assert from "node:assert/strict";
import { createHandler, validatePlannerInterpretation } from "../../netlify/functions/ai-planner.js";
const request = {
  httpMethod: "POST",
  body: JSON.stringify({
    requirements: "restaurant website with booking",
    service: "Business Website",
  }),
};
const geminiOk = {
  ok: true,
  status: 200,
  json: async () => ({
    candidates: [
      {
        content: {
          parts: [
            {
              text: JSON.stringify({
                summary: "Safe summary",
                suggestedFeatures: ["booking", "bad"],
                contentComplexity: "high",
                functionalComplexity: "high",
                interactionComplexity: "medium",
              }),
            },
          ],
        },
      },
    ],
  }),
};
const groqOk = {
  ok: true,
  status: 200,
  json: async () => ({
    choices: [
      {
        message: {
          content: JSON.stringify({
            summary: "Groq summary",
            suggestedFeatures: ["booking"],
            contentComplexity: "medium",
            functionalComplexity: "high",
            interactionComplexity: "low",
          }),
        },
      },
    ],
  }),
};
function clear() {
  delete process.env.GEMINI_API_KEY;
  delete process.env.GROQ_API_KEY;
}
test("normalizes IDs, complexity, and strips HTML markers", () => {
  const value = validatePlannerInterpretation({
    summary: "<b>Hello</b>",
    suggestedFeatures: ["booking", "bad", "booking"],
    contentComplexity: "high",
    functionalComplexity: "invalid",
  });
  assert.deepEqual(value.suggestedFeatures, ["booking"]);
  assert.equal(value.functionalComplexity, "medium");
  assert.equal(value.summary.includes("<"), false);
});
test("removes valid feature IDs that belong to another service", () => {
  const value = validatePlannerInterpretation(
    {
      suggestedFeatures: ["booking", "ai_chatbot", "whatsapp"],
    },
    "Business Website",
  );
  assert.deepEqual(value.suggestedFeatures, ["booking", "whatsapp"]);
});
test("missing both provider keys returns manual fallback", async () => {
  clear();
  const result = await createHandler({
    fetchImpl: async () => {
      throw new Error("not called");
    },
  })(request);
  assert.equal(result.statusCode, 503);
  assert.match(JSON.parse(result.body).message, /Manual selections/);
});
test("missing Gemini key uses Groq when configured", async () => {
  clear();
  process.env.GROQ_API_KEY = "groq-test";
  const result = await createHandler({ fetchImpl: async () => groqOk })(
    request,
  );
  assert.equal(result.statusCode, 200);
  assert.equal(JSON.parse(result.body).provider, "groq");
  clear();
});
test("Gemini retries temporary errors then falls back to Groq", async () => {
  clear();
  process.env.GEMINI_API_KEY = "gemini-test";
  process.env.GROQ_API_KEY = "groq-test";
  let calls = 0;
  const delays = [];
  const result = await createHandler({
    fetchImpl: async () => {
      calls++;
      return calls <= 3 ? { ok: false, status: 503 } : groqOk;
    },
    sleep: async (ms) => delays.push(ms),
  })(request);
  assert.equal(calls, 4);
  assert.deepEqual(delays, [100, 200]);
  assert.equal(JSON.parse(result.body).provider, "groq");
  clear();
});
test("Gemini authentication failure is not retried before Groq", async () => {
  clear();
  process.env.GEMINI_API_KEY = "bad";
  process.env.GROQ_API_KEY = "groq-test";
  let calls = 0;
  const result = await createHandler({
    fetchImpl: async () =>
      ++calls === 1 ? { ok: false, status: 401 } : groqOk,
    sleep: async () => assert.fail("should not retry"),
  })(request);
  assert.equal(calls, 2);
  assert.equal(JSON.parse(result.body).provider, "groq");
  clear();
});
test("both providers failing returns client-safe fallback", async () => {
  clear();
  process.env.GEMINI_API_KEY = "gemini-test";
  process.env.GROQ_API_KEY = "groq-test";
  const result = await createHandler({
    fetchImpl: async () => ({ ok: false, status: 500 }),
    sleep: async () => {},
  })(request);
  assert.equal(result.statusCode, 503);
  clear();
});
test("malformed Gemini and Groq responses fail safely", async () => {
  clear();
  process.env.GEMINI_API_KEY = "gemini-test";
  process.env.GROQ_API_KEY = "groq-test";
  let calls = 0;
  const malformed = {
    ok: true,
    status: 200,
    json: async () =>
      calls === 1
        ? { candidates: [{ content: { parts: [{ text: "not json" }] } }] }
        : { choices: [{ message: { content: "also bad" } }] },
  };
  const result = await createHandler({
    fetchImpl: async () => {
      calls++;
      return malformed;
    },
    sleep: async () => {},
  })(request);
  assert.equal(result.statusCode, 503);
  clear();
});
test("valid Gemini response remains primary", async () => {
  clear();
  process.env.GEMINI_API_KEY = "gemini-test";
  process.env.GROQ_API_KEY = "groq-test";
  const result = await createHandler({ fetchImpl: async () => geminiOk })(
    request,
  );
  const body = JSON.parse(result.body);
  assert.equal(body.provider, "gemini");
  assert.deepEqual(body.suggestedFeatures, ["booking"]);
  clear();
});
