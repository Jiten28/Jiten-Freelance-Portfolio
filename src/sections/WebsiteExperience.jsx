import React from 'react';
import { EXPERIENCE_ITEMS } from '../data/data.js';
import './WebsiteExperience.css';

const WebsiteExperience = () => {
  // Map the string items to objects with the needed properties for the UI
  const experienceItems = EXPERIENCE_ITEMS.map((item, index) => ({
    id: index + 1,
    name: item,
    desc: getDescription(item),
    visual: getVisual(item),
    ariaLabel: getAriaLabel(item)
  }));

  return (
    <section id="experience" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Under The Hood</span>
          <h2>The Website Experience</h2>
          <p>Every build is engineered with the same quality standards, regardless of style.</p>
        </div>
        <div className="exp-grid" id="expGrid" role="list">
          {experienceItems.map((item) => (
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

// Helper functions to maintain the same descriptions, visuals, and aria-labels
function getDescription(name) {
  const descriptions = {
    "Smooth Scrolling": "Native-like scrolling with momentum and physics",
    "Responsive Design": "Adapts seamlessly to all screen sizes",
    "Modern UI": "Contemporary interfaces with current design trends",
    "Micro-interactions": "Subtle animations and feedback for user actions",
    "Subtle Parallax": "Layered depth perception on scroll",
    "Mobile First": "Optimized for touch and small screens",
    "Fast Performance": "Optimized loading and runtime efficiency",
    "Accessible Design": "WCAG compliant with proper contrast and navigation",
    "Business-Focused UX": "Conversion-oriented design for business goals"
  };
  return descriptions[name] || "";
}

function getVisual(name) {
  const visuals = {
    "Smooth Scrolling": "↕️",
    "Responsive Design": "📱💻🖥️",
    "Modern UI": "✨",
    "Micro-interactions": "•→",
    "Subtle Parallax": "↖️↘️",
    "Mobile First": "👆",
    "Fast Performance": "⚡",
    "Accessible Design": "♿",
    "Business-Focused UX": "🎯"
  };
  return visuals[name] || "";
}

function getAriaLabel(name) {
  const labels = {
    "Smooth Scrolling": "Smooth scrolling visualization: vertical arrows indicating fluid motion",
    "Responsive Design": "Responsive design visualization: phone, tablet, and desktop icons",
    "Modern UI": "Modern UI visualization: sparkles indicating contemporary design",
    "Micro-interactions": "Micro-interactions visualization: dot transforming into arrow indicating feedback",
    "Subtle Parallax": "Subtle parallax visualization: diagonal arrows indicating layered movement",
    "Mobile First": "Mobile first visualization: hand pointing at mobile screen",
    "Fast Performance": "Fast performance visualization: lightning bolt indicating speed",
    "Accessible Design": "Accessible design visualization: wheelchair symbol indicating accessibility",
    "Business-Focused UX": "Business-focused UX visualization: target indicating goal-oriented design"
  };
  return labels[name] || "";
}

export default WebsiteExperience;