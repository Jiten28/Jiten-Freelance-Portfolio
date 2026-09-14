import React from 'react';
import './HowItWorks.css';

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Process</span>
          <h2>How It Works</h2>
          <p>A transparent, collaborative process designed for clarity and confidence at every stage.</p>
        </div>
        <div className="steps-row">
          <div className="step-card" role="region" aria-labelledby="step1-title">
            <div className="step-visual">01</div>
            <h4 id="step1-title">Discovery & Planning</h4>
            <p>We start by understanding your business, goals, and requirements to create a clear project roadmap.</p>
          </div>
          <div className="step-card" role="region" aria-labelledby="step2-title">
            <div className="step-visual">02</div>
            <h4 id="step2-title">Design & Direction</h4>
            <p>I present visual directions and style options, then refine the chosen direction based on your feedback.</p>
          </div>
          <div className="step-card" role="region" aria-labelledby="step3-title">
            <div className="step-visual">03</div>
            <h4 id="step3-title">Development & Build</h4>
            <p>I develop your solution with clean code, regular updates, and opportunities for feedback throughout.</p>
          </div>
          <div className="step-card" role="region" aria-labelledby="step4-title">
            <div className="step-visual">04</div>
            <h4 id="step4-title">Launch & Support</h4>
            <p>Final testing, deployment, and post-launch support to ensure your solution performs optimally.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;