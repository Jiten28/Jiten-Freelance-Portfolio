import React from 'react';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section className="value-proposition">
      <div className="value-grid">
        <div className="value-content">
          <h2>What I Deliver</h2>
          <p className="lede">
            Tailored digital solutions that combine technical excellence with business acumen to drive real results for your business.
          </p>
          <div className="chip-row">
            <span className="chip">Custom Development</span>
            <span className="chip">User-Centered Design</span>
            <span className="chip">Performance Optimized</span>
            <span className="chip">Scalable Architecture</span>
            <span className="chip">Ongoing Support</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;