import React from 'react';
import { HOW_IT_WORKS } from '../data/data.js';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{HOW_IT_WORKS.sectionHead.kicker}</span>
          <h2>{HOW_IT_WORKS.sectionHead.title}</h2>
          <p>{HOW_IT_WORKS.sectionHead.description}</p>
        </div>
        <div className="steps-row">
          {HOW_IT_WORKS.steps.map((step) => (
            <div
              key={step.id}
              className="step-card"
              role="region"
              aria-labelledby={`step${step.id}-title`}
            >
              <div className="step-visual">{step.visual}</div>
              <h4 id={`step${step.id}-title`}>{step.title}</h4>
              <p>{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;