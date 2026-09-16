import test from "node:test";
import assert from "node:assert/strict";
import {
  estimateProject,
  compareBudget,
  getAcceptedFeatureIds,
  getDigitalMenuVolume,
} from "./quoteEngine.js";
import { serviceTypes, menuDirections } from "../data/menuDirections.js";
const base = {
  startDate: "2026-09-17",
  targetDate: "2026-09-25",
  contentComplexity: "low",
  functionalComplexity: "low",
  interactionComplexity: "low",
  designComplexity: "low",
};
test("preserves requested service order and seven asset-backed directions", () => {
  assert.deepEqual(serviceTypes, [
    "AI / Interactive Experience",
    "Business Website",
    "Custom Digital Solution",
    "Digital Menu",
    "Graphic Menu Design",
    "Website + Digital Menu",
    "Other",
  ]);
  assert.deepEqual(
    menuDirections.slice(0, 7).map((x) => x.id),
    [
      "modern-cafe",
      "premium-restaurant",
      "minimal-contemporary",
      "modern-indian-restaurant",
      "laundry-dry-cleaning",
      "salon-beauty",
      "local-service-business",
    ],
  );
  assert.equal(menuDirections[7].id, "custom-menu-design");
});
test("preserves service matrices and graphic page pricing", () => {
  assert.equal(
    estimateProject({ ...base, service: "Graphic Menu Design", pageCount: 1 })
      .basePrice,
    999,
  );
  assert.equal(
    estimateProject({ ...base, service: "Graphic Menu Design", pageCount: 6 })
      .basePrice,
    4500,
  );
  assert.equal(
    estimateProject({
      ...base,
      service: "Digital Menu",
      selectedFeatures: "qr_access,whatsapp",
    }).featureCost,
    300,
  );
  assert.equal(
    estimateProject({ ...base, service: "Business Website", pageCount: 3 })
      .pageCost,
    0,
  );
  assert.equal(
    estimateProject({ ...base, service: "Business Website", pageCount: 5 })
      .pageCost,
    4000,
  );
  assert.equal(
    estimateProject({
      ...base,
      service: "Website + Digital Menu",
      pageCount: 3,
    }).basePrice,
    17999,
  );
  assert.equal(
    estimateProject({ ...base, service: "Custom Digital Solution" }).basePrice,
    35000,
  );
});
test("maps menu items to deterministic volume and estimated pages", () => {
  assert.deepEqual(getDigitalMenuVolume(10, 3), {
    items: 10,
    categories: 3,
    estimatedPages: 1,
    amount: 0,
    label: "1–10 menu items",
    additionalCategories: 0,
  });
  assert.equal(getDigitalMenuVolume(25, 3).estimatedPages, 2);
  assert.equal(getDigitalMenuVolume(50, 3).amount, 1000);
  const huge = getDigitalMenuVolume(151, 8);
  assert.equal(huge.estimatedPages, 8);
  assert.equal(huge.additionalCategories, 5);
  assert.ok(huge.amount > 1500);
});
test("numeric menu scope prevents content feature double counting", () => {
  const e = estimateProject({
    ...base,
    service: "Digital Menu",
    menuItemCount: "40",
    menuCategoryCount: "5",
    selectedFeatures: "large_content,additional_category",
  });
  assert.equal(e.featureCost, 0);
  assert.equal(e.estimatedMenuPages, 3);
  assert.equal(e.contentVolumeCost, 1600);
});
test("design direction weights are modest and configurable", () => {
  const minimal = estimateProject({
      ...base,
      service: "Digital Menu",
      selectedMenuTemplate: "minimal-contemporary",
    }),
    custom = estimateProject({
      ...base,
      service: "Digital Menu",
      selectedMenuTemplate: "custom-menu-design",
    }),
    graphic = estimateProject({
      ...base,
      service: "Graphic Menu Design",
      pageCount: 1,
      designStyle: "premium-restaurant",
    });
  assert.equal(minimal.designWeightCost, 100);
  assert.equal(custom.designWeightCost, 500);
  assert.equal(graphic.designWeightCost, 300);
});
test("ranged feature replaces matching global complexity surcharge", () => {
  const ranged = estimateProject({
      ...base,
      service: "Business Website",
      selectedFeatures: "booking",
      functionalComplexity: "high",
    }),
    plain = estimateProject({
      ...base,
      service: "Business Website",
      functionalComplexity: "high",
    });
  assert.equal(ranged.featureCost, 7000);
  assert.equal(ranged.complexityCost, 0);
  assert.equal(plain.complexityCost, 5000);
});
test("deduplicates manual and accepted AI feature IDs", () => {
  assert.deepEqual(
    getAcceptedFeatureIds({
      selectedFeatures: "booking,whatsapp",
      aiSuggestedFeatures: "booking,ai_chatbot,unsupported",
    }),
    ["booking", "whatsapp", "ai_chatbot"],
  );
});
test("priority, budget, and custom review behavior remain intact", () => {
  const priority = estimateProject({
    ...base,
    service: "Digital Menu",
    targetDate: "2026-09-23",
  });
  assert.equal(priority.workingDays, 6);
  assert.equal(priority.urgencyCost, 500);
  assert.match(
    compareBudget(
      { clientBudgetRange: "under-2000" },
      estimateProject({ ...base, service: "Business Website" }),
    ),
    /below/,
  );
  const large = estimateProject({
    ...base,
    service: "AI / Interactive Experience",
    functionalComplexity: "high",
    interactionComplexity: "high",
    selectedFeatures:
      "ai_api,ai_chatbot,ai_recommendation,ai_content,api_integration,webgl,advanced_3d,custom_interactions",
  });
  assert.ok(large.min > 100000);
  assert.equal(large.label, "Custom Project Review");
  assert.match(large.internalLabel, /₹/);
});
