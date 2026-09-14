import React from 'react';
import { WHY_CHOOSE_ME_ITEMS } from '../data/data.js';
import './WhyChooseMe.css';

const WhyChooseMe = () => {
  return (
    <section id="why-choose-me" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Why Work With Me</span>
          <h2>Why Choose Me</h2>
        </div>
        <div className="why-grid" role="list">
          {WHY_CHOOSE_ME_ITEMS.map((item) => (
            <div
              key={item.id}
              className="why-item"
              role="listitem"
              aria-label={item.description}
            >
              <div className="why-icon">{item.icon}</div>
              <h4>{item.title}</h4>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;