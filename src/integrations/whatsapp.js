import { brand } from '../data/brand';
import { budgetLabel, estimateProject } from '../pricing/quoteEngine';

export function whatsappUrl(data) {
  const est = estimateProject(data);
  const msg = `Hello ${brand.name},\n\nI would like to discuss a project.\n\nProject: ${data.businessType || ''}\nService: ${data.service || ''}\nDesign Style: ${data.designStyleName || ''}\nClient Budget: ${budgetLabel(data.clientBudgetRange)}\nEstimated Range: ${est.label}\nTimeline: ${data.timeline || ''}\nRequirements: ${data.requirementsText || ''}\n\nName: ${data.contact?.name || ''}\nEmail: ${data.contact?.email || ''}\nPhone: ${data.contact?.phone || ''}`;
  return 'https://wa.me/' + brand.whatsapp + '?text=' + encodeURIComponent(msg);
}
