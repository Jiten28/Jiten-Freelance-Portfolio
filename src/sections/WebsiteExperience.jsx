import React from 'react';
import './WebsiteExperience.css';

const EXPERIENCE_ITEMS = [
  {
    id: 1,
    name: "Smooth Scrolling",
    desc: "Native-like scrolling with momentum and physics",
    visual: "↕️",
    ariaLabel: "Smooth scrolling visualization: vertical arrows indicating fluid motion"
  },
  {
    id: 2,
    name: "Responsive Design",
    desc: "Adapts seamlessly to all screen sizes",
    visual: "📱💻🖥️",
    ariaLabel: "Responsive design visualization: phone, tablet, and desktop icons"
  },
  {
    id: 3,
    name: "Modern UI",
    desc: "Contemporary interfaces with current design trends",
    visual: "✨",
    ariaLabel: "Modern UI visualization: sparkles indicating contemporary design"
  },
  {
    id: 4,
    name: "Micro-interactions",
    desc: "Subtle animations and feedback for user actions",
    visual: "•→",
    ariaLabel: "Micro-interactions visualization: dot transforming into arrow indicating feedback"
  },
  {
    id: 5,
    name: "Subtle Parallax",
    desc: "Layered depth perception on scroll",
    visual: "↖️↘️",
    ariaLabel: "Subtle parallax visualization: diagonal arrows indicating layered movement"
  },
  {
    id: 6,
    name: "Mobile First",
    desc: "Optimized for touch and small screens",
    visual: "👆",
    ariaLabel: "Mobile first visualization: hand pointing at mobile screen"
  },
  {
    id: 7,
    name: "Fast Performance",
    desc: "Optimized loading and runtime efficiency",
    visual: "⚡",
    ariaLabel: "Fast performance visualization: lightning bolt indicating speed"
  },
  {
    id: 8,
    name: "Accessible Design",
    desc: "WCAG compliant with proper contrast and navigation",
    visual: "♿",
    ariaLabel: 'Accessible design visualization: wheelchair symbol indicating accessibility'
  },
  {
    id: 9,
    name: "Business-Focused UX",
    desc: "Conversion-oriented design for business goals",
    visual: "🎯",
    ariaLabel: "Business-focused UX visualization: target indicating goal-oriented design"
  }
];

const WebsiteExperience = () => {
  return (
    <section id="experience" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Under The Hood</span>
          <h2>The Website Experience</h2>
          <p>Every build is engineered with the same quality standards, regardless of style.</p>
        </div>
        <div className="exp-grid" id="expGrid" role="list">
          {EXPERIENCE_ITEMS.map((item) => (
            <div key={item.id} className="exp-card" role="listitem" aria-label={item.ariaLabel}>
              <div className="exp-visual">{item.visual}</div>
              <h4>{item.name}</h4>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsiteExperience;