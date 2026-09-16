import { brand } from "../data/brand.js";
import { budgetLabel, getAcceptedFeatureIds } from "../pricing/quoteEngine.js";
import { featureCatalog } from "../pricing/pricingRules.js";
import { formatProjectDate } from "./workdays.js";

export function createProposalId() {
  const year = new Date().getFullYear(),
    key = "jccProposalCounter:" + year,
    next = Number(localStorage.getItem(key) || 0) + 1;
  localStorage.setItem(key, String(next));
  return `JCC-${year}-${String(next).padStart(6, "0")}`;
}

export function saveProposal(record) {
  const all = JSON.parse(localStorage.getItem("jccProposalRegistry") || "[]");
  all.push(record);
  localStorage.setItem("jccProposalRegistry", JSON.stringify(all));
  return record;
}

const esc = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
const inr = (value) => "₹" + Number(value || 0).toLocaleString("en-IN");
const compact = (value, max = 1200) => {
  const text = String(value || "").trim();
  return text.length > max ? text.slice(0, max - 1).trimEnd() + "…" : text;
};

export function getProposalFeatureNames(record) {
  return getAcceptedFeatureIds(record)
    .map((id) => featureCatalog[id]?.[0])
    .filter(Boolean);
}

export function buildProjectSummary(record) {
  const estimate = record.estimate || {},
    service = record.service || "Project",
    business = record.businessType ? ` for ${record.businessType}` : "",
    website = record.websiteStyle
      ? ` Website Style: ${record.websiteStyle}.`
      : "",
    digital = record.digitalMenuDesign
      ? ` Digital Menu Design: ${record.digitalMenuDesign}.`
      : "",
    graphic = record.graphicMenuDesign
      ? ` Design Direction: ${record.graphicMenuDesign}.`
      : "",
    fallbackDesign =
      !website && !digital && !graphic && record.designDirection
        ? ` Design Direction: ${record.designDirection}.`
        : "",
    features = getProposalFeatureNames(record),
    featureText = features.length ? ` Includes ${features.join(", ")}.` : "",
    menu = estimate.menuItemCount
      ? ` Approximately ${estimate.menuItemCount} menu items in ${estimate.menuCategoryCount || "unspecified"} categories across ${estimate.estimatedMenuPages || "—"} estimated page${estimate.estimatedMenuPages === 1 ? "" : "s"}.`
      : "",
    pages = estimate.pageCount ? ` ${estimate.pageCount}-page scope.` : "",
    delivery = estimate.workingDays
      ? ` ${estimate.deliveryType} over ${estimate.workingDays} working day${estimate.workingDays === 1 ? "" : "s"}.`
      : " Delivery schedule to be confirmed.";
  return `${service}${business}.${pages}${menu}${website}${digital}${graphic}${fallbackDesign}${featureText}${delivery}`
    .replace(/\s+/g, " ")
    .trim();
}

const row = (label, value, wide = false, extraClass = "") =>
  `<div class="item ${wide ? "wide" : ""} ${extraClass}"><div class="label">${esc(label)}</div><div class="value">${esc(value || "—")}</div></div>`;
const breakdownRows = (items) =>
  items
    .map(
      (item) =>
        `<tr><td>${esc(item.label)}</td><td>${item.amount == null ? "—" : inr(item.amount)}</td></tr>`,
    )
    .join("");

export function buildProposalHtml(record) {
  const estimate = record.estimate || {},
    breakdown = Array.isArray(estimate.breakdown) ? estimate.breakdown : [],
    features = getProposalFeatureNames(record),
    featureText = features.length
      ? features.join(", ")
      : "No optional features selected",
    created = new Date(record.createdAt || Date.now()).toLocaleString("en-IN"),
    safeSignature = /^data:image\/png;base64,[a-z0-9+/=]+$/i.test(
      record.signature || "",
    )
      ? record.signature
      : "",
    logo = "/assets/branding/jiten-creative-co-logo-light.svg",
    estimateLabel = estimate.customReview
      ? "Custom Project Review"
      : estimate.internalLabel || estimate.label || "To be reviewed",
    menuScope = estimate.menuItemCount
      ? `${estimate.menuItemCount} items; ${estimate.menuCategoryCount || "unspecified"} categories; approximately ${estimate.estimatedMenuPages || "—"} pages`
      : "Not applicable",
    pageScope = estimate.pageCount
      ? `${estimate.pageCount} total; ${estimate.includedPages || 0} included; ${estimate.additionalPages || 0} additional`
      : "Not applicable",
    designRows = [
      record.websiteStyle && row("Website Style", record.websiteStyle, true),
      record.digitalMenuDesign &&
        row("Digital Menu Design", record.digitalMenuDesign, true),
      record.graphicMenuDesign &&
        row("Graphic Menu Design", record.graphicMenuDesign, true),
      !record.websiteStyle &&
        !record.digitalMenuDesign &&
        !record.graphicMenuDesign &&
        record.designDirection &&
        row("Design Direction", record.designDirection, true),
    ]
      .filter(Boolean)
      .join("");

  return `<!doctype html><html><head><meta charset="utf-8"><title>${esc(record.proposalId)}</title><style>
@page{size:A4;margin:0}*{box-sizing:border-box}html,body{margin:0;background:#fff;color:#171511;font-family:Arial,Helvetica,sans-serif}.sheet{width:210mm;height:297mm;padding:11mm 14mm 10mm;background:linear-gradient(135deg,#fffaf2,#f2eadf);break-after:page;page-break-after:always;display:flex;flex-direction:column;overflow:hidden}.sheet:last-of-type{break-after:auto;page-break-after:auto}.page-content{min-height:0}.top{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;border-bottom:2px solid #c99650;padding-bottom:7px}.brand-logo{width:225px;max-height:58px;object-fit:contain;object-position:left top}.meta{text-align:right;font-size:10px;line-height:1.35}.project-summary{margin:8px 0;padding:8px 10px;border-left:3px solid #c99650;background:#fff;font-size:11px;line-height:1.35}.grid{display:grid;grid-template-columns:1fr 1fr;gap:5px}.item{border:1px solid #ddd0be;border-radius:6px;padding:5px 7px;background:#fff;min-height:34px}.wide{grid-column:1/-1}.label{text-transform:uppercase;font-size:7.5px;letter-spacing:.12em;color:#8a6028;font-weight:800;margin-bottom:2px}.value{white-space:pre-wrap;font-size:10.5px;line-height:1.28}.requirements .value{max-height:68px;overflow:hidden;overflow-wrap:anywhere}.section-title{font-size:12px;margin:8px 0 4px;color:#6d471d}.breakdown{width:100%;border-collapse:collapse;font-size:9.5px}.breakdown td{padding:3px 5px;border-bottom:1px solid #ddcfbd}.breakdown td:last-child{text-align:right;white-space:nowrap}.total{display:flex;justify-content:space-between;margin-top:5px;padding-top:5px;border-top:2px solid #c99650;font-size:11px}.continued[hidden]{display:none}.terms{font-size:10.2px;line-height:1.38}.terms h1{font-size:22px;margin:8px 0}.terms p{margin:0 0 6px}.acceptance{margin-top:8px;border:1px solid #c99650;border-radius:8px;padding:8px;background:#fff}.sig{display:block;max-width:220px;max-height:64px;object-fit:contain;border-bottom:1px solid #222;margin:5px 0}.footer{margin-top:auto;border-top:1px solid #ddcfbd;padding-top:4px;display:flex;justify-content:space-between;font-size:8.5px;color:#716352}.actions{position:fixed;right:16px;bottom:16px}.actions button{border:0;border-radius:999px;background:#c99650;color:#111;padding:12px 18px;font-weight:900}@media print{html,body{background:#fff}.actions{display:none}.sheet{break-inside:avoid;page-break-inside:avoid}}
</style></head><body>
<main class="sheet" id="page-one"><div class="page-content" id="page-one-content"><section class="top"><img class="brand-logo" src="${logo}" alt="Jiten Creative Co."><div class="meta"><b>Proposal ID</b><br>${esc(record.proposalId)}<br><b>Date</b><br>${esc(created)}</div></section><div class="project-summary"><b>Project Summary</b><br>${esc(buildProjectSummary(record))}</div><section class="grid">${row("Client", record.clientName)}${row("Email", record.clientEmail)}${row("Phone", record.phone)}${row("Business / Project", record.businessType)}${row("Service", record.service)}${designRows}${row("Selected Features & Add-ons", featureText, true)}${row("Website / Graphic Pages", pageScope)}${row("Digital Menu Content", menuScope)}${row("Timeline", `${formatProjectDate(record.startDate)} – ${formatProjectDate(record.targetDate)} · ${estimate.workingDays || "—"} working days · ${estimate.deliveryType || "To be confirmed"}`, true)}${row("Budget", budgetLabel(record.clientBudgetRange))}${row("Estimated Project Range", estimateLabel)}${row("Requirements", compact(record.requirementsText), true, "requirements")}</section><h2 class="section-title">Estimate Breakdown</h2><table class="breakdown"><tbody id="breakdown-page-one">${breakdownRows(breakdown)}</tbody></table><div class="total"><b>Estimated Project Range</b><b>${esc(estimateLabel)}</b></div></div><div class="footer" id="footer-one"><span>Jiten Creative Co.</span><span>Page 1 / 2</span></div></main>
<main class="sheet terms" id="page-two"><div class="page-content" id="page-two-content"><section class="top"><img class="brand-logo" src="${logo}" alt="Jiten Creative Co."><div class="meta"><b>Proposal ID</b><br>${esc(record.proposalId)}<br><b>Date</b><br>${esc(created)}</div></section><section class="continued" id="continued" hidden><h2 class="section-title">Estimate Breakdown — continued</h2><table class="breakdown"><tbody id="breakdown-page-two"></tbody></table></section><h1>Proposal Terms</h1><p><b>Important:</b> This proposal is a planning and scope document. It records the discussed requirements, estimate, signature acknowledgement, and next steps, but is not by itself a full legal contract or automatic transfer of ownership.</p><p>Project work begins only after written confirmation and the applicable payment milestone or advance is received by Jiten Creative Co.</p><p>Until payment terms are completed, source code, editable design files, production credentials, deployment access, and other project assets remain under the control of Jiten Creative Co. unless otherwise agreed in writing.</p><p>Ownership or usage rights for final approved deliverables transfer according to the agreed payment terms, normally after full payment has been received.</p><p>Changes in scope, functionality, content volume, third-party integrations, revisions, timeline, or client-provided materials may change the final quotation and delivery schedule.</p><p>The client is responsible for accurate business information, menu/pricing/content, permissions for supplied media, and required third-party account access. This document is confidential and intended only for the named recipient and Jiten Creative Co.</p><div class="acceptance"><div class="label">Client Acceptance</div><div class="value">Client Name: ${esc(record.clientName)}<br>Proposal ID: ${esc(record.proposalId)}<br>Date: ${esc(created)}</div>${safeSignature ? `<img class="sig" src="${safeSignature}" alt="Client signature">` : "<p>Signature unavailable</p>"}</div></div><div class="footer" id="footer-two"><span>Jiten Creative Co.</span><span>Page 2 / 2</span></div></main>
<div class="actions"><button onclick="print()">Download / Save PDF</button></div><script>
function fitRequirements(){const value=document.querySelector('.requirements .value');if(!value)return;const original=value.textContent;let text=original;while(value.scrollHeight>value.clientHeight&&text.length>120){text=text.slice(0,-24).trimEnd();value.textContent=text+'…'}}
function paginateProposal(){fitRequirements();const source=document.getElementById('breakdown-page-one'),destination=document.getElementById('breakdown-page-two'),page=document.getElementById('page-one'),footer=document.getElementById('footer-one'),total=page.querySelector('.total'),continued=document.getElementById('continued');const fits=()=>{const pageBox=page.getBoundingClientRect(),paddingBottom=parseFloat(getComputedStyle(page).paddingBottom)||0,limit=pageBox.bottom-paddingBottom-footer.offsetHeight-4;return total.getBoundingClientRect().bottom<=limit};while(!fits()&&source.lastElementChild){destination.insertBefore(source.lastElementChild,destination.firstElementChild)}continued.hidden=!destination.children.length;document.documentElement.dataset.proposalReady='true'}
addEventListener('load',()=>requestAnimationFrame(()=>requestAnimationFrame(paginateProposal)));
</script></body></html>`;
}

export function downloadProposalPdf(record, existingPopup = null) {
  const popup = existingPopup || open("", "_blank");
  if (!popup) return false;
  try {
    popup.opener = null;
    popup.document.write(buildProposalHtml(record));
    popup.document.close();
    setTimeout(() => popup.print(), 500);
    return true;
  } catch {
    return false;
  }
}

export function proposalWhatsappUrl(record) {
  const message = `Hello ${record.clientName || ""},\n\nThank you for discussing your project with ${brand.name}.\n\nYour signed project proposal is ready.\n\nProposal ID: ${record.proposalId}\n\nPlease attach the downloaded PDF manually if no hosted proposal link is available.\n\nRegards,\n${brand.name}`;
  return (
    "https:" +
    "//wa.me/" +
    brand.whatsapp +
    "?text=" +
    encodeURIComponent(message)
  );
}
