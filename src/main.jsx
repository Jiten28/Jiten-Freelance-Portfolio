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
  graphicMenuDirections,
  serviceTypes,
} from "./data/menuDirections.js";
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
              aria-label="Open menu"
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
          onClick={(e) =>
            e.target.className.includes("modal") && setModal(null)
          }
        >
          <div className="modal-box">
            <button className="theme" onClick={() => setModal(null)}>
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
    const arr = selected.includes(st.id)
      ? selected.filter((x) => x !== st.id)
      : selected.length >= 3
        ? selected
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
        <>
          <p className="hint">
            Website Visual Direction — choose up to 3 directions.
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
        </>
      )}
      {(isDigital || isBundle) && (
        <>
          <p className="hint">Digital Menu Design Direction</p>
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
        </>
      )}
      {isGraphic && (
        <>
          <p className="hint">Graphic Menu Design Direction</p>
          <DirectionGrid
            items={graphicMenuDirections}
            selected={data.designStyle}
            onSelect={(item) => {
              set("designStyle", item.id);
              set("designStyleName", item.name);
            }}
          />
        </>
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
    { value: "medium", label: "Some extra functions" },
    { value: "high", label: "Advanced functionality" },
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
  "Digital Menu": ["content", "interaction", "design"],
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
function FeaturesChoice({ data, set }) {
  const numeric = (key, value) => {
    if (value === "" || /^[1-9]\d*$/.test(value)) set(key, value);
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
        <div className="grid2">
          <Field
            label="Number of Menu Items"
            type="number"
            min="1"
            step="1"
            value={data.menuItemCount}
            onChange={(v) => numeric("menuItemCount", v)}
          />
          <Field
            label="Number of Menu Categories"
            type="number"
            min="1"
            step="1"
            value={data.menuCategoryCount}
            onChange={(v) => numeric("menuCategoryCount", v)}
          />
        </div>
      )}
      <p className="hint">
        Only relevant features are shown. Quantity fields cover menu volume, so
        category/content add-ons are not charged again.
      </p>
      {ids.length ? (
        <div className="style-select-grid">
          {ids.map((id) => (
            <button
              key={id}
              type="button"
              className="select-card"
              aria-pressed={id === "qr_access" || selected.includes(id)}
              disabled={id === "qr_access"}
              onClick={() => toggle(id)}
            >
              <b>{featureCatalog[id][0]}</b>
              <small>
                {id === "qr_access" ? "Included" : "Optional add-on"}
              </small>
            </button>
          ))}
        </div>
      ) : (
        <p className="hint">
          Describe this unknown project in Requirements; no fixed feature list
          is assumed.
        </p>
      )}
      <div className="grid2 complexity-questions">
        {(complexityByService[data.service] || []).map((axis) => (
          <CustomSelect
            key={axis}
            label={complexityLabels[axis]}
            value={data[axis + "Complexity"]}
            onChange={(v) => set(axis + "Complexity", v)}
            options={complexityOptions[axis]}
          />
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
      <div className="summary">
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
      />
      {error && <div className="error">{error}</div>}
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
    [ai, setAi] = useState("");
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
  function valid() {
    const req = [
      ["businessType"],
      ["service"],
      [
        data.service === "Digital Menu"
          ? "selectedMenuTemplate"
          : "designStyle",
      ],
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
    if (!data.requirementsText.trim()) return setAi("Add requirements first.");
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
              className={"step-dot " + (i === step ? "active" : "")}
              onClick={() => i < step && setStep(i)}
            >
              <b>{i + 1}</b>
              <span>{x}</span>
            </button>
          ))}
        </div>
        <div>
          {step === 0 && (
            <Field
              label="Business / Project Type"
              value={data.businessType}
              onChange={(v) => set("businessType", v)}
            />
          )}{" "}
          {step === 1 && (
            <CustomSelect
              label="Service"
              value={data.service}
              onChange={(v) =>
                setData((d) =>
                  normalizePlannerState({
                    ...d,
                    service: v,
                    designStyle: "",
                    designStyleName: "",
                    selectedMenuTemplate: "",
                    selectedMenuTemplateName: "",
                    selectedFeatures: "",
                    aiSuggestedFeatures: "",
                    serviceTier: "",
                    menuItemCount: "",
                    menuCategoryCount: "",
                    pageCount: [
                      "Business Website",
                      "Website + Digital Menu",
                    ].includes(v)
                      ? "3"
                      : v === "Graphic Menu Design"
                        ? "1"
                        : "",
                  }),
                )
              }
              options={serviceTypes}
            />
          )}{" "}
          {step === 2 && <DesignChoice data={data} set={set} />}{" "}
          {step === 3 && <FeaturesChoice data={data} set={set} />}{" "}
          {step === 4 && (
            <div className="field">
              <label>
                Requirements
                <textarea
                  value={data.requirementsText}
                  onChange={(e) => set("requirementsText", e.target.value)}
                  placeholder="Describe pages, menu sections, features, content, integrations, and important requirements."
                />
              </label>
              <button className="btn" type="button" onClick={interpret}>
                Interpret with Gemini
              </button>
              {ai && <p className="micro">{ai}</p>}
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
              <div className="style-select-grid">
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
              <p>{comparison}</p>
            </>
          )}{" "}
          {step === 7 && (
            <>
              <Field
                label="Name"
                value={data.name}
                onChange={(v) => set("name", v)}
              />
              <Field
                label="Email"
                type="email"
                value={data.email}
                onChange={(v) => set("email", v)}
              />
              <Field
                label="Phone"
                type="tel"
                value={data.phone}
                onChange={(v) => set("phone", v)}
              />
              <div className="summary">
                <Summary k="Business" v={data.businessType} />
                <Summary k="Service" v={data.service} />
                <Summary k="Design Style" v={data.designStyleName} />
                <Summary
                  k="Features"
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
                <Summary
                  k="Timeline"
                  v={`${formatProjectDate(data.startDate)} – ${formatProjectDate(data.targetDate)} (${estimate.workingDays || 0} working days)`}
                />
                <Summary k="Budget" v={budgetLabel(data.clientBudgetRange)} />
                <Summary k="Estimate" v={estimate.clientLabel} />
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
              <SignaturePad
                value={data.signature}
                onChange={(v) => set("signature", v)}
              />
              <ProposalActions data={data} estimate={estimate} />
            </>
          )}{" "}
          {err && <div className="error">{err}</div>}
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
  const [record, setRecord] = useState(null);
  function generate() {
    if (!data.signature)
      return setRecord({
        error:
          "Please capture the client signature before generating the signed proposal.",
      });
    const proposalId = createProposalId(),
      rec = saveProposal({
        proposalId,
        createdAt: new Date().toISOString(),
        ...data,
        clientName: data.name,
        clientEmail: data.email,
        designDirection: [
          ...new Set(
            [data.designStyleName, data.selectedMenuTemplateName].filter(
              Boolean,
            ),
          ),
        ].join(" / "),
        estimate,
        status: "signed-local",
      });
    setRecord(rec);
    downloadProposalPdf(rec);
  }
  return (
    <div className="proposal-actions card">
      <h3>
        {record?.proposalId ? "Proposal Ready" : "Generate Signed Proposal"}
      </h3>
      {record?.error && <p className="error">{record.error}</p>}
      {record?.proposalId && (
        <p>
          <b>Proposal ID:</b> {record.proposalId}
        </p>
      )}
      <button
        className="btn primary"
        type="button"
        onClick={
          record?.proposalId ? () => downloadProposalPdf(record) : generate
        }
      >
        {record?.proposalId ? "Download PDF" : "Generate Signed PDF"}
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
function Field({ label, value, onChange, type = "text", min, step }) {
  return (
    <div className="field">
      <label>
        {label}
        <input
          type={type}
          min={min}
          step={step}
          inputMode={type === "number" ? "numeric" : undefined}
          value={value || ""}
          onChange={(e) => onChange(e.target.value)}
        />
      </label>
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
