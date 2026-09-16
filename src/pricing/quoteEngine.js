import { budgetRanges } from "./budgetRanges.js";
import {
  CUSTOM_REVIEW_THRESHOLD,
  featureCatalog,
  knownFeatureIds,
  pricingConfig,
  serviceFeatureIds,
} from "./pricingRules.js";
import { countWorkingDays } from "../utils/workdays.js";
export const formatINR = (n) =>
  n == null ? "Discuss requirements" : "₹" + Number(n).toLocaleString("en-IN");
const level = (v) => (["low", "medium", "high"].includes(v) ? v : "medium");
const positiveInt = (v) => {
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : 0;
};
export function getAcceptedFeatureIds(data = {}) {
  const allowed =
    data.service && serviceFeatureIds[data.service]
      ? new Set(serviceFeatureIds[data.service])
      : new Set(knownFeatureIds);
  return [
    ...new Set(
      [
        ...(Array.isArray(data.selectedFeatures)
          ? data.selectedFeatures
          : String(data.selectedFeatures || "").split(",")),
        ...(Array.isArray(data.aiSuggestedFeatures)
          ? data.aiSuggestedFeatures
          : String(data.aiSuggestedFeatures || "").split(",")),
      ].filter((id) => allowed.has(id)),
    ),
  ];
}
export function getDigitalMenuVolume(itemValue, categoryValue) {
  const items = positiveInt(itemValue),
    categories = positiveInt(categoryValue);
  if (!items)
    return {
      items: 0,
      categories,
      estimatedPages: 0,
      amount: 0,
      label: "Not specified",
      additionalCategories: 0,
    };
  const fixed = pricingConfig.digitalMenuVolume.tiers.find(
    (t) => items >= t.min && items <= t.max,
  );
  let estimatedPages, amount, label;
  if (fixed) {
    ({ estimatedPages, amount, label } = fixed);
  } else {
    const v = pricingConfig.digitalMenuVolume.veryLarge;
    estimatedPages = Math.max(
      v.minimumPages,
      Math.ceil(items / v.itemsPerPage),
    );
    amount =
      v.baseAmount +
      Math.max(0, estimatedPages - v.minimumPages) * v.perAdditionalPage;
    label = v.label;
  }
  const additionalCategories = Math.max(
    0,
    categories - pricingConfig.digitalMenuVolume.includedCategories,
  );
  amount +=
    additionalCategories * pricingConfig.digitalMenuVolume.additionalCategory;
  return {
    items,
    categories,
    estimatedPages,
    amount,
    label,
    additionalCategories,
  };
}
function rangedAmount(feature, data, service) {
  let value = feature[1];
  if (value && typeof value === "object" && !Array.isArray(value))
    value = value[service] ?? value.default ?? 0;
  if (!Array.isArray(value)) return value || 0;
  const axis = feature[2] || "functional",
    selected = level(data[axis + "Complexity"]);
  return selected === "low"
    ? value[0]
    : selected === "high"
      ? value[1]
      : Math.round((value[0] + value[1]) / 2);
}
function baseFor(data, service) {
  if (service === "Graphic Menu Design") {
    const pages = Math.max(1, positiveInt(data.pageCount) || 1);
    return {
      amount:
        pages >= 6
          ? pages * pricingConfig.graphicMenuPages.perPageFromSix
          : pricingConfig.graphicMenuPages[pages],
      label: `${pages}-page Graphic Menu`,
      pages,
      includedPages: 0,
    };
  }
  if (service === "Digital Menu") {
    const tier =
      pricingConfig.digitalMenuTiers[data.serviceTier] ||
      pricingConfig.digitalMenuTiers.basic;
    return {
      amount: tier.amount,
      label: `${tier.label} (QR included)`,
      pages: 0,
      includedPages: 0,
    };
  }
  if (service === "Business Website") {
    const tier =
      pricingConfig.websiteTiers[data.serviceTier] ||
      pricingConfig.websiteTiers.basic;
    return {
      amount: tier.amount,
      label: tier.label,
      pages: Math.max(3, positiveInt(data.pageCount) || 3),
      includedPages: 3,
    };
  }
  const rule = pricingConfig.services[service];
  return rule
    ? {
        amount: rule.base,
        label: service,
        pages: Math.max(rule.includedPages, positiveInt(data.pageCount)),
        includedPages: rule.includedPages,
      }
    : null;
}
function designWeight(data, service) {
  if (service === "Digital Menu" || service === "Website + Digital Menu")
    return (
      pricingConfig.digitalMenuDesignWeights[data.selectedMenuTemplate] || 0
    );
  if (service === "Graphic Menu Design")
    return data.designStyle?.startsWith("existing-")
      ? pricingConfig.digitalMenuDesignWeights[
          data.designStyle.replace(/^existing-/, "")
        ] || 0
      : pricingConfig.graphicMenuDesignWeights[data.designStyle] || 0;
  return 0;
}
export function estimateProject(data = {}) {
  const service = String(data.service || ""),
    base = baseFor(data, service);
  if (!base || base.amount == null)
    return {
      min: null,
      max: null,
      label: "Custom estimate required",
      clientLabel: "Custom estimate required",
      requiresCustomDiscussion: true,
      breakdown: [
        { type: "review", label: "Custom requirement review", amount: null },
      ],
      explanation:
        "This service needs a requirements discussion before estimating.",
    };
  let subtotal = base.amount;
  const breakdown = [
    {
      type: "base",
      label: `Base Service — ${base.label}`,
      amount: base.amount,
    },
  ];
  const additionalPages = [
      "Business Website",
      "Website + Digital Menu",
    ].includes(service)
      ? Math.max(0, base.pages - 3)
      : 0,
    pageCost = additionalPages * pricingConfig.additionalWebsitePage;
  if (pageCost) {
    subtotal += pageCost;
    breakdown.push({
      type: "pages",
      label: `Additional Pages (${additionalPages} × ${formatINR(pricingConfig.additionalWebsitePage)})`,
      amount: pageCost,
    });
  }
  const volume = ["Digital Menu", "Website + Digital Menu"].includes(service)
    ? getDigitalMenuVolume(data.menuItemCount, data.menuCategoryCount)
    : getDigitalMenuVolume(0, 0);
  const contentVolumeCost = volume.amount;
  if (contentVolumeCost) {
    subtotal += contentVolumeCost;
    breakdown.push({
      type: "volume",
      label: `Menu Content — ${volume.items} items, ${volume.estimatedPages} estimated page${volume.estimatedPages === 1 ? "" : "s"}${volume.additionalCategories ? `, ${volume.additionalCategories} extra categor${volume.additionalCategories === 1 ? "y" : "ies"}` : ""}`,
      amount: contentVolumeCost,
    });
  }
  const designWeightCost = designWeight(data, service);
  if (designWeightCost) {
    subtotal += designWeightCost;
    breakdown.push({
      type: "designWeight",
      label: "Selected Design Direction",
      amount: designWeightCost,
    });
  }
  let featureCost = 0;
  const usedComplexityAxes = new Set();
  for (const id of getAcceptedFeatureIds(data)) {
    if (id === "qr_access" || id === "additional_pages") continue;
    if (volume.items && id === "large_content") continue;
    if (volume.categories && id === "additional_category") continue;
    const feature = featureCatalog[id],
      amount = rangedAmount(feature, data, service);
    if (Array.isArray(feature[1]))
      usedComplexityAxes.add(feature[2] || "functional");
    if (amount) {
      featureCost += amount;
      breakdown.push({ type: "feature", id, label: feature[0], amount });
    }
  }
  subtotal += featureCost;
  let complexityCost = 0;
  const hasSpecificFeatures = getAcceptedFeatureIds(data).some(
    (id) => !["qr_access", "additional_pages"].includes(id),
  );
  for (const axis of ["content", "functional", "interaction", "design"]) {
    if (usedComplexityAxes.has(axis)) continue;
    if (axis === "content" && (volume.items || base.pages)) continue;
    if (
      axis === "design" &&
      (data.designStyle || data.selectedMenuTemplate || designWeightCost)
    )
      continue;
    if (["functional", "interaction"].includes(axis) && hasSpecificFeatures)
      continue;
    const amount =
      pricingConfig.complexity[axis][level(data[axis + "Complexity"])];
    if (amount) complexityCost += amount;
  }
  if (complexityCost)
    breakdown.push({
      type: "complexity",
      label: "Complexity Adjustment",
      amount: complexityCost,
    });
  subtotal += complexityCost;
  const workingDays = countWorkingDays(data.startDate, data.targetDate),
    urgencyRate =
      workingDays > 0 && workingDays < 7
        ? pricingConfig.urgency[workingDays]
        : 0,
    priorityFee = urgencyRate
      ? Math.max(
          Math.round(subtotal * urgencyRate),
          pricingConfig.minimumPriorityFee,
        )
      : 0;
  if (priorityFee)
    breakdown.push({
      type: "urgency",
      label: `Priority Delivery (${Math.round(urgencyRate * 100)}%)`,
      amount: priorityFee,
    });
  const min = subtotal + priorityFee,
    max =
      min +
      Math.max(
        pricingConfig.planningAllowanceMinimum,
        Math.round(min * pricingConfig.planningAllowancePercent),
      ),
    customReview = min > CUSTOM_REVIEW_THRESHOLD,
    internalLabel = `${formatINR(min)} – ${formatINR(max)}`;
  return {
    min,
    max,
    internalLabel,
    label: customReview ? "Custom Project Review" : internalLabel,
    clientLabel: customReview ? "Custom Project Review" : internalLabel,
    customReview,
    requiresCustomDiscussion: false,
    breakdown,
    basePrice: base.amount,
    featureCost,
    pageCost,
    complexityCost,
    contentVolumeCost,
    designWeightCost,
    includedPages: base.includedPages,
    additionalPages,
    pageCount: base.pages,
    menuItemCount: volume.items,
    menuCategoryCount: volume.categories,
    estimatedMenuPages: volume.estimatedPages,
    menuVolumeLabel: volume.label,
    workingDays,
    deliveryType: priorityFee ? "Priority Delivery" : "Standard Delivery",
    urgencyCost: priorityFee,
    explanation: customReview
      ? "Your selected requirements have moved beyond the standard project scope. A detailed custom quotation will be prepared after reviewing the requirements."
      : priorityFee
        ? "The requested timeline is shorter than the standard 7-working-day delivery period. A priority delivery fee has been included."
        : "This deterministic estimate uses the selected service, pages or menu volume, design direction, accepted features, relevant complexity, and timeline.",
  };
}
export function budgetLabel(id) {
  return budgetRanges.find((b) => b.id === id)?.label || "—";
}
export function compareBudget(data = {}, estimate) {
  const budget = budgetRanges.find((b) => b.id === data.clientBudgetRange);
  if (!budget || !estimate || estimate.requiresCustomDiscussion)
    return "Final estimate requires a requirements discussion.";
  if (estimate.customReview)
    return "The project requires a custom scope review; your budget will be discussed alongside the detailed quotation.";
  if (budget.max !== null && budget.max < estimate.min)
    return "Your selected budget is below the current planning estimate. You can reduce the selected scope/features or discuss the requirements further.";
  if (budget.min > estimate.max)
    return "Your selected budget is above the current planning estimate and may allow additional refinement or features.";
  return "Your selected budget overlaps with the current project estimate.";
}
