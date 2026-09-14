// Design Styles Data
export const DESIGN_STYLES = [
  {n:"Glassmorphism", g:["#f0f9ff","#e0e7ff"], fit:"Modern tech, SaaS, startups", d:"Frosted glass effects with subtle transparency and blur"},
  {n:"Minimalistic", g:["#ffffff","#f8f9fa"], fit:"Portfolios, personal brands, clean aesthetics", d:"Clean, simple design with ample whitespace and essential elements only"},
  {n:"Dark Mode", g:["#0f172a","#1e293b"], fit:"Developer tools, dashboards, entertainment", d:"Dark background with light text for reduced eye strain and modern appeal"},
  {n:"Colorful / Vibrant", g:["#ff6b6b","#4ecdc4"], fit:"Children's brands, events, creative agencies", d:"Bold, saturated colors with playful gradients and energetic combinations"},
  {n:"Neumorphism", g:["#e0e0e0","#a3a3a3"], fit:"Mobile apps, dashboards, modern interfaces", d:"Soft extruded plastic style with subtle shadows and highlights"},
  {n:"Brutalist", g:["#000000","#ffffff"], fit:"Portfolios, art galleries, experimental projects", d:"Raw, bold design with harsh contrasts and unconventional layouts"},
  {n:"Vintage / Retro", g:["#8b4513","#deb887"], fit:"Cafes, boutiques, heritage brands", d:"Aged textures, warm tones, classic typography with nostalgic feel"},
  {n:"Hand-Drawn / Sketch", g:["#f5f5dc","#e6e6fa"], fit:"Illustrators, artists, creative studios", d:"Sketchy lines, paper textures, illustrative elements and doodles"},
  {n:"Parallax", g:["#ffffff","#f0f0f0"], fit:"Landing pages, portfolios, storytelling sites", d:"Layered scrolling effects with depth perception and movement"},
  {n:"Landing Page", g:["#ffffff","#f8f9fa"], fit:"Product launches, event promotion, lead generation", d:"Conversion-focused layout with clear hierarchy and prominent CTAs"},
  {n:"One Page Scroll", g:["#ffffff","#f8f9fa"], fit:"Portfolios, resumes, simple business sites", d:"Vertical scrolling layout with distinct sections and smooth navigation"},
  {n:"Portfolio", g:["#ffffff","#f8f9fa"], fit:"Designers, photographers, creators", d:"Grid-based layout optimized for showcasing creative work"},
  {n:"E-Commerce", g:["#ffffff","#f8f9fa"], fit:"Online stores, retail, marketplaces", d:"Product-focused layout with cart, checkout, and shopping features"},
  {n:"Magazine / Blog", g:["#fafafa","#d1d5db"], fit:"Publishers, content creators", d:"Editorial columns and featured-story layout for long-form content."},
  {n:"Corporate / Business", g:["#1d3a63","#4b7bb5"], fit:"Consultancies, B2B services", d:"Structured, trustworthy layout suited to formal business audiences."},
  {n:"Educational", g:["#0f766e","#5eead4"], fit:"Coaching, courses, institutes", d:"Clear hierarchy and friendly visuals built to guide a learner."},
  {n:"SaaS / Dashboard", g:["#1e293b","#3b82f6"], fit:"Software products, tools", d:"Data-forward layout with cards, charts and clean product screens."},
  {n:"Entertainment", g:["#1a0b2e","#7c2ae8"], fit:"Events, media, nightlife", d:"High-contrast, dramatic visuals built for excitement and buzz."},
  {n:"Nature / Eco", g:["#2f5233","#8bc34a"], fit:"Sustainable brands, gyms, wellness", d:"Organic tones and natural imagery for an earthy, grounded feel."},
  {n:"AI / Tech", g:["#0a0e27","#3b82f6"], fit:"AI products, tech startups", d:"Futuristic gradients and geometric detail signalling technology."}
];

export const EXPERIENCE_ITEMS = [
  "Smooth Scrolling",
  "Responsive Design",
  "Modern UI",
  "Micro-interactions",
  "Subtle Parallax",
  "Mobile First",
  "Fast Performance",
  "Accessible Design",
  "Business-Focused UX"
];

export const BUSINESS_TYPES = [
  "Restaurant",
  "Café",
  "Salon",
  "Dry Cleaner",
  "Bakery",
  "Gym",
  "Retail Shop",
  "Professional Service",
  "Startup",
  "Other"
];

export const PROJECT_TYPES = [
  {n:"Digital Menu", hosting:"netlify"},
  {n:"QR Digital Menu", hosting:"netlify"},
  {n:"Business Website", hosting:"netlify"},
  {n:"E-commerce Website", hosting:"vercel"},
  {n:"Web Application", hosting:"render"},
  {n:"Custom Solution", hosting:"cloudrun"}
];

export const FEATURE_OPTIONS = [
  "WhatsApp",
  "QR Code",
  "Google Maps",
  "Contact Form",
  "Online Booking",
  "Product Catalog",
  "Online Ordering",
  "Payment Integration",
  "Gallery",
  "Reviews",
  "Blog",
  "Social Media Links",
  "Admin Dashboard",
  "Custom Feature"
];

export const BUDGET_OPTIONS = [
  "₹2,000–₹5,000",
  "₹5,000–₹10,000",
  "₹10,000–₹20,000"
];

export const DEPLOY_PLATFORMS = {
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
  }
};

export const DEPLOY_CHOICE_MAP = {
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

export const NAV_ITEMS = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'styles', label: 'Styles' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'planner', label: "Let's Plan" },
  { id: 'contact', label: 'Contact' }
];

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: "https://github.com/Jiten28",
    icon: "M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.94c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/jiten-kumar-85a03217/",
    icon: "M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3zM20.44 21h-3.37v-6.28c0-1.5-.03-3.42-2.08-3.42-2.08 0-2.4 1.63-2.4 3.31V21H9.22V8.5h3.24v1.71h.05c.45-.86 1.56-1.77 3.21-1.77 3.44 0 4.07 2.26 4.07 5.21V21z"
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/buildwithjiten/",
    icon: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.55.22.95.47 1.37.89.42.42.67.82.89 1.37.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.55-.47-.95.89-1.37-.42.42-.82.67-1.37.89-.42.16-1.06.36-2.23.41-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.55-.22-.95-.47-1.37-.89a3.9 3.9 0 0 1-.89-1.37c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.55.47-.95.89-1.37.42-.42.82-.67 1.37-.89.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.7a6.14 6.14 0 1 0 0 12.28 6.14 6.14 0 0 0 0-12.28zm0 10.13a3.99 3.99 0 1 1 0-7.98 3.99 3.99 0 0 1 0 7.98zm6.4-10.38a1.44 1.44 0 1 1-2.87 0 1.44 1.44 0 0 1 2.87 0z"
  },
  {
    name: "WhatsApp",
    url: "https://wa.me/917675023149",
    icon: "M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.2 5.6l-.3 4c-.4 1.3-.3 2.7.5 3.5l2.7.8c.9.3 1.8.3 2.5-.1l1.2-1c.7-.4 1.2-1.1 1.4-1.9l2-3.9c.4-.8.5-1.1.5-1.2 0-.1-.1-.3-.3-.5-.1-.1-.3-.3-.4-.5-.2-.2-.4-.3-.6-.3l-.2-.1c-.2-.1-.4-.1-.6-.1-2.8-.1-3.7.8-4.2 2.6l-.1.5-.2.9c-.1.4-.1.9-.1 1.8.1.9.6 1.6 1.2 1.8l1.6.8c1 .4 2 .7 3 .8l1.5-.1c.4-.1.9-.2 1.3-.3l2.1-1.1c.5-.3 1-.6 1.3-1.1l.7-1.4c.3-.6.4-1.2.2-1.8-.1-.5-.5-1.1-1-1.5-.4-.5-1-.9-1.4-1.3l-.2-.2v-.5c0-.1 0-.2.1-.3.1-.1.3-.3.4-.4l2-1.1c.5-.3 1-.5 1.4-.6l1.6-.6c.4-.2.9-.3 1.4-.1l.6.3c.2.1.5.2.6.4l.2.1c.2.1.4.2.5.4l.3.2c.2.1.5.1.6.1l.2-.1c.2-.1.4-.1.6-.1z"
  }
];

export const BRAND_INFO = {
  name: "JITEN LABS",
  tagline: "Web Developer & Digital Solutions",
  symbol: "JK"
};

export const WHY_CHOOSE_ME_ITEMS = [
  {
    id: "custom-design",
    icon: "🎨",
    title: "Custom Design",
    description: "Tailored visual solutions that reflect your unique brand identity and business goals."
  },
  {
    id: "modern-technology",
    icon: "💻",
    title: "Modern Technology",
    description: "Current frameworks and best practices ensuring fast, secure, and scalable solutions."
  },
  {
    id: "mobile-first",
    icon: "📱",
    title: "Mobile First",
    description: "Everything built with mobile users as the priority, ensuring excellent experience on any device."
  },
  {
    id: "business-focused",
    icon: "🎯",
    title: "Business-Focused",
    description: "Solutions designed to meet specific business objectives and generate measurable ROI."
  },
  {
    id: "direct-communication",
    icon: "💬",
    title: "Direct Communication",
    description: "Work directly with me - no account managers or intermediaries slowing down the process."
  },
  {
    id: "flexible-solutions",
    icon: "🔄",
    title: "Flexible Solutions",
    description: "Adaptable approaches that evolve with your changing requirements and feedback."
  },
  {
    id: "ai-automation",
    icon: "🤖",
    title: "AI & Automation Experience",
    description: "Expertise in implementing artificial intelligence and automation to enhance functionality."
  },
  {
    id: "performance-focused",
    icon: "⚡",
    title: "Performance Focused",
    description: "Optimized code and assets ensuring fast loading times and smooth user interactions."
  }
];

export const VALUE_PROPOSITION = {
  heading: "What I Deliver",
  lede: "Tailored digital solutions that combine technical excellence with business acumen to drive real results for your business.",
  chips: [
    "Custom Development",
    "User-Centered Design",
    "Performance Optimized",
    "Scalable Architecture",
    "Ongoing Support"
  ]
};

export const HOW_IT_WORKS = {
  sectionHead: {
    kicker: "Process",
    title: "How It Works",
    description: "A transparent, collaborative process designed for clarity and confidence at every stage."
  },
  steps: [
    {
      id: 1,
      visual: "01",
      title: "Discovery & Planning",
      description: "We start by understanding your business, goals, and requirements to create a clear project roadmap."
    },
    {
      id: 2,
      visual: "02",
      title: "Design & Direction",
      description: "I present visual directions and style options, then refine the chosen direction based on your feedback."
    },
    {
      id: 3,
      visual: "03",
      title: "Development & Build",
      description: "I develop your solution with clean code, regular updates, and opportunities for feedback throughout."
    },
    {
      id: 4,
      visual: "04",
      title: "Launch & Support",
      description: "Final testing, deployment, and post-launch support to ensure your solution performs optimally."
    }
  ]
};

export const PRICING_PACKAGES = {
  sectionHead: {
    kicker: "Investment",
    title: "Pricing",
    description: "Starting packages — final pricing is confirmed after reviewing your project requirements."
  },
  packages: [
    {
      id: "basic",
      title: "Digital Menu Basic",
      price: "₹1,999",
      features: [
        "Up to 30 items",
        "Mobile responsive",
        "QR code",
        "WhatsApp button",
        "1 revision"
      ]
    },
    {
      id: "pro",
      title: "Digital Menu Pro",
      price: "₹4,999",
      features: [
        "Custom modern design",
        "Up to 60 items",
        "QR code",
        "WhatsApp",
        "Contact/location",
        "2 revisions"
      ],
      highlighted: true
    },
    {
      id: "website",
      title: "Business Website",
      price: "₹7,999",
      features: [
        "4–5 sections/pages",
        "Responsive design",
        "WhatsApp",
        "Google Maps",
        "Contact form",
        "Basic SEO",
        "2 revisions"
      ]
    },
    {
      id: "combo",
      title: "Website + Digital Menu",
      price: "₹12,999",
      features: [
        "Complete website",
        "Dedicated digital menu",
        "Custom design",
        "WhatsApp",
        "Google Maps",
        "Responsive",
        "Includes all revisions"
      ]
    }
  ],
  addons: [
    {
      title: "Google Business setup/help",
      price: "₹1,000–₹2,500"
    },
    {
      title: "Maintenance",
      price: "₹500–₹1,500/month"
    },
    {
      title: "Extra page",
      price: "₹1,000–₹2,500"
    },
    {
      title: "Custom features",
      price: "On request"
    }
  ],
  hosting: [
    {
      name: "Netlify",
      setupFee: "₹999–₹1,999"
    },
    {
      name: "Vercel",
      setupFee: "₹999–₹2,499"
    },
    {
      name: "Render",
      setupFee: "₹1,499–₹3,499"
    },
    {
      name: "Cloudflare Pages",
      setupFee: "₹999–₹1,999"
    },
    {
      name: "Firebase",
      setupFee: "₹1,499–₹3,499"
    },
    {
      name: "Supabase",
      setupFee: "₹1,999–₹4,999+"
    },
    {
      name: "Google Cloud / Cloud Run",
      setupFee: "₹2,499–₹5,999+"
    }
  ],
  disclaimer: "Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing."
};

// Initial state object
export const initialState = {
  businessType: null,
  projectType: null,
  styleIndex: null,
  features: [],
  business: {
    name: "",
    owner: "",
    phone: "",
    email: "",
    location: "",
    web: "",
    notes: ""
  },
  budget: null,
  deployChoice: null,
  aiConcept: null
};

// Utility functions
export function estimatePackage(projectType) {
  if (projectType === "Digital Menu" || projectType === "QR Digital Menu") return "Digital Menu Basic / Pro (₹1,999 – ₹4,999)";
  if (projectType === "Business Website") return "Business Website (₹7,999)";
  if (projectType === "E-commerce Website") return "Website + Digital Menu tier or Custom Project (from ₹12,999)";
  if (projectType === "Web Application" || projectType === "Custom Solution") return "Custom Project — quoted after requirements review";
  return "To be confirmed after requirements review";
}

export function recommendedPlatformFor(state) {
  // If user has already made a manual selection (not "unsure"), respect that choice
  if (state.deployChoice && state.deployChoice !== "unsure" && state.deployChoice !== "existing"){
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
    return getRecommendedPlatform(state);
  }

  return null;
}

export function getRecommendedPlatform(state) {
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

export function buildAIConceptObject(state) {
  const styleIndex = state.styleIndex !== null ? state.styleIndex : 19; // Default to AI/Tech
  const style = DESIGN_STYLES[styleIndex];
  return {
    style: style.n,
    palette: style.g,
    used: false,
    blurb: `A ${style.n.toLowerCase()} direction for ${state.business.name || "your business"}${state.businessType ? " ("+state.businessType+")" : ""}, built around ${state.features.length ? state.features.slice(0,3).join(", ") : "your core features"}.`
  };
}

export function buildWhatsAppMessage(state) {
  const styleName = state.styleIndex !== null ? DESIGN_STYLES[state.styleIndex].n : "Not selected";
  const lines = [
    "NEW PROJECT REQUIREMENT",
    "",
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
    const deployKey = recommendedPlatformFor(state);
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

// Placeholder function - would be implemented in a real app with DOM manipulation
export function buildSummaryDOM() {
  // This function creates DOM elements, so it would belong in a view layer
  // Keeping the signature here but returning null as placeholder
  return null;
}