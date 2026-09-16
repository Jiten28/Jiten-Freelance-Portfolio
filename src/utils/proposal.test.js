import test from "node:test";
import assert from "node:assert/strict";
import {
  buildProjectSummary,
  buildProposalHtml,
  getProposalFeatureNames,
} from "./proposal.js";
import { estimateProject } from "../pricing/quoteEngine.js";
const data = {
  proposalId: "JCC-2026-000001",
  createdAt: "2026-09-16T10:00:00Z",
  clientName: "Jiten",
  clientEmail: "client@example.com",
  phone: "9876543210",
  businessType: "Laxy",
  service: "Graphic Menu Design",
  designDirection: "Minimal Menu",
  graphicMenuDesign: "Minimal Menu",
  designStyle: "minimal-menu",
  pageCount: "1",
  selectedFeatures: "social_version,custom_icons",
  aiSuggestedFeatures: "custom_icons,multiple_languages,unknown",
  requirementsText: "Create a concise restaurant menu.",
  clientBudgetRange: "2000-5000",
  startDate: "2026-09-17",
  targetDate: "2026-09-25",
  contentComplexity: "low",
  functionalComplexity: "low",
  interactionComplexity: "low",
  designComplexity: "low",
  signature: "data:image/png;base64,aGVsbG8=",
};
data.estimate = estimateProject(data);
test("proposal combines and deduplicates accepted manual and AI features", () => {
  assert.deepEqual(getProposalFeatureNames(data), [
    "Mobile / Social Version",
    "Custom Icons / Illustrations",
    "Additional Language",
  ]);
});
test("project summary uses client terminology and actual scope", () => {
  const summary = buildProjectSummary(data);
  assert.match(summary, /Graphic Menu Design/);
  assert.match(summary, /1-page scope/);
  assert.match(summary, /Laxy/);
  assert.match(summary, /Minimal Menu/);
  assert.match(summary, /8 working days/);
  assert.doesNotMatch(summary, /social_version|custom_icons/);
});
test("proposal has exactly two sheets and one feature section", () => {
  const html = buildProposalHtml(data);
  assert.equal((html.match(/<main class="sheet/g) || []).length, 2);
  assert.equal(
    (html.match(/Selected Features &amp; Add-ons/g) || []).length,
    1,
  );
  assert.match(html, /class="item wide requirements"/);
  assert.match(html, /Client signature/);
  assert.doesNotMatch(html, />FEATURES<|>ADD-ONS</);
  assert.doesNotMatch(html, /slice\(0,\s*7\)/);
  assert.match(html, /function paginateProposal/);
  assert.match(html, /Business \/ Project/);
  assert.match(html, /Graphic Menu Design/);
  assert.doesNotMatch(
    html,
    /Content Scope|Functional Scope|Interaction Scope|Design Scope/,
  );
});
test("bundle proposal keeps Website Style and Digital Menu Design separate", () => {
  const bundle = {
    ...data,
    service: "Website + Digital Menu",
    websiteStyle: "Glassmorphism, Minimalistic",
    digitalMenuDesign: "Modern Cafe",
    graphicMenuDesign: "",
  };
  const html = buildProposalHtml(bundle);
  assert.match(html, /Website Style/);
  assert.match(html, /Glassmorphism, Minimalistic/);
  assert.match(html, /Digital Menu Design/);
  assert.match(html, /Modern Cafe/);
});
