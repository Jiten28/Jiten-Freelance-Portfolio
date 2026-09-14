import React from 'react';
import { PRICING_PACKAGES } from '../data/data.js';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">{PRICING_PACKAGES.sectionHead.kicker}</span>
          <h2>{PRICING_PACKAGES.sectionHead.title}</h2>
          <p>{PRICING_PACKAGES.sectionHead.description}</p>
        </div>
        <div className="price-grid">
          {PRICING_PACKAGES.packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`price-card ${pkg.highlighted ? 'hi' : ''}`}
              role="region"
              aria-labelledby={`${pkg.id}-price`}
              aria-roledescription={pkg.highlighted ? "highlighted" : undefined}
            >
              <h3 id={`${pkg.id}-price`}>{pkg.title}</h3>
              <div className="price-amt">{pkg.price}</div>
              <ul className="price-list">
                {pkg.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Add-ons Section */}
        <div className="add-ons-section">
          <h3>Add-ons</h3>
          <p>Enhance your project with these optional services:</p>
          <div className="add-ons-grid">
            {PRICING_PACKAGES.addons.map((addon, index) => (
              <div key={index} className="add-on-item">
                <h4>{addon.title}</h4>
                <p>{addon.price}</p>
              </div>
            ))}
          </div>
          <p className="add-ons-note">Add-ons are optional and not automatically included in any package.</p>
        </div>

        {/* Hosting/Deployment Pricing Section */}
        <div className="hosting-pricing-section">
          <h3>Hosting & Deployment</h3>
          <p>JITEN LABS setup/deployment charges are separate from third-party hosting/platform costs.</p>
          <div className="hosting-grid">
            {PRICING_PACKAGES.hosting.map((host, index) => (
              <div key={index} className="hosting-item">
                <h4>{host.name}</h4>
                <p>{host.setupFee}</p>
              </div>
            ))}
          </div>
          <p className="hosting-disclaimer">{PRICING_PACKAGES.disclaimer}</p>
        </div>

        <p className="price-note">
          Custom projects: <a href="#planner" className="price-link">let's discuss your requirements →</a><br />
          Final pricing is confirmed after reviewing the project requirements and scope.
        </p>
      </div>
    </section>
  );
};

export default Pricing;