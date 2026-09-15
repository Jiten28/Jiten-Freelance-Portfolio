import { budgetRanges } from './budgetRanges.js';

export const formatINR = n => n == null ? 'Discuss requirements' : '₹' + Number(n).toLocaleString('en-IN');

const rules = {
  'Digital Menu': {
    base: 1999,
    cap: 4999,
    addons: [
      { label: 'QR / WhatsApp menu access', amount: 300, test: /qr|whatsapp|link|online/i },
      { label: 'Large content volume', amount: 700, test: /many|multiple|large|full menu|categories|sections/i },
      { label: 'Custom graphics / icon styling', amount: 800, test: /custom|premium|graphic|icon|brand/i }
    ]
  },
  'Business Website': {
    base: 7999,
    cap: 24999,
    addons: [
      { label: 'Pages / section scope', amount: 2500, test: /5-page|five page|gallery|pricing|services|about|maps|google maps/i },
      { label: 'Enquiry / contact functionality', amount: 1200, test: /form|enquiry|contact form|whatsapp/i },
      { label: 'Advanced functionality', amount: 6000, test: /booking|payment|login|dashboard|admin|cms|automation|api/i }
    ]
  },
  'Website + Digital Menu': {
    base: 12999,
    cap: 34999,
    addons: [
      { label: 'Website pages / sections', amount: 2500, test: /5-page|five page|gallery|pricing|services|about|maps/i },
      { label: 'Digital menu categories / QR flow', amount: 1500, test: /menu|categories|prices|qr|whatsapp/i },
      { label: 'Advanced functionality', amount: 6000, test: /booking|payment|login|dashboard|admin|cms|automation|api/i }
    ]
  }
};

export function estimateProject(data = {}) {
  const service = String(data.service || '');
  const rule = rules[service];
  if (!rule) return { min: null, max: null, label: 'Custom estimate required', requiresCustomDiscussion: true, breakdown: [{ label: 'Custom requirement review', amount: null }], explanation: 'This service needs a custom discussion before estimating.' };
  const text = String(data.requirementsText || '');
  let total = rule.base;
  const breakdown = [{ label: 'Base service', amount: rule.base }];
  for (const add of rule.addons) if (add.test.test(text)) { total += add.amount; breakdown.push(add); }
  const min = rule.base;
  const max = Math.min(rule.cap, Math.max(total, rule.base));
  return { min, max, label: `${formatINR(min)} – ${formatINR(max)}`, requiresCustomDiscussion: false, breakdown, explanation: `The estimate starts from ${formatINR(rule.base)} and only increases for actual scope/complexity found in the requirements — not for design style selection.` };
}
export function budgetLabel(id){return budgetRanges.find(b=>b.id===id)?.label || '—'}
export function compareBudget(data={}, estimate){const b=budgetRanges.find(x=>x.id===data.clientBudgetRange);if(!b||!estimate||estimate.requiresCustomDiscussion)return 'Final estimate requires a requirements discussion.'; if(b.max!==null&&b.max<estimate.min)return 'Your selected budget is below the current planning estimate. We can review the scope and reduce features if needed, or proceed with the full feature list at the estimated range.'; if(b.min>estimate.max)return 'Your selected budget is above the current estimated range. The extra budget can support more refinement or added features.'; return 'Your selected budget overlaps with the estimated project range.'}
