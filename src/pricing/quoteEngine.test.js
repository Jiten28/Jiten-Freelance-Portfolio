import { estimateProject } from './quoteEngine.js';
for (const d of [
 {service:'Business Website',requirementsText:'20 item menu'},
 {service:'Business Website',requirementsText:'5-page website with WhatsApp enquiry form and Google Maps'},
 {service:'Digital Menu',requirementsText:'20 item menu with QR WhatsApp'},
]) console.log(d.service, d.requirementsText, estimateProject(d).label, estimateProject(d).breakdown);
