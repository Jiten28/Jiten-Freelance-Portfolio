import React, { useState } from 'react';
import { DESIGN_STYLES } from '../data/data.js';
import './DesignStyles.css';

const DesignStyles = () => {
  const [styleIndex, setStyleIndex] = useState(null);

  const renderStyles = () => DESIGN_STYLES.map((s, i) => (
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