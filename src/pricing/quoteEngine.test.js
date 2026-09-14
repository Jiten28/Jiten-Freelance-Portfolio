import { estimateProject, compareBudget } from './quoteEngine.js';
const cases=[
 ['Simple Digital Menu',{service:'Digital Menu',requirementsText:'simple dry cleaning menu',clientBudgetRange:'2000-5000'}],
 ['Complex Digital Menu',{service:'Digital Menu',requirementsText:'many categories with QR WhatsApp custom graphics mobile',clientBudgetRange:'2000-5000'}],
 ['Basic Business Website',{service:'Business Website',requirementsText:'basic business website',clientBudgetRange:'5000-10000'}],
 ['Larger Business Website',{service:'Business Website',requirementsText:'5-page website with gallery maps form booking dashboard',clientBudgetRange:'10000-15000'}],
 ['Website + Digital Menu',{service:'Website + Digital Menu',requirementsText:'5-page website with digital menu QR WhatsApp',clientBudgetRange:'10000-15000'}],
 ['Custom Solution',{service:'Custom Digital Solution',requirementsText:'custom app',clientBudgetRange:'20000-plus'}],
 ['Budget below estimate',{service:'Business Website',requirementsText:'booking payment dashboard',clientBudgetRange:'under-2000'}]
];
for(const [name,data] of cases){const est=estimateProject(data);console.log(name, est.label, compareBudget(data,est));}
