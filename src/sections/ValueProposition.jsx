import React from 'react';
import { VALUE_PROPOSITION } from '../data/data.js';
import './ValueProposition.css';

const ValueProposition = () => {
  return (
    <section className="value-proposition">
      <div className="value-grid">
        <div className="value-content">
          <h2>{VALUE_PROPOSITION.heading}</h2>
          <p className="lede">
            {VALUE_PROPOSITION.lede}
          </p>
          <div className="chip-row">
            {VALUE_PROPOSITION.chips.map((chip, index) => (
              <span key={index} className="chip">
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValueProposition;