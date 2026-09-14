/* ============================================================
   DATA LAYER — structured data, kept separate from render logic
   ============================================================ */

const REAL_PROJECTS = [
  { name:"Perfume Shop", category:"Full-Stack E-Commerce", tech:"React, TailwindCSS, Vite, Node.js, MongoDB",
    desc:"Responsive perfume storefront with product pages, reviews and a trending section.",
    url:"https://perfume-shop-digital.netlify.app/", img:"assets/perfume-shop.png", hosting:"netlify" },
  { name:"E-Commerce Website", category:"Sports E-Commerce", tech:"HTML, CSS, JavaScript",
    desc:"Responsive sports e-commerce site optimized for desktop and mobile browsing and checkout.",
    url:null, img:"assets/ecommerce.png", hosting:null },
  { name:"Voyage-AI", category:"Intelligent Travel Planner", tech:"Google AI Studio / AI-powered application",
    desc:"AI travel planner generating itineraries, budgets, hotel picks and destination visuals.",
    url:"https://voyage-ai-p1bd.onrender.com/", img:"assets/voyage-ai.png", hosting:"render" },
  { name:"Wonderful Crown", category:"Healthcare Recommendation System", tech:"Full-stack AI / machine learning",
    desc:"AI healthcare platform predicting conditions from symptoms with specialist matching.",
    url:"https://wonderful-crown.onrender.com/", img:"assets/wonderful-crown-desktop.png", mobileImg:"assets/wonderful-crown-mobile.png", hosting:"render" },
  { name:"Cindrix", category:"Intelligent AI Assistant", tech:"Gemini, RAG, persistent memory, Flask, Three.js",
    desc:"AI assistant with persistent memory, voice interaction, web/image search and a 3D interface.",
    url:"https://cindrix-ai.onrender.com/", img:"assets/cindrix-desktop.png", mobileImg:"assets/cindrix-mobile.png", hosting:"render" },
  { name:"AgriVision-XAI", category:"Explainable AI", tech:"EfficientNetB0, CBAM, Grad-CAM, LIME, TensorFlow Lite, Streamlit",
    desc:"Explainable plant-disease detection with severity estimation and an interactive Streamlit app.",
    url:null, img:null, hosting:null },
];

const MORE_PROJECTS = ["BizLink — Buyer & Seller Matching Platform","CrowdPulse — AI Crowd Analytics","StockMentor — AI Stock Analysis",
"NeuralRetail — AI Sales Analytics","Plant Disease Detection","AI Voice Assistant","Legal AI Assistant",
"Facial Recognition Attendance System","Malware Detection using Deep Learning","Rubik's Cube Solver",
"Sentiment Analysis App","ToDo List Application","Login/Register Page","Hand Tracking Program",
"Eye Tracking with Face Distance Finder","Daily Reflection Tree"];

const DESIGN_STYLES = [
  {n:"Glassmorphism", g:["#7c9eff","#c9a6ff"], fit:"Startups, SaaS, AI products", d:"Frosted translucent panels over soft gradients for a modern, airy feel."},
  {n:"Minimalistic", g:["#e9e9ec","#ffffff"], fit:"Professionals, studios, personal brands", d:"Generous whitespace and restrained typography that let content lead."},
  {n:"Dark Mode", g:["#141821","#2b3346"], fit:"Tech, gaming, premium studios", d:"Deep dark backdrops with bright accents for a bold, technical mood."},
  {n:"Colorful / Vibrant", g:["#ff7a7a","#ffd36b"], fit:"Cafés, salons, youth brands", d:"Energetic gradients and playful color for a lively, memorable brand."},
  {n:"Neumorphism", g:["#e6e9ef","#f4f6fa"], fit:"Wellness, lifestyle apps", d:"Soft embossed surfaces with subtle shadows for a tactile, gentle UI."},
  {n:"Brutalist", g:["#111111","#f4f4f4"], fit:"Creative agencies, portfolios", d:"Raw grids, hard edges and bold type that reject decorative polish."},
  {n:"Vintage / Retro", g:["#d8c19a","#8a5a44"], fit:"Bakeries, heritage brands", d:"Warm muted tones and classic typefaces evoking nostalgia and craft."},
  {n:"Hand-Drawn / Sketch", g:["#fff6e5","#ffd88a"], fit:"Kids brands, creative studios", d:"Playful sketch-style illustration and hand-lettered accents."},
  {n:"Parallax", g:["#294b7a","#5c86c9"], fit:"Travel, real estate, tourism", d:"Layered scroll depth that turns a page into an immersive journey."},
  {n:"Landing Page", g:["#6a5bff","#9c7bff"], fit:"Product launches, startups", d:"Single focused page built entirely around one clear conversion goal."},
  {n:"One Page Scroll", g:["#232735","#4a5270"], fit:"Portfolios, small businesses", d:"Every section flows on one page — quick to browse, easy to build."},
  {n:"Portfolio", g:["#f4f0ea","#dcd4c6"], fit:"Freelancers, designers, photographers", d:"Work-first layout that showcases a curated body of projects."},
  {n:"E-Commerce", g:["#111827","#374151"], fit:"Retail shops, online stores", d:"Product-grid driven layout optimized for browsing and checkout."},
  {n:"Magazine / Blog", g:["#fafafa","#d1d5db"], fit:"Publishers, content creators", d:"Editorial columns and featured-story layout for long-form content."},
  {n:"Corporate / Business", g:["#1d3a63","#4b7bb5"], fit:"Consultancies, B2B services", d:"Structured, trustworthy layout suited to formal business audiences."},
  {n:"Educational", g:["#0f766e","#5eead4"], fit:"Coaching, courses, institutes", d:"Clear hierarchy and friendly visuals built to guide a learner."},
  {n:"SaaS / Dashboard", g:["#1e293b","#3b82f6"], fit:"Software products, tools", d:"Data-forward layout with cards, charts and clean product screens."},
  {n:"Entertainment", g:["#1a0b2e","#7c2ae8"], fit:"Events, media, nightlife", d:"High-contrast, dramatic visuals built for excitement and buzz."},
  {n:"Nature / Eco", g:["#2f5233","#8bc34a"], fit:"Sustainable brands, gyms, wellness", d:"Organic tones and natural imagery for an earthy, grounded feel."},
  {n:"AI / Tech", g:["#0a0e27","#3b82f6"], fit:"AI products, tech startups", d:"Futuristic gradients and geometric detail signalling technology."},
];

const EXPERIENCE_ITEMS = ["Smooth Scrolling","Responsive Design","Modern UI","Micro-interactions","Subtle Parallax","Mobile First","Fast Performance","Accessible Design","Business-Focused UX"];

const BUSINESS_TYPES = ["Restaurant","Café","Salon","Dry Cleaner","Bakery","Gym","Retail Shop","Professional Service","Startup","Other"];

const PROJECT_TYPES = [
  {n:"Digital Menu", hosting:"netlify"}, {n:"QR Digital Menu", hosting:"netlify"},
  {n:"Business Website", hosting:"netlify"}, {n:"E-commerce Website", hosting:"vercel"},
  {n:"Web Application", hosting:"render"}, {n:"Custom Solution", hosting:"cloudrun"}
];

const FEATURE_OPTIONS = ["WhatsApp","QR Code","Google Maps","Contact Form","Online Booking","Product Catalog","Online Ordering","Payment Integration","Gallery","Reviews","Blog","Social Media Links","Admin Dashboard","Custom Feature"];

const BUDGET_OPTIONS = ["₹2,000–₹5,000","₹5,000–₹10,000","₹10,000–₹20,000"];

const DEPLOY_PLATFORMS = {
  netlify:{
    name:"Netlify",
    best:"Business websites, digital menus, React/Vite frontends",
    benefits:"Generous free tier, excellent CLI, instant rollbacks, built-in form handling",
    limitations:"Limited regional availability for some features, longer build times for large sites",
    jitenLabsSetupFee:"₹999–₹1,999",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
  vercel:{
    name:"Vercel",
    best:"React / Next.js applications",
    benefits:"Optimized for frontend frameworks, instant deployments, excellent DX, built-in analytics",
    limitations:"Can be expensive at scale, limited backend functionality compared to alternatives",
    jitenLabsSetupFee:"₹999–₹2,499",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
  render:{
    name:"Render",
    best:"Node.js, Python, Flask/FastAPI, full-stack & AI apps",
    benefits:"Full-featured platform, free tier available, easy Docker deployment, built-in SSL",
    limitations:"Free services may have startup delays, limited regional availability",
    jitenLabsSetupFee:"₹1,499–₹3,499",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
  cloudflare:{
    name:"Cloudflare Pages",
    best:"Static websites, landing pages",
    benefits:"Free forever, excellent performance, built-in image optimization, strong security features",
    limitations:"More limited backend functionality, steeper learning curve for Workers",
    jitenLabsSetupFee:"₹999–₹1,999",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
  firebase:{
    name:"Firebase",
    best:"Auth, real-time apps, Firebase-based apps",
    benefits:"Comprehensive suite (auth, database, hosting), excellent documentation, generous free tier",
    limitations:"Can become expensive at scale, vendor lock-in concerns, complex pricing structure",
    jitenLabsSetupFee:"₹1,499–₹3,499",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
  supabase:{
    name:"Supabase",
    best:"Database/backend-heavy applications",
    benefits:"Open source Firebase alternative, generous free tier, real-time subscriptions, auto-generated APIs",
    limitations:"Smaller community than Firebase, some features still maturing, limited regional availability",
    jitenLabsSetupFee:"₹1,999–₹4,999+",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
  cloudrun:{
    name:"Google Cloud / Cloud Run",
    best:"AI apps, Gemini-powered apps, secure backend APIs",
    benefits:"Fully managed, scales to zero, excellent for microservices, integrates well with GCP services",
    limitations:"Can be complex to configure, costs can add up at scale, cold start latency",
    jitenLabsSetupFee:"₹2,499–₹5,999+",
    thirdPartyCostNote:"Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
  },
};

const DEPLOY_CHOICE_MAP = {
  netlify:{ label:"Netlify" },
  vercel:{ label:"Vercel" },
  render:{ label:"Render" },
  cloudflare:{ label:"Cloudflare Pages" },
  firebase:{ label:"Firebase" },
  supabase:{ label:"Supabase" },
  cloudrun:{ label:"Google Cloud / Cloud Run" },
  existing:{ label:"I already have hosting" },
  unsure:{ label:"I'm not sure — recommend one for me" }
};

/* ============================================================
   STATE
   ============================================================ */
const state = {
  businessType:null, projectType:null, styleIndex:null, features:[],
  business:{ name:"", owner:"", phone:"", email:"", location:"", web:"", notes:"" },
  budget:null, deployChoice:null,
  aiConcept:null,
};

/* ============================================================
   UTILITY FUNCTIONS
   ============================================================ */

function estimatePackage(){
  if(state.projectType === "Digital Menu" || state.projectType === "QR Digital Menu") return "Digital Menu Basic / Pro (₹1,999 – ₹4,999)";
  if(state.projectType === "Business Website") return "Business Website (₹7,999)";
  if(state.projectType === "E-commerce Website") return "Website + Digital Menu tier or Custom Project (from ₹12,999)";
  if(state.projectType === "Web Application" || state.projectType === "Custom Solution") return "Custom Project — quoted after requirements review";
  return "To be confirmed after requirements review";
}

function recommendedPlatformFor(){
  // If user has already made a manual selection (not "unsure"), respect that choice
  if(state.deployChoice && state.deployChoice !== "unsure" && state.deployChoice !== "existing"){
    // Check if it's a direct platform selection
    if(DEPLOY_PLATFORMS[state.deployChoice]){
      return state.deployChoice;
    }
    // Handle legacy choice mappings for backward compatibility
    if(state.deployChoice === "affordable") return "netlify";
    if(state.deployChoice === "fullstack") return "render";
    if(state.deployChoice === "ai") return "cloudrun";
    if(state.deployChoice === "existing") return null;
  }

  // For "unsure" or when no deployChoice set, provide intelligent recommendation
  if(!state.deployChoice || state.deployChoice === "unsure"){
    return getRecommendedPlatform();
  }

  return null;
}

function getRecommendedPlatform(){
  // If no project type selected yet, default to netlify (safe choice for simple sites)
  if(!state.projectType){
    return "netlify";
  }

  // Get project type object
  const pt = PROJECT_TYPES.find(p=>p.n === state.projectType);
  if(!pt){
    return "netlify"; // fallback
  }

  // Recommendation logic based on project type and features
  const projectType = state.projectType;
  const hasCustomFeature = state.features && state.features.includes("Custom Feature");
  const hasEcommerce = state.features && (
    state.features.includes("Online Ordering") ||
    state.features.includes("Payment Integration") ||
    state.features.includes("Product Catalog")
  );
  const hasDatabase = state.features && (
    state.features.includes("Admin Dashboard") ||
    state.features.includes("Blog") ||
    state.features.includes("Social Media Links")
  );
  const hasAI = state.features && (
    state.features.includes("Admin Dashboard") &&
    (state.features.includes("Online Ordering") || state.features.includes("Payment Integration"))
  ) || state.projectType === "Web Application" || state.projectType === "Custom Solution";

  // Simple static sites (Digital Menu, Business Website without complex features)
  if((projectType === "Digital Menu" || projectType === "QR Digital Menu") && !hasEcommerce && !hasDatabase){
    return "netlify"; // or cloudflare - both good for simple sites
  }

  if(projectType === "Business Website" && !hasEcommerce && !hasDatabase && !hasCustomFeature){
    // Simple business site - netlify or cloudflare
    return "netlify";
  }

  // E-commerce or complex business sites
  if(projectType === "E-commerce Website" || hasEcommerce || (projectType === "Business Website" && hasDatabase)){
    // E-commerce needs more robust platform
    if(hasDatabase && !hasAI){
      return "supabase"; // Good for e-commerce with database needs
    }
    return "render"; // Full-stack capable
  }

  // Web applications or custom solutions
  if(projectType === "Web Application" || projectType === "Custom Solution" || hasAI){
    if(state.features.includes("Gemini") || state.features.includes("AI") || state.projectType === "Web Application"){
      return "cloudrun"; // Best for AI/API heavy applications
    }
    if(hasDatabase){
      return "supabase"; // Good for database-backed web apps
    }
    return "render"; // General full-stack applications
  }

  // Default fallback
  return "netlify";
}

function buildSummaryDOM(){
  // This function creates DOM elements, so it belongs in main.js
  // Keeping the signature here but moving implementation to main.js
  return null; // Placeholder
}

function buildAIConceptObject(){
  const style = state.styleIndex !== null ? DESIGN_STYLES[state.styleIndex] : DESIGN_STYLES[19];
  return {
    style: style.n,
    palette: style.g,
    used:false,
    blurb:`A ${style.n.toLowerCase()} direction for ${state.business.name || "your business"}${state.businessType ? " ("+state.businessType+")" : ""}, built around ${state.features.length ? state.features.slice(0,3).join(", ") : "your core features"}.`
  };
}

function buildWhatsAppMessage(){
  const styleName = state.styleIndex !== null ? DESIGN_STYLES[state.styleIndex].n : "Not selected";
  const lines = [
    "NEW PROJECT REQUIREMENT","",
    `Business: ${state.business.name || "—"}`,
    `Business Type: ${state.businessType || "—"}`,
    `Project: ${state.projectType || "—"}`,
    `Preferred Design: ${styleName}${state.aiConcept && state.aiConcept.used ? " (AI Concept selected)" : ""}`,
    `Features: ${state.features.length ? state.features.join(", ") : "—"}`,
    `Budget: ${state.budget || "—"}`, "",
    "Additional Requirements:",
    state.business.notes || "—", "",
    `Owner: ${state.business.owner || "—"}`,
    `Phone: ${state.business.phone || "—"}`,
  ];

  // Handle deployment info for WhatsApp message
  if(state.deployChoice === "existing"){
    lines.push("", "DEPLOYMENT");
    lines.push("Hosting Selection: I already have hosting");
    lines.push("Hosting details: To be provided during consultation");
  } else if(state.deployChoice === "unsure"){
    const deployKey = recommendedPlatformFor();
    const deployInfo = deployKey && DEPLOY_PLATFORMS[deployKey] ? DEPLOY_PLATFORMS[deployKey] : null;
    if(deployInfo){
      lines.push("", "DEPLOYMENT");
      lines.push("Hosting Preference: I'm not sure — recommend one");
      lines.push(`Suggested Platform: ${deployInfo.name}`);
      lines.push(`Hosting: ${deployInfo.cost}`);
      lines.push(`Deployment Setup: ${deployInfo.fee}`);
      lines.push("Domain: Separate");
    } else {
      lines.push("", "DEPLOYMENT");
      lines.push("Hosting Preference: I'm not sure — recommend one");
      lines.push("No recommendation available yet");
    }
  } else if(state.deployChoice && DEPLOY_PLATFORMS[state.deployChoice]){
    const deployInfo = DEPLOY_PLATFORMS[state.deployChoice];
    lines.push("", "DEPLOYMENT");
    lines.push(`Selected Platform: ${deployInfo.name}`);
    lines.push(`Hosting: ${deployInfo.cost}`);
    lines.push(`Deployment Setup: ${deployInfo.fee}`);
    lines.push("Domain: Separate");
  }

  lines.push("", "Final hosting/platform costs may vary based on usage and the provider's current pricing.");
  return lines.join("\n");
}

// Export for use in other files (if using modules)
// In this case, we're just attaching to window for simplicity in the HTML
if (typeof window !== 'undefined') {
  window.REAL_PROJECTS = REAL_PROJECTS;
  window.MORE_PROJECTS = MORE_PROJECTS;
  window.DESIGN_STYLES = DESIGN_STYLES;
  window.EXPERIENCE_ITEMS = EXPERIENCE_ITEMS;
  window.BUSINESS_TYPES = BUSINESS_TYPES;
  window.PROJECT_TYPES = PROJECT_TYPES;
  window.FEATURE_OPTIONS = FEATURE_OPTIONS;
  window.BUDGET_OPTIONS = BUDGET_OPTIONS;
  window.DEPLOY_PLATFORMS = DEPLOY_PLATFORMS;
  window.DEPLOY_CHOICE_MAP = DEPLOY_CHOICE_MAP;
  window.state = state;
  window.estimatePackage = estimatePackage;
  window.recommendedPlatformFor = recommendedPlatformFor;
  window.buildSummaryDOM = buildSummaryDOM;
  window.buildAIConceptObject = buildAIConceptObject;
  window.buildWhatsAppMessage = buildWhatsAppMessage;
}