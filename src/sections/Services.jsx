import React from 'react';
import './Services.css';

const Services = () => {
  return (
    <section id="services" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">What I Build</span>
          <h2>Services</h2>
          <p>Four core ways I help businesses show up professionally online.</p>
        </div>
        <div className="service-grid">
          <div className="service-card" tabIndex="0" role="button" aria-label="Business Websites service">
            <div className="flip-inner">
              <div className="flip-face flip-front">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="14" rx="2"/>
                    <line x1="3" y1="9" x2="21" y2="9"/>
                  </svg>
                </div>
                <h3>Business Websites</h3>
                <p>Professional websites for local businesses, professionals, startups and growing brands.</p>
              </div>
              <div className="flip-face flip-back">
                <h3>Business Websites</h3>
                <p>Professional websites for local businesses, professionals, startups and growing brands — built to look credible and convert visitors into inquiries.</p>
                <a href="#planner" className="card-cta">Start Project</a>
              </div>
            </div>
          </div>
          <div className="service-card" tabIndex="0" role="button" aria-label="Digital Menus service">
            <div className="flip-inner">
              <div className="flip-face flip-front">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="4" width="16" height="16" rx="2"/>
                    <path d="M8 8h8M8 12h8M8 16h5"/>
                  </svg>
                </div>
                <h3>Digital Menus</h3>
                <p>Mobile-friendly QR digital menus with modern design, categories and images.</p>
              </div>
              <div className="flip-face flip-back">
                <h3>Digital Menus</h3>
                <p>Mobile-friendly QR digital menus with modern design, categories, images and WhatsApp/contact options built in.</p>
                <a href="#planner" className="card-cta">Start Project</a>
              </div>
            </div>
          </div>
          <div className="service-card" tabIndex="0" role="button" aria-label="E-Commerce Websites service">
            <div className="flip-inner">
              <div className="flip-face flip-front">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="9" cy="20" r="1.4"/>
                    <circle cx="17" cy="20" r="1.4"/>
                    <path d="M3 4h2l2.2 11h9.6L19 8H6"/>
                  </svg>
                </div>
                <h3>E-Commerce Websites</h3>
                <p>Online stores with product catalogues and business-focused shopping experiences.</p>
              </div>
              <div className="flip-face flip-back">
                <h3>E-Commerce Websites</h3>
                <p>Online stores with product catalogues, responsive design, product pages and a business-focused shopping experience.</p>
                <a href="#planner" className="card-cta">Start Project</a>
              </div>
            </div>
          </div>
          <div className="service-card" tabIndex="0" role="button" aria-label="Custom Web Applications service">
            <div className="flip-inner">
              <div className="flip-face flip-front">
                <div className="service-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l3 6 6 1-4.5 4.5L18 20l-6-3-6 3 1.5-6.5L3 9l6-1z"/>
                  </svg>
                </div>
                <h3>Custom Web Applications</h3>
                <p>Custom dashboards, AI tools, business systems and automation platforms.</p>
              </div>
              <div className="flip-face flip-back">
                <h3>Custom Web Applications</h3>
                <p>Custom dashboards, AI tools, business systems, automation platforms and web applications tailored to how your business runs.</p>
                <a href="#planner" className="card-cta">Start Project</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;