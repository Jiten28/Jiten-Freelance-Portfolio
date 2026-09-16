import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { brand } from "./data/brand";
import { projects, projectFilters } from "./data/projects";
import { designStyles } from "./data/designStyles";
import { budgetRanges } from "./pricing/budgetRanges";
import {
  estimateProject,
  compareBudget,
  budgetLabel,
  getAcceptedFeatureIds,
} from "./pricing/quoteEngine";
import {
  featureCatalog,
  serviceFeatureIds,
  pricingConfig,
} from "./pricing/pricingRules";
import {
  getProposedStartDate,
  countWorkingDays,
  validateTargetDate,
  formatProjectDate,
} from "./utils/workdays";
import { whatsappUrl } from "./integrations/whatsapp";
import {
  InstagramIcon,
  LinkedInIcon,
  GitHubIcon,
  MailIcon,
} from "./components/Icons.jsx";
import { CustomSelect } from "./components/CustomSelect.jsx";
import { SignaturePad } from "./components/SignaturePad.jsx";
import {
  createProposalId,
  saveProposal,
  downloadProposalPdf,
  proposalWhatsappUrl,
} from "./utils/proposal.js";
import {
  menuDirections,
  graphicAssetMenuDirections,
  graphicMenuDirections,
  serviceTypes,
} from "./data/menuDirections.js";
import {
  MENU_ITEM_MAX,
  MENU_CATEGORY_MAX,
  validateDesignSelection,
  validateMenuQuantities,
} from "./utils/plannerRules.js";
const nav = [
  "Home",
  "Services",
  "Projects",
  "Styles",
  "Pricing",
  "About",
  "Let's Plan",
  "Contact",
];
const ids = [
  "home",
  "services",
  "projects",
  "styles",
  "pricing",
  "about",
  "plan",
  "contact",
];
function Intro() {
  const [show, setShow] = useState(() => !sessionStorage.getItem("introSeen"));
  useEffect(() => {
    const t = setTimeout(
      () => {
        setShow(false);
        sessionStorage.setItem("introSeen", "1");
      },
      show ? 950 : 80,
    );
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={"intro " + (!show ? "hide" : "")} aria-hidden={!show}>
      <div>
        <h1>{brand.name}</h1>
        <p>{brand.descriptor}</p>
      </div>
    </div>
  );
}
class ErrorBoundary extends React.Component {
  constructor(p) {
    super(p);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    return this.state.hasError ? (
      <section className="section">
        <div className="card">
          <h2>Planner temporarily unavailable</h2>
          <p>
            Please refresh the page or contact Jiten Creative Co. directly. The
            rest of the website is still available.
          </p>
        </div>
      </section>
    ) : (
      this.props.children
    );
  }
}
function Header() {
  const [open, setOpen] = useState(false),
    [active, setActive] = useState("home"),
    [light, setLight] = useState(() =>
      localStorage.theme
        ? localStorage.theme === "light"
        : matchMedia("(prefers-color-scheme: light)").matches,
    ),
    [line, setLine] = useState({ left: 0, width: 0 });
  const linksRef = useRef(null);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
    localStorage.theme = light ? "light" : "dark";
    requestAnimationFrame(() => updateLine(active));
  }, [light]);
  function updateLine(id = active) {
    const wrap = linksRef.current;
    if (!wrap) return;
    const link = wrap.querySelector(`a[data-nav-id="${id}"]`);
    if (!link) return;
    const lr = link.getBoundingClientRect(),
      wr = wrap.getBoundingClientRect();
    setLine({ left: lr.left - wr.left, width: lr.width });
  }
  useEffect(() => {
    const on = () => {
      let a = "home";
      ids.forEach((id) => {
        let el = document.getElementById(id);
        if (el && el.offsetTop - 180 <= scrollY) a = id;
      });
      setActive(a);
      const max = Math.max(1, document.body.scrollHeight - innerHeight);
      document.querySelector(".progress").style.width =
        (scrollY / max) * 100 + "%";
      document
        .querySelector("header")
        .classList.toggle("scrolled", scrollY > 40);
      requestAnimationFrame(() => updateLine(a));
    };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    document.fonts?.ready?.then(on);
    const ro = new ResizeObserver(on);
    if (linksRef.current) ro.observe(linksRef.current);
    on();
    return () => {
      removeEventListener("scroll", on);
      removeEventListener("resize", on);
      ro.disconnect();
    };
  }, []);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  return (
    <>
      <div className="progress" />
      <header>
        <nav className="nav">
          <a className="brand logo-link" href="#home" aria-label={brand.name}>
            <img
              className="logo-full logo-dark"
              src="/assets/branding/jiten-creative-co-logo.svg"
              alt="Jiten Creative Co."
            />
            <img
              className="logo-full logo-light"
              src="/assets/branding/jiten-creative-co-logo-light.svg"
              alt="Jiten Creative Co."
            />
          </a>
          <div className="links" ref={linksRef}>
            {nav.map((n, i) => (
              <a
                key={n}
                data-nav-id={ids[i]}
                className={active === ids[i] ? "active" : ""}
                href={"#" + ids[i]}
              >
                {n}
              </a>
            ))}
            <span
              className="magic"
              style={{ left: line.left, width: line.width }}
            />
          </div>
          <div className="actions">
            <button
              className="theme"
              onClick={() => setLight(!light)}
              aria-label="Toggle theme"
            >
              ◐
            </button>
            <a className="btn primary" href="#plan">
              START A PROJECT
            </a>
            <button
              className="hamb"
              onClick={() => setOpen(!open)}
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
            >
              ☰
            </button>
          </div>
        </nav>
        <div className={"mobile " + (open ? "open" : "")}>
          {nav.map((n, i) => (
            <a onClick={() => setOpen(false)} key={n} href={"#" + ids[i]}>
              {n}
            </a>
          ))}
        </div>
      </header>
    </>
  );
}
function Hero() {
  return (
    <section id="home" className="section hero">
      <div className="reveal in">
        <span className="kicker">Independent digital studio</span>
        <h1>{brand.name}</h1>
        <h2>{brand.descriptor}</h2>
        <p>
          “{brand.tagline}.” I create modern websites, digital menus,
          interactive experiences, automation-ready interfaces, and custom
          digital solutions for businesses that want a polished online presence.
        </p>
        <p>
          <a className="btn primary" href="#plan">
            START A PROJECT →
          </a>{" "}
          <a className="btn" href="#projects">
            EXPLORE MY WORK
          </a>
        </p>
      </div>
      <div className="hero-art reveal in" aria-hidden="true">
        <div className="panel p1">
          const studio = &#123;
          <br /> brand: 'Jiten Creative Co.',
          <br /> services: ['websites','digital menus','interactive UX'],
          <br /> outcome: 'business-ready experiences'
          <br />
          &#125;
        </div>
        <div className="panel p2" />
        <div className="panel p3" />
      </div>
    </section>
  );
}
function Services() {
  let s = [
    "Digital Menu",
    "Business Website",
    "Website + Digital Menu",
    "Custom Digital Solutions",
  ];
  return (
    <section id="services" className="section">
      <span className="kicker">Capabilities</span>
      <h2>WHAT I BUILD</h2>
      <p className="lead">
        Focused digital products for local businesses, creators, startups, and
        service brands — designed with modern UI, responsive development,
        practical automation, and premium execution.
      </p>
      <div className="grid2">
        {s.map((x, i) => (
          <article className="card" key={x}>
            <div className="num">0{i + 1}</div>
            <h3>{x}</h3>
            <p>
              {
                [
                  "Mobile-first QR menus with categories, pricing, business info, and easy update-ready structure.",
                  "Professional websites built for clarity, trust, speed, and conversion.",
                  "A complete digital presence combining brand website, menu experience, and contact links.",
                  "Interactive interfaces, automation-friendly workflows, and bespoke digital tools.",
                ][i]
              }
            </p>
            <div className="chips">
              <span className="chip">Responsive</span>
              <span className="chip">Modern UI</span>
              <span className="chip">Business-ready</span>
            </div>
            <p>
              <a className="btn" href="#plan">
                Plan this
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
function MenuShowcase() {
  const [tab, setTab] = useState("Cafe");
  const data = {
    Cafe: [
      ["Cold Coffee", "₹120"],
      ["Paneer Sandwich", "₹160"],
    ],
    Restaurant: [
      ["Veg Biryani", "₹220"],
      ["Butter Paneer", "₹260"],
    ],
    Salon: [
      ["Hair Cut", "₹299"],
      ["Facial", "₹699"],
    ],
    Retail: [
      ["Featured Item", "₹499"],
      ["Custom Order", "Discuss"],
    ],
  };
  return (
    <section className="section showcase">
      <div className="phone">
        <span className="kicker">Digital Menu</span>
        <h3>{tab} Menu</h3>
        <div className="menu-tabs">
          {Object.keys(data).map((k) => (
            <button
              key={k}
              className={tab === k ? "active" : ""}
              onClick={() => setTab(k)}
            >
              {k}
            </button>
          ))}
        </div>
        {data[tab].map((i) => (
          <div key={i[0]} className="menu-item">
            <span>{i[0]}</span>
            <b>{i[1]}</b>
          </div>
        ))}
      </div>
      <div>
        <span className="kicker">Product showcase</span>
        <h2>Digital menus that feel like a real product.</h2>
        <p className="lead">
          A digital menu should not feel like a PDF. It can become a polished
          phone-first browsing experience for cafés, restaurants, salons,
          laundry services, retail shops, and local service businesses.
        </p>
      </div>
    </section>
  );
}

function MenuModal({ project, onClose }) {
  const [view, setView] = useState("both");
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && onClose();
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [onClose]);
  const imgs =
    view === "a4"
      ? [["A4 printable menu", project.a4Image]]
      : view === "mobile"
        ? [["Mobile digital menu", project.mobileImage]]
        : [
            ["A4 printable menu", project.a4Image],
            ["Mobile digital menu", project.mobileImage],
          ];
  return (
    <div
      className="modal open"
      role="dialog"
      aria-modal="true"
      aria-label={project.title + " menu template"}
      onClick={(e) => e.target.className.includes("modal") && onClose()}
    >
      <div className="modal-box">
        <button
          className="theme"
          onClick={onClose}
          aria-label="Close menu preview"
        >
          ×
        </button>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="menu-switch" role="tablist" aria-label="Preview type">
          <button
            className={view === "both" ? "active" : ""}
            onClick={() => setView("both")}
          >
            A4 + Mobile
          </button>
          <button
            className={view === "a4" ? "active" : ""}
            onClick={() => setView("a4")}
          >
            A4
          </button>
          <button
            className={view === "mobile" ? "active" : ""}
            onClick={() => setView("mobile")}
          >
            Mobile
          </button>
        </div>
        <div
          className={
            view === "both" ? "menu-preview-grid" : "menu-preview-single"
          }
        >
          {imgs.map(([alt, src]) => (
            <img
              key={src}
              loading="lazy"
              src={src}
              alt={project.title + " " + alt}
            />
          ))}
        </div>
        <p>
          <a
            className="btn"
            target="_blank"
            rel="noopener"
            href={project.promptFile}
          >
            Open prompt file
          </a>
        </p>
      </div>
    </div>
  );
}

function Projects() {
  const [f, setF] = useState("ALL"),
    [modal, setModal] = useState(null);
  let items = projects.filter((p) => f === "ALL" || p.category === f);
  useEffect(() => {
    const esc = (e) => e.key === "Escape" && setModal(null);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, []);
  return (
    <section id="projects" className="section">
      <span className="kicker">Selected work</span>
      <h2>FEATURED PROJECTS</h2>
      <div className="filterbar">
        {projectFilters.map((x) => (
          <button
            key={x}
            className={f === x ? "active" : ""}
            onClick={() => setF(x)}
          >
            {x}
          </button>
        ))}
      </div>
      {items.map((p) => (
        <article className="project reveal in" key={p.id}>
          <div className="shot">
            <img loading="lazy" src={p.image} alt={p.title} />
          </div>
          <div>
            <span className="kicker">{p.type}</span>
            <h3>{p.title}</h3>
            <p className="lead">{p.description}</p>
            <div className="chips">
              {p.tags.map((t) => (
                <span key={t} className="chip">
                  {t}
                </span>
              ))}
            </div>
            <p>
              {p.category === "MENU" ? (
                <button className="btn primary" onClick={() => setModal(p)}>
                  VIEW MENU →
                </button>
              ) : (
                <a
                  className="btn primary"
                  target="_blank"
                  rel="noopener"
                  href={p.url}
                >
                  Visit Project →
                </a>
              )}
            </p>
          </div>
        </article>
      ))}
      {modal && <MenuModal project={modal} onClose={() => setModal(null)} />}
    </section>
  );
}
function Styles() {
  const [modal, setModal] = useState(null);
  useEffect(() => {
    const closeOnEscape = (event) => event.key === "Escape" && setModal(null);
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, []);
  return (
    <section id="styles" className="section">
      <span className="kicker">Visual range</span>
      <h2>20 DESIGN STYLES</h2>
      <div className="styles">
        {designStyles.map((s) => (
          <button key={s.id} className="style-card" onClick={() => setModal(s)}>
            <div className={"mini " + s.previewClass} />
            <b>{s.name}</b>
          </button>
        ))}
      </div>
      {modal && (
        <div
          className="modal open"
          role="dialog"
          aria-modal="true"
          aria-label={`${modal.name} style preview`}
          onClick={(e) =>
            e.target.className.includes("modal") && setModal(null)
          }
        >
          <div className="modal-box">
            <button
              className="theme"
              onClick={() => setModal(null)}
              aria-label="Close style preview"
            >
              ×
            </button>
            <h3>{modal.name}</h3>
            <div className={"mini " + modal.previewClass} />
            <p>{modal.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}
function Pricing() {
  const p = [
    ["DIGITAL MENU BASIC", pricingConfig.digitalMenuTiers.basic.amount],
    ["DIGITAL MENU PRO", pricingConfig.digitalMenuTiers.advanced.amount],
    ["BUSINESS WEBSITE", pricingConfig.services["Business Website"].base],
    [
      "WEBSITE + DIGITAL MENU",
      pricingConfig.services["Website + Digital Menu"].base,
    ],
    ["CUSTOM", null],
  ];
  return (
    <section id="pricing" className="section">
      <span className="kicker">Starting points</span>
      <h2>PRICING</h2>
      <div className="pricing">
        {p.map(([name, amount]) => (
          <article key={name} className="card price">
            <h3>{name}</h3>
            <strong>
              {amount == null ? "Discuss requirements" : formatCurrency(amount)}
            </strong>
            <p style={{ marginTop: "auto" }}>
              <a className="btn" href="#plan">
                Choose
              </a>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
function About() {
  return (
    <section id="about" className="section grid2">
      <div>
        <span className="kicker">About</span>
        <h2>Business-focused design, built with frontend craft.</h2>
      </div>
      <div className="lead">
        <p>
          {brand.name} is an independent digital solution provider focused on
          web development, modern digital experiences, business-focused design,
          interactive interfaces, custom client requirements, and technology
          plus visual design.
        </p>
        <p>
          The promise is clear communication, careful design decisions,
          responsive implementation, and practical digital solutions without
          fake awards or inflated claims.
        </p>
      </div>
    </section>
  );
}

const plannerDefaults = {
  businessType: "",
  service: "",
  designStyle: "",
  designStyleName: "",
  selectedFeatures: "",
  aiSuggestedFeatures: "",
  aiSummary: "",
  requirementsText: "",
  clientBudgetRange: "",
  startDate: "",
  targetDate: "",
  serviceTier: "",
  pageCount: "",
  menuItemCount: "",
  menuCategoryCount: "",
  contentComplexity: "low",
  functionalComplexity: "low",
  interactionComplexity: "low",
  designComplexity: "low",
  name: "",
  email: "",
  phone: "",
  selectedMenuTemplate: "",
  selectedMenuTemplateName: "",
  signature: "",
};
function normalizePlannerState(raw) {
  const safe = { ...plannerDefaults };
  if (raw && typeof raw === "object" && !Array.isArray(raw))
    for (const k of Object.keys(safe))
      safe[k] =
        typeof raw[k] === "string"
          ? raw[k]
          : raw[k] == null
            ? ""
            : String(raw[k]);
  if (!safe.startDate) safe.startDate = getProposedStartDate();
  return safe;
}
function DirectionGrid({ items, selected, onSelect }) {
  return (
    <div className="style-select-grid menu-direction-grid">
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          className="select-card"
          aria-pressed={selected === item.id}
          onClick={() => onSelect(item)}
        >
          <b>{item.name}</b>
          <small>{item.description}</small>
        </button>
      ))}
    </div>
  );
}
function DesignChoice({ data, set }) {
  const [limitMessage, setLimitMessage] = useState("");
  const isDigital = data.service === "Digital Menu",
    isBundle = data.service === "Website + Digital Menu",
    isGraphic = data.service === "Graphic Menu Design",
    websiteLike = [
      "Business Website",
      "Website + Digital Menu",
      "Custom Digital Solution",
      "AI / Interactive Experience",
      "Other",
    ].includes(data.service);
  const selected = (data.designStyle || "").split(",").filter(Boolean);
  function toggle(st) {
    if (!selected.includes(st.id) && selected.length >= 3) {
      setLimitMessage("Choose up to three Website Styles.");
      return;
    }
    setLimitMessage("");
    const arr = selected.includes(st.id)
      ? selected.filter((x) => x !== st.id)
      : [...selected, st.id];
    set("designStyle", arr.join(","));
    set(
      "designStyleName",
      designStyles
        .filter((x) => arr.includes(x.id))
        .map((x) => x.name)
        .join(", "),
    );
  }
  return (
    <>
      {websiteLike && (
        <section
          className="design-area"
          aria-labelledby="website-style-heading"
        >
          <div className="planner-subhead">
            <div>
              <span className="field-status">Visual deliverable</span>
              <h4 id="website-style-heading">Website Style</h4>
            </div>
            <span className="selection-rule">Select up to 3</span>
          </div>
          <p className="hint">
            Choose the directions that best match your website.
          </p>
          <div className="style-select-grid">
            {designStyles.map((st) => (
              <button
                key={st.id}
                type="button"
                className="select-card"
                aria-pressed={selected.includes(st.id)}
                onClick={() => toggle(st)}
              >
                <div className={"mini " + st.previewClass} />
                <b>{st.name}</b>
                <small>{st.description}</small>
              </button>
            ))}
          </div>
          {limitMessage && (
            <p className="error" role="status">
              {limitMessage}
            </p>
          )}
        </section>
      )}
      {(isDigital || isBundle) && (
        <section className="design-area" aria-labelledby="digital-menu-heading">
          <div className="planner-subhead">
            <div>
              <span className="field-status">Separate visual deliverable</span>
              <h4 id="digital-menu-heading">Digital Menu Design</h4>
            </div>
            <span className="selection-rule">Select 1</span>
          </div>
          {isBundle && (
            <p className="hint">
              This choice applies to the menu and is separate from the Website
              Style above.
            </p>
          )}
          <DirectionGrid
            items={menuDirections}
            selected={data.selectedMenuTemplate}
            onSelect={(item) => {
              set("selectedMenuTemplate", item.id);
              set("selectedMenuTemplateName", item.name);
              if (isDigital) {
                set("designStyle", item.id);
                set("designStyleName", item.name);
              }
            }}
          />
        </section>
      )}
      {isGraphic && (
        <section className="design-area" aria-labelledby="graphic-menu-heading">
          <div className="planner-subhead">
            <div>
              <span className="field-status">Visual deliverable</span>
              <h4 id="graphic-menu-heading">Graphic Menu Design</h4>
            </div>
            <span className="selection-rule">Select 1</span>
          </div>
          <h5 className="choice-group-title">Existing Menu Designs</h5>
          <DirectionGrid
            items={graphicAssetMenuDirections}
            selected={data.designStyle}
            onSelect={(item) => {
              set("designStyle", item.id);
              set("designStyleName", item.name);
            }}
          />
          <h5 className="choice-group-title">Additional Design Directions</h5>
          <DirectionGrid
            items={graphicMenuDirections}
            selected={data.designStyle}
            onSelect={(item) => {
              set("designStyle", item.id);
              set("designStyleName", item.name);
            }}
          />
        </section>
      )}
    </>
  );
}
const complexityOptions = {
  content: [
    { value: "low", label: "Simple" },
    { value: "medium", label: "Moderate" },
    { value: "high", label: "Large / Detailed" },
  ],
  functional: [
    { value: "low", label: "Basic" },
    { value: "medium", label: "Some Extra Functions" },
    { value: "high", label: "Advanced Functionality" },
  ],
  interaction: [
    { value: "low", label: "Simple / Static" },
    { value: "medium", label: "Interactive" },
    { value: "high", label: "Highly Interactive" },
  ],
  design: [
    { value: "low", label: "Simple" },
    { value: "medium", label: "Branded / Detailed" },
    { value: "high", label: "Premium / Custom" },
  ],
};
const complexityByService = {
  "Graphic Menu Design": ["content", "design"],
  "Digital Menu": ["content", "functional", "interaction", "design"],
  "Website + Digital Menu": ["content", "functional", "interaction", "design"],
  "Business Website": ["content", "functional", "interaction", "design"],
  "Custom Digital Solution": ["content", "functional", "interaction", "design"],
  "AI / Interactive Experience": [
    "content",
    "functional",
    "interaction",
    "design",
  ],
  Other: ["content", "functional", "interaction", "design"],
};
const complexityLabels = {
  content: "How much content?",
  functional: "What level of functionality?",
  interaction: "How interactive should it be?",
  design: "How customised should the design be?",
};
const complexityHelp = {
  content:
    "Consider the amount of copy, imagery, products, or menu information.",
  functional: "Choose how many practical tools or workflows the project needs.",
  interaction: "Choose how dynamic and responsive the experience should feel.",
  design: "Choose the level of brand detail and custom visual treatment.",
};
const serviceDescriptions = {
  "AI / Interactive Experience":
    "AI-assisted tools and immersive digital experiences.",
  "Business Website":
    "A professional website built around your business goals.",
  "Custom Digital Solution":
    "A tailored system, workflow, dashboard, or digital product.",
  "Digital Menu": "A mobile-friendly QR menu for easy customer access.",
  "Graphic Menu Design":
    "A polished menu designed for print, mobile, or social use.",
  "Website + Digital Menu":
    "A coordinated business website and separate digital menu.",
  Other: "A project that does not fit the standard service categories.",
};
const stepDescriptions = [
  "Tell us what kind of business or project you are planning.",
  "Choose the service that best matches the outcome you need.",
  "Choose a visual direction for your selected deliverable.",
  "Shape the scope with relevant options and complexity choices.",
  "Describe the result you need in your own words.",
  "Choose a realistic delivery target and review the working days.",
  "Select the budget range you are comfortable planning around.",
  "Confirm the scope, add contact details, and sign when ready.",
];
const featureDescriptions = {
  qr_access: "Let customers open the menu instantly from a QR code.",
  whatsapp: "Give visitors a direct path to enquire on WhatsApp.",
  call_button: "Add a prominent one-tap calling action.",
  google_maps: "Help customers find the business location easily.",
  pdf_download: "Allow visitors to download a portable menu copy.",
  custom_icons: "Create a distinctive visual language with tailored icons.",
  custom_graphics: "Add branded graphics created for the experience.",
  multiple_languages: "Present key content in an additional language.",
  advanced_interaction:
    "Add richer motion and responsive interactive behavior.",
  premium_visual: "Apply a more bespoke, premium visual treatment.",
  image_cleanup: "Improve supplied images for a cleaner presentation.",
  social_version: "Prepare an adapted version for mobile or social sharing.",
  extra_revision: "Add another structured revision round.",
  additional_pages: "Extend the website beyond its included page count.",
  contact_form: "Collect customer enquiries through a clear form.",
  gallery: "Showcase work, products, spaces, or highlights visually.",
  booking: "Let customers request or schedule appointments.",
  payment: "Support an online payment step in the experience.",
  cms: "Make selected content easier to publish and maintain.",
  analytics: "Measure visits and important user actions.",
  seo: "Prepare essential pages for stronger search visibility.",
  advanced_animation: "Use refined motion for key sections and transitions.",
  api_integration: "Connect the experience to an external service or API.",
  authentication: "Add secure sign-in and account access.",
  dashboard: "Provide a focused dashboard for users or administrators.",
  database: "Store and manage structured project information.",
  automation: "Reduce repetitive work with automated actions.",
  custom_workflows: "Support a tailored multi-step business process.",
  admin_panel: "Manage content or operations from a dedicated interface.",
  ai_api: "Connect an AI capability to the digital experience.",
  ai_chatbot: "Add a conversational assistant for guided interactions.",
  ai_recommendation: "Offer suggestions based on user inputs or context.",
  ai_content: "Generate useful content through a guided AI workflow.",
  interactive_experience: "Create a more immersive, participatory experience.",
  webgl: "Use real-time 3D or graphics in the browser.",
  advanced_3d: "Build a more detailed custom 3D experience.",
  custom_interactions: "Create bespoke interaction patterns for the product.",
};
const featureGroupOrder = [
  "Core & Conversion",
  "Integrations",
  "Design & Visual",
  "Advanced Functionality",
  "Interaction",
];
const featureGroups = {
  qr_access: "Core & Conversion",
  whatsapp: "Core & Conversion",
  call_button: "Core & Conversion",
  pdf_download: "Core & Conversion",
  contact_form: "Core & Conversion",
  booking: "Core & Conversion",
  payment: "Core & Conversion",
  extra_revision: "Core & Conversion",
  google_maps: "Integrations",
  analytics: "Integrations",
  api_integration: "Integrations",
  ai_api: "Integrations",
  multiple_languages: "Integrations",
  premium_visual: "Design & Visual",
  custom_icons: "Design & Visual",
  custom_graphics: "Design & Visual",
  image_cleanup: "Design & Visual",
  social_version: "Design & Visual",
  gallery: "Design & Visual",
  seo: "Design & Visual",
  additional_pages: "Advanced Functionality",
  cms: "Advanced Functionality",
  authentication: "Advanced Functionality",
  dashboard: "Advanced Functionality",
  database: "Advanced Functionality",
  automation: "Advanced Functionality",
  custom_workflows: "Advanced Functionality",
  admin_panel: "Advanced Functionality",
  ai_chatbot: "Advanced Functionality",
  ai_recommendation: "Advanced Functionality",
  ai_content: "Advanced Functionality",
  advanced_interaction: "Interaction",
  advanced_animation: "Interaction",
  interactive_experience: "Interaction",
  webgl: "Interaction",
  advanced_3d: "Interaction",
  custom_interactions: "Interaction",
};
function FeaturesChoice({ data, set }) {
  const [quantityError, setQuantityError] = useState("");
  const numeric = (key, value) => {
    const max = key === "menuItemCount" ? MENU_ITEM_MAX : MENU_CATEGORY_MAX;
    if (value === "") {
      set(key, value);
      setQuantityError("");
    } else if (/^[1-9]\d*$/.test(value) && Number(value) <= max) {
      set(key, value);
      setQuantityError("");
    } else {
      setQuantityError(`Enter a whole number from 1 to ${max}.`);
    }
  };
  const numericMenu = ["Digital Menu", "Website + Digital Menu"].includes(
    data.service,
  );
  const ids = (serviceFeatureIds[data.service] || []).filter(
      (id) =>
        !(numericMenu && ["additional_category", "large_content"].includes(id)),
    ),
    selected = (data.selectedFeatures || "").split(",").filter(Boolean),
    toggle = (id) =>
      set(
        "selectedFeatures",
        (selected.includes(id)
          ? selected.filter((x) => x !== id)
          : [...selected, id]
        ).join(","),
      );
  const menuEstimate = numericMenu ? estimateProject(data) : null,
    groupedFeatures = featureGroupOrder
      .map((name) => ({
        name,
        ids: ids.filter(
          (id) => (featureGroups[id] || "Core & Conversion") === name,
        ),
      }))
      .filter((group) => group.ids.length);
  const tiers =
      data.service === "Digital Menu"
        ? pricingConfig.digitalMenuTiers
        : data.service === "Business Website"
          ? pricingConfig.websiteTiers
          : null,
    tierOptions = tiers
      ? Object.entries(tiers).map(([value, tier]) => ({
          value,
          label: tier.label,
        }))
      : [];
  return (
    <>
      {tiers && (
        <CustomSelect
          label="Package"
          value={data.serviceTier}
          onChange={(v) => set("serviceTier", v)}
          options={tierOptions}
        />
      )}{" "}
      {[
        "Business Website",
        "Website + Digital Menu",
        "Graphic Menu Design",
      ].includes(data.service) && (
        <Field
          label="Number of pages"
          type="number"
          min="1"
          step="1"
          value={data.pageCount}
          onChange={(v) => numeric("pageCount", v)}
        />
      )}{" "}
      {numericMenu && (
        <div className="menu-quantity-panel">
          <div className="planner-subhead compact">
            <div>
              <span className="field-status">Required scope</span>
              <h4>Menu quantity</h4>
            </div>
            <div className="menu-page-estimate" aria-live="polite">
              <span>Estimated Menu Pages</span>
              <b>
                {menuEstimate?.estimatedMenuPages
                  ? `Approximately ${menuEstimate.estimatedMenuPages} page${menuEstimate.estimatedMenuPages === 1 ? "" : "s"}`
                  : "Add quantities to estimate"}
              </b>
            </div>
          </div>
          <div className="grid2 quantity-grid">
            <Field
              label="Number of Menu Items"
              type="number"
              min="1"
              max={MENU_ITEM_MAX}
              step="1"
              value={data.menuItemCount}
              onChange={(v) => numeric("menuItemCount", v)}
              required
              helper="More items may require additional menu pages."
            />
            <Field
              label="Number of Menu Categories"
              type="number"
              min="1"
              max={MENU_CATEGORY_MAX}
              step="1"
              value={data.menuCategoryCount}
              onChange={(v) => numeric("menuCategoryCount", v)}
              required
              helper="Use the main sections customers will browse."
            />
          </div>
        </div>
      )}
      {quantityError && (
        <p className="error" role="status">
          {quantityError}
        </p>
      )}
      <div className="planner-subhead feature-heading">
        <div>
          <span className="field-status optional">Optional</span>
          <h4>Choose useful features</h4>
        </div>
        <p>Only options relevant to this service are shown.</p>
      </div>
      {ids.length ? (
        <div className="feature-groups">
          {groupedFeatures.map((group) => (
            <section className="feature-group" key={group.name}>
              <h5>{group.name}</h5>
              <div className="feature-grid">
                {group.ids.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="select-card feature-card"
                    aria-pressed={id === "qr_access" || selected.includes(id)}
                    disabled={id === "qr_access"}
                    onClick={() => toggle(id)}
                  >
                    <span className="feature-card-topline">
                      <b>{featureCatalog[id][0]}</b>
                      <span className="feature-status">
                        {id === "qr_access" ? "Included" : "Optional"}
                      </span>
                    </span>
                    <small>
                      {featureDescriptions[id] ||
                        "Add this option to the selected project scope."}
                    </small>
                  </button>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <p className="hint">
          Describe this unknown project in Requirements; no fixed feature list
          is assumed.
        </p>
      )}
      <div className="planner-subhead complexity-heading">
        <div>
          <span className="field-status">Scope guidance</span>
          <h4>Project complexity</h4>
        </div>
        <p>Choose the closest fit. These answers refine the estimate.</p>
      </div>
      <div className="grid2 complexity-questions">
        {(complexityByService[data.service] || []).map((axis) => (
          <div className="complexity-card" key={axis}>
            <CustomSelect
              label={complexityLabels[axis]}
              value={data[axis + "Complexity"]}
              onChange={(v) => set(axis + "Complexity", v)}
              options={complexityOptions[axis]}
            />
            <p>{complexityHelp[axis]}</p>
          </div>
        ))}
      </div>
    </>
  );
}
function TimelineChoice({ data, set }) {
  const days = countWorkingDays(data.startDate, data.targetDate),
    error = data.targetDate
      ? validateTargetDate(data.startDate, data.targetDate)
      : "";
  return (
    <>
      <div className="timeline-overview" aria-live="polite">
        <span>Planned delivery window</span>
        <strong>
          {formatProjectDate(data.startDate)} <i aria-hidden="true">→</i>{" "}
          {formatProjectDate(data.targetDate)}
        </strong>
        <p>{days ? `${days} working days` : "Choose a target date"}</p>
      </div>
      <div className="summary timeline-summary">
        <Summary
          k="Project Start"
          v={"Tomorrow — " + formatProjectDate(data.startDate)}
        />
        <Summary k="Target Completion" v={formatProjectDate(data.targetDate)} />
        <Summary k="Working Days" v={days ? days + " working days" : "—"} />
        <Summary
          k="Delivery Type"
          v={
            days ? (days < 7 ? "Priority Delivery" : "Standard Delivery") : "—"
          }
        />
      </div>
      <Field
        label="Target Completion"
        type="date"
        min={data.startDate}
        value={data.targetDate}
        onChange={(v) => set("targetDate", v)}
        required
        helper="Delivery days are counted Monday to Saturday."
      />
      {error && (
        <div className="error" role="alert">
          {error}
        </div>
      )}
      {days > 0 && days < 7 && (
        <p className="hint">
          The requested timeline is shorter than the standard 7-working-day
          delivery period. A priority delivery fee has been included.
        </p>
      )}
    </>
  );
}
function Planner() {
  const initial = () => {
    try {
      return normalizePlannerState(
        JSON.parse(localStorage.plannerReact || "{}"),
      );
    } catch {
      return normalizePlannerState({});
    }
  };
  const [data, setData] = useState(initial),
    [step, setStep] = useState(0),
    [err, setErr] = useState(""),
    [ai, setAi] = useState(""),
    [aiLoading, setAiLoading] = useState(false),
    aiInFlight = useRef(false);
  useEffect(() => {
    try {
      localStorage.plannerReact = JSON.stringify(data);
    } catch {}
  }, [data]);
  const set = (k, v) =>
      setData((d) => normalizePlannerState({ ...d, [k]: String(v ?? "") })),
    steps = [
      "Business / Project Type",
      "Service Required",
      "Design Style",
      "Features & Add-ons",
      "Requirements",
      "Timeline",
      "Budget",
      "Contact + Review",
    ],
    estimate = estimateProject(data),
    comparison = compareBudget(data, estimate);
  function chooseService(service) {
    setData((current) =>
      normalizePlannerState({
        ...current,
        service,
        designStyle: "",
        designStyleName: "",
        selectedMenuTemplate: "",
        selectedMenuTemplateName: "",
        selectedFeatures: "",
        aiSuggestedFeatures: "",
        serviceTier: "",
        menuItemCount: "",
        menuCategoryCount: "",
        pageCount: ["Business Website", "Website + Digital Menu"].includes(
          service,
        )
          ? "3"
          : service === "Graphic Menu Design"
            ? "1"
            : "",
      }),
    );
  }
  function valid() {
    if (step === 2) {
      const designError = validateDesignSelection(data);
      if (designError) {
        setErr(designError);
        return false;
      }
    }
    if (
      step === 3 &&
      ["Digital Menu", "Website + Digital Menu"].includes(data.service)
    ) {
      const quantityError = validateMenuQuantities(data);
      if (quantityError) {
        setErr(quantityError);
        return false;
      }
    }
    const req = [
      ["businessType"],
      ["service"],
      [],
      [],
      ["requirementsText"],
      ["targetDate"],
      ["clientBudgetRange"],
      ["name", "email", "phone"],
    ][step];
    for (const k of req)
      if (!data[k] || String(data[k]).trim().length < 2) {
        setErr("Please complete the required field.");
        return false;
      }
    if (step === 5 && validateTargetDate(data.startDate, data.targetDate)) {
      setErr(validateTargetDate(data.startDate, data.targetDate));
      return false;
    }
    if (step === 7 && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      setErr("Enter a valid email.");
      return false;
    }
    if (
      step === 7 &&
      !/^(\+91[\s-]?)?[6-9]\d{9}$/.test(data.phone.replace(/\s/g, ""))
    ) {
      setErr("Enter a valid Indian phone number.");
      return false;
    }
    return true;
  }
  async function interpret() {
    if (aiInFlight.current) return;
    if (!data.requirementsText.trim()) return setAi("Add requirements first.");
    aiInFlight.current = true;
    setAiLoading(true);
    setAi("Interpreting requirements…");
    try {
      const r = await fetch("/.netlify/functions/ai-planner", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            requirements: data.requirementsText,
            service: data.service,
          }),
        }),
        j = await r.json();
      if (!r.ok) throw 0;
      set("aiSuggestedFeatures", (j.suggestedFeatures || []).join(","));
      set("aiSummary", j.summary || "");
      for (const k of [
        "contentComplexity",
        "functionalComplexity",
        "interactionComplexity",
      ])
        if (j[k]) set(k, j[k]);
      setAi("Validated suggestions added to the deterministic scope.");
    } catch {
      setAi(
        "AI interpretation is temporarily unavailable. Manual selections and pricing are still available.",
      );
    } finally {
      aiInFlight.current = false;
      setAiLoading(false);
    }
  }
  return (
    <section id="plan" className="section">
      <span className="kicker">Start well</span>
      <h2>LET'S PLAN</h2>
      <div className="planner card">
        <div className="steps">
          {steps.map((x, i) => (
            <button
              key={x}
              className={`step-dot${i === step ? " active" : ""}${i < step ? " complete" : ""}${i > step ? " upcoming" : ""}`}
              disabled={i > step}
              onClick={() => i < step && setStep(i)}
              aria-current={i === step ? "step" : undefined}
            >
              <b aria-hidden="true">{i < step ? "✓" : i + 1}</b>
              <span>{x}</span>
            </button>
          ))}
        </div>
        <div className="planner-stage">
          <div className="planner-stage-header">
            <span className="kicker">
              Step {step + 1} of {steps.length}
            </span>
            <h3>{steps[step]}</h3>
            <p>{stepDescriptions[step]}</p>
          </div>
          {step === 0 && (
            <Field
              label="Business / Project Type"
              value={data.businessType}
              onChange={(v) => set("businessType", v)}
              required
              placeholder="For example, neighbourhood café or new product"
              helper="A short name or description is enough."
            />
          )}{" "}
          {step === 1 && (
            <div className="service-choice-grid" aria-label="Service Required">
              {serviceTypes.map((service) => (
                <button
                  key={service}
                  type="button"
                  className="service-choice"
                  aria-pressed={data.service === service}
                  onClick={() => chooseService(service)}
                >
                  <span className="service-choice-mark" aria-hidden="true">
                    {data.service === service ? "✓" : "→"}
                  </span>
                  <span>
                    <b>{service}</b>
                    <small>{serviceDescriptions[service]}</small>
                  </span>
                </button>
              ))}
            </div>
          )}{" "}
          {step === 2 && <DesignChoice data={data} set={set} />}{" "}
          {step === 3 && <FeaturesChoice data={data} set={set} />}{" "}
          {step === 4 && (
            <div className="field requirements-field">
              <div className="requirements-heading">
                <div>
                  <span className="field-status">Required</span>
                  <h4>Tell us what you need</h4>
                </div>
                <span className="micro">Plain language is perfect</span>
              </div>
              <label>
                <span className="visually-hidden">Requirements</span>
                <textarea
                  value={data.requirementsText}
                  onChange={(e) => set("requirementsText", e.target.value)}
                  placeholder="Describe pages, menu sections, features, content, integrations, and important requirements."
                  aria-required="true"
                />
              </label>
              <div className="requirements-tools">
                <button
                  className={`btn ai-button${aiLoading ? " loading" : ""}`}
                  type="button"
                  onClick={interpret}
                  disabled={aiLoading}
                >
                  {aiLoading && (
                    <span className="button-spinner" aria-hidden="true" />
                  )}
                  {aiLoading ? "Interpreting…" : "Interpret with Gemini"}
                </button>
                {ai && (
                  <p className="micro" role="status">
                    {ai}
                  </p>
                )}
              </div>
              {data.aiSummary && (
                <p className="hint">
                  <b>AI summary:</b> {data.aiSummary}
                </p>
              )}
            </div>
          )}{" "}
          {step === 5 && <TimelineChoice data={data} set={set} />}{" "}
          {step === 6 && (
            <>
              <div className="planner-subhead compact">
                <div>
                  <span className="field-status">Required</span>
                  <h4>Comfortable budget range</h4>
                </div>
                <p>This helps compare your selected scope with your budget.</p>
              </div>
              <div className="style-select-grid budget-grid">
                {budgetRanges.map((b) => (
                  <button
                    key={b.id}
                    className="select-card"
                    aria-pressed={data.clientBudgetRange === b.id}
                    onClick={() => set("clientBudgetRange", b.id)}
                  >
                    <b>{b.label}</b>
                  </button>
                ))}
              </div>
              <p className="budget-comparison" aria-live="polite">
                {comparison}
              </p>
            </>
          )}{" "}
          {step === 7 && (
            <>
              <Field
                label="Name"
                value={data.name}
                onChange={(v) => set("name", v)}
                required
              />
              <Field
                label="Email"
                type="email"
                value={data.email}
                onChange={(v) => set("email", v)}
                required
              />
              <Field
                label="Phone"
                type="tel"
                value={data.phone}
                onChange={(v) => set("phone", v)}
                required
              />
              <div className="review-panel">
                <section className="review-section">
                  <h4>Project</h4>
                  <div className="summary">
                    <Summary k="Business / Project" v={data.businessType} />
                    <Summary k="Service" v={data.service} />
                  </div>
                </section>
                <section className="review-section">
                  <h4>Design</h4>
                  <div className="summary">
                    {data.service.includes("Website") && (
                      <Summary k="Website Style" v={data.designStyleName} />
                    )}
                    {["Digital Menu", "Website + Digital Menu"].includes(
                      data.service,
                    ) && (
                      <Summary
                        k="Digital Menu Design"
                        v={data.selectedMenuTemplateName}
                      />
                    )}
                    {data.service === "Graphic Menu Design" && (
                      <Summary
                        k="Graphic Menu Design"
                        v={data.designStyleName}
                      />
                    )}
                    {!data.service.includes("Website") &&
                      !["Digital Menu", "Graphic Menu Design"].includes(
                        data.service,
                      ) && (
                        <Summary k="Design Style" v={data.designStyleName} />
                      )}
                  </div>
                </section>
                <section className="review-section">
                  <h4>Scope</h4>
                  <div className="summary">
                    <Summary
                      k="Features & Add-ons"
                      v={getAcceptedFeatureIds(data)
                        .map((id) => featureCatalog[id]?.[0])
                        .filter(Boolean)
                        .join(", ")}
                    />
                    <Summary k="Requirements" v={data.requirementsText} />
                    {estimate.menuItemCount > 0 && (
                      <Summary
                        k="Menu Content"
                        v={`${estimate.menuItemCount} items, ${estimate.menuCategoryCount || "unspecified"} categories, approximately ${estimate.estimatedMenuPages} page${estimate.estimatedMenuPages === 1 ? "" : "s"}`}
                      />
                    )}
                  </div>
                </section>
                <section className="review-section">
                  <h4>Plan</h4>
                  <div className="summary">
                    <Summary
                      k="Timeline"
                      v={`${formatProjectDate(data.startDate)} – ${formatProjectDate(data.targetDate)} (${estimate.workingDays || 0} working days)`}
                    />
                    <Summary
                      k="Budget"
                      v={budgetLabel(data.clientBudgetRange)}
                    />
                    <Summary
                      k="Estimated Project Range"
                      v={estimate.clientLabel}
                    />
                  </div>
                </section>
              </div>
              <details className="estimate-details" open>
                <summary>How was this estimate calculated?</summary>
                {estimate.breakdown.map((b, i) => (
                  <p key={i}>
                    {b.label} {b.amount ? "+ " + formatCurrency(b.amount) : ""}
                  </p>
                ))}
                <p>{estimate.explanation}</p>
              </details>
              <ResponsiveSignaturePad
                value={data.signature}
                onChange={(v) => set("signature", v)}
              />
              <ProposalActions data={data} estimate={estimate} />
            </>
          )}{" "}
          {err && (
            <div className="error planner-error" role="alert">
              {err}
            </div>
          )}
          <div className="planner-actions">
            <button
              className="btn"
              onClick={() => setStep(Math.max(0, step - 1))}
              style={{ visibility: step ? "visible" : "hidden" }}
            >
              Back
            </button>
            {step < 7 ? (
              <button
                className="btn primary"
                onClick={() => {
                  if (valid()) {
                    setErr("");
                    setStep(step + 1);
                  }
                }}
              >
                Next
              </button>
            ) : (
              <button
                className="btn primary"
                onClick={() => {
                  localStorage.removeItem("plannerReact");
                  setData(normalizePlannerState({}));
                  setStep(0);
                  setErr("");
                }}
              >
                Start New Project
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
function formatCurrency(n) {
  return "₹" + Number(n).toLocaleString("en-IN");
}
function ProposalActions({ data, estimate }) {
  const [record, setRecord] = useState(null),
    [error, setError] = useState(""),
    [generating, setGenerating] = useState(false),
    generationInFlight = useRef(false);
  function generate() {
    if (generationInFlight.current) return;
    if (!data.signature)
      return setError(
        "Please capture the client signature before generating the signed proposal.",
      );
    generationInFlight.current = true;
    setGenerating(true);
    setError("");
    const popup = open("", "_blank");
    if (!popup) {
      generationInFlight.current = false;
      setGenerating(false);
      setError("The proposal window was blocked. Allow popups and try again.");
      return;
    }
    const proposalId = createProposalId(),
      rec = {
        proposalId,
        createdAt: new Date().toISOString(),
        ...data,
        clientName: data.name,
        clientEmail: data.email,
        websiteStyle: data.service.includes("Website")
          ? data.designStyleName
          : "",
        digitalMenuDesign: ["Digital Menu", "Website + Digital Menu"].includes(
          data.service,
        )
          ? data.selectedMenuTemplateName
          : "",
        graphicMenuDesign:
          data.service === "Graphic Menu Design" ? data.designStyleName : "",
        designDirection: [
          ...new Set(
            [data.designStyleName, data.selectedMenuTemplateName].filter(
              Boolean,
            ),
          ),
        ].join(" / "),
        estimate,
        status: "signed-local",
      };
    if (!downloadProposalPdf(rec, popup)) {
      popup.close();
      generationInFlight.current = false;
      setGenerating(false);
      setError("The proposal could not be opened. Please try again.");
      return;
    }
    setRecord(saveProposal(rec));
    setTimeout(() => {
      generationInFlight.current = false;
      setGenerating(false);
    }, 650);
  }
  function downloadAgain() {
    setError("");
    if (!downloadProposalPdf(record))
      setError("The proposal window was blocked. Allow popups and try again.");
  }
  return (
    <div className="proposal-actions card">
      <h3>
        {record?.proposalId ? "Proposal Ready" : "Generate Signed Proposal"}
      </h3>
      {error && <p className="error">{error}</p>}
      {record?.proposalId && (
        <p>
          <b>Proposal ID:</b> {record.proposalId}
        </p>
      )}
      <button
        className={`btn primary${generating ? " loading" : ""}`}
        type="button"
        disabled={generating}
        onClick={record?.proposalId ? downloadAgain : generate}
      >
        {generating && <span className="button-spinner" aria-hidden="true" />}
        {generating
          ? "Generating…"
          : record?.proposalId
            ? "Download PDF"
            : "Generate Signed PDF"}
      </button>
      {record?.proposalId && (
        <>
          <a className="btn" href={"mailto:" + data.email}>
            Email Proposal
          </a>
          <a
            className="btn"
            target="_blank"
            rel="noopener noreferrer"
            href={proposalWhatsappUrl(record)}
          >
            Share via WhatsApp
          </a>
        </>
      )}
    </div>
  );
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  min,
  max,
  step,
  required = false,
  helper = "",
  placeholder = "",
}) {
  return (
    <div className="field">
      <label>
        <span className="field-label-row">
          <span>{label}</span>
          <span className={`field-status${required ? "" : " optional"}`}>
            {required ? "Required" : "Optional"}
          </span>
        </span>
        <input
          type={type}
          min={min}
          max={max}
          step={step}
          inputMode={type === "number" ? "numeric" : undefined}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-required={required}
        />
      </label>
      {helper && <p className="field-helper">{helper}</p>}
    </div>
  );
}
function ResponsiveSignaturePad({ value, onChange }) {
  const host = useRef(null),
    previousWidth = useRef(0),
    [renderKey, setRenderKey] = useState(0);
  useEffect(() => {
    const resize = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        if (
          width >= 120 &&
          previousWidth.current &&
          width !== previousWidth.current
        )
          setRenderKey((key) => key + 1);
        if (width >= 120) previousWidth.current = width;
      }),
      theme = new MutationObserver(() => setRenderKey((key) => key + 1));
    if (host.current) resize.observe(host.current);
    theme.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => {
      resize.disconnect();
      theme.disconnect();
    };
  }, []);
  return (
    <div className="signature-resize-host" ref={host}>
      <SignaturePad key={renderKey} value={value} onChange={onChange} />
    </div>
  );
}
function Select({ label, value, onChange, opts }) {
  return (
    <div className="field">
      <label>
        {label}
        <select value={value || ""} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select</option>
          {opts.map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      </label>
    </div>
  );
}
function Summary({ k, v }) {
  return (
    <div className="item">
      <div className="kicker">{k}</div>
      <p>{v || "—"}</p>
    </div>
  );
}
function Contact() {
  return (
    <section id="contact" className="section contact-grid">
      <div>
        <span className="kicker">Contact</span>
        <h2>LET'S BUILD SOMETHING</h2>
        <p className="lead">
          Share your project through WhatsApp or email. No fake backend is
          claimed here.
        </p>
        <>
          <ul className="social-icons" aria-label="Social links">
            <li>
              <a
                className="instagram"
                target="_blank"
                rel="noopener"
                href={brand.instagram}
                aria-label="Instagram"
              >
                <span className="icon">
                  <InstagramIcon />
                </span>
              </a>
            </li>
            <li>
              <a
                className="linkedin"
                target="_blank"
                rel="noopener"
                href={brand.linkedin}
                aria-label="LinkedIn"
              >
                <span className="icon">
                  <LinkedInIcon />
                </span>
              </a>
            </li>
            <li>
              <a
                className="github"
                target="_blank"
                rel="noopener"
                href={brand.github}
                aria-label="GitHub"
              >
                <span className="icon">
                  <GitHubIcon />
                </span>
              </a>
            </li>
            <li>
              <a
                className="mail"
                href={"mailto:" + brand.email}
                aria-label="Email"
              >
                <span className="icon">
                  <MailIcon />
                </span>
              </a>
            </li>
          </ul>
          <div className="social contact-links">
            <a href={"tel:" + brand.phone}>
              <span>Phone</span>
              <b>{brand.phone}</b>
            </a>
            <a href={"mailto:" + brand.email}>
              <span>Email</span>
              <b>{brand.email}</b>
            </a>
          </div>
        </>
      </div>
      <div className="card">
        <h3>Quick contact</h3>
        <p>
          Use the planner above for a structured project message, or email
          directly.
        </p>
        <a className="btn primary" href="#plan">
          Start planner
        </a>{" "}
        <a className="btn" href={"mailto:" + brand.email}>
          Email instead
        </a>
      </div>
    </section>
  );
}
function App() {
  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <Services />
        <MenuShowcase />
        <Projects />
        <Styles />
        <Pricing />
        <About />
        <ErrorBoundary>
          <Planner />
        </ErrorBoundary>
        <Contact />
      </main>
      <footer>
        <div className="foot">
          <div className="footer-logo">
            <img src="/assets/branding/jiten-creative-co-mark.svg" alt="" />
            <div>
              <b>{brand.name}</b>
              <br />
              {brand.descriptor}
              <br />“{brand.tagline}.”
            </div>
          </div>
          <div>
            © {new Date().getFullYear()} {brand.name}
          </div>
        </div>
      </footer>
    </>
  );
}
createRoot(document.getElementById("root")).render(<App />);
