import React from 'react';
import './Pricing.css';

const Pricing = () => {
  return (
    <section id="pricing" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Investment</span>
          <h2>Pricing</h2>
          <p>Starting packages — final pricing is confirmed after reviewing your project requirements.</p>
        </div>
        <div className="price-grid">
          <div className="price-card" role="region" aria-labelledby="basic-price">
            <h3 id="basic-price">Digital Menu Basic</h3>
            <div className="price-amt">₹1,999</div>
            <ul className="price-list">
              <li>Up to 30 items</li>
              <li>Mobile responsive</li>
              <li>QR code</li>
              <li>WhatsApp button</li>
              <li>1 revision</li>
            </ul>
          </div>
          <div className="price-card hi" role="region" aria-labelledby="pro-price" aria-roledescription="highlighted">
            <h3 id="pro-price">Digital Menu Pro</h3>
            <div className="price-amt">₹4,999</div>
            <ul className="price-list">
              <li>Custom modern design</li>
              <li>Up to 60 items</li>
              <li>QR code</li>
              <li>WhatsApp</li>
              <li>Contact/location</li>
              <li>2 revisions</li>
            </ul>
          </div>
          <div className="price-card" role="region" aria-labelledby="website-price">
            <h3 id="website-price">Business Website</h3>
            <div className="price-amt">₹7,999</div>
            <ul className="price-list">
              <li>4–5 sections/pages</li>
              <li>Responsive design</li>
              <li>WhatsApp</li>
              <li>Google Maps</li>
              <li>Contact form</li>
              <li>Basic SEO</li>
              <li>2 revisions</li>
            </ul>
          </div>
          <div className="price-card" role="region" aria-labelledby="combo-price">
            <h3 id="combo-price">Website + Digital Menu</h3>
            <div className="price-amt">₹12,999</div>
            <ul className="price-list">
              <li>Complete website</li>
              <li>Dedicated digital menu</li>
              <li>Custom design</li>
              <li>WhatsApp</li>
              <li>Google Maps</li>
              <li>Responsive</li>
              <li>Includes all revisions</li>
            </ul>
          </div>
        </div>

        {/* Add-ons Section */}
        <div className="add-ons-section">
          <h3>Add-ons</h3>
          <p>Enhance your project with these optional services:</p>
          <div className="add-ons-grid">
            <div className="add-on-item">
              <h4>Google Business setup/help</h4>
              <p>₹1,000–₹2,500</p>
            </div>
            <div className="add-on-item">
              <h4>Maintenance</h4>
              <p>₹500–₹1,500/month</p>
            </div>
            <div className="add-on-item">
              <h4>Extra page</h4>
              <p>₹1,000–₹2,500</p>
            </div>
            <div className="add-on-item">
              <h4>Custom features</h4>
              <p>On request</p>
            </div>
          </div>
          <p className="add-ons-note">Add-ons are optional and not automatically included in any package.</p>
        </div>

        {/* Hosting/Deployment Pricing Section */}
        <div className="hosting-pricing-section">
          <h3>Hosting & Deployment</h3>
          <p>JITEN LABS setup/deployment charges are separate from third-party hosting/platform costs.</p>
          <div className="hosting-grid">
            <div className="hosting-item">
              <h4>Netlify</h4>
              <p>₹999–₹1,999</p>
            </div>
            <div className="hosting-item">
              <h4>Vercel</h4>
              <p>₹999–₹2,499</p>
            </div>
            <div className="hosting-item">
              <h4>Render</h4>
              <p>₹1,499–₹3,499</p>
            </div>
            <div className="hosting-item">
              <h4>Cloudflare Pages</h4>
              <p>₹999–₹1,999</p>
            </div>
            <div className="hosting-item">
              <h4>Firebase</h4>
              <p>₹1,499–₹3,499</p>
            </div>
            <div className="hosting-item">
              <h4>Supabase</h4>
              <p>₹1,999–₹4,999+</p>
            </div>
            <div className="hosting-item">
              <h4>Google Cloud / Cloud Run</h4>
              <p>₹2,499–₹5,999+</p>
            </div>
          </div>
          <p className="hosting-disclaimer">Hosting/platform costs are separate from JITEN LABS setup charges and may vary based on the provider, plan, usage, and current pricing.</p>
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