import React, { useState } from 'react';
import './DesignStyles.css';

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
  {n:"AI / Tech", g:["#0a0e27","#3b82f6"], fit:"AI products, tech startups", d:"Futuristic gradients and geometric detail signalling technology."}
];

const DesignStyles = () => {
  const [styleIndex, setStyleIndex] = useState(null);

  const renderStyles = () => {
    return DESIGN_STYLES.map((s, i) => (
      <div key={i} className={`style-card${styleIndex === i ? ' selected' : ''}`} tabIndex="0" aria-selected={styleIndex === i} role="radio" aria-label={`${s.n} design style${styleIndex === i ? ', selected' : ''}`}>
        <div className="style-mini" style={{ background: `linear-gradient(135deg, ${s.g[0]}, ${s.g[1]})` }} aria-hidden="true"></div>
        <div className="style-body">
          <h4>{s.n}</h4>
          <span className="fit">Best for: {s.fit}</span>
          <p>{s.d}</p>
          <button className="style-pick" onClick={() => setStyleIndex(i)}>
            {styleIndex === i ? 'Selected' : 'Choose This Style'}
          </button>
        </div>
      </div>
    ));
  };

  return (
    <section id="styles" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">For Your Future Website</span>
          <h2>Choose Your Design Style</h2>
          <p>These are visual directions you can pick for your own website — not completed projects. Your selection carries through to the planner, summary, WhatsApp message and proposal PDF.</p>
        </div>
        <div className="style-grid" id="styleGrid" role="radiogroup" aria-label="Design style selection">
          {renderStyles()}
        </div>
      </div>
    </section>
  );
};

export default DesignStyles;