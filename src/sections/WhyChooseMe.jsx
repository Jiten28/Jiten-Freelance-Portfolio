import React from 'react';
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
          <div className="why-item" role="listitem" aria-label="Custom design solutions tailored to your brand">
            <div className="why-icon">🎨</div>
            <h4>Custom Design</h4>
            <p>Tailored visual solutions that reflect your unique brand identity and business goals.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="Modern technology stack for optimal performance">
            <div className="why-icon">💻</div>
            <h4>Modern Technology</h4>
            <p>Current frameworks and best practices ensuring fast, secure, and scalable solutions.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="Mobile-first approach for all devices">
            <div className="why-icon">📱</div>
            <h4>Mobile First</h4>
            <p>Everything built with mobile users as the priority, ensuring excellent experience on any device.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="Business-focused solutions that drive results">
            <div className="why-icon">🎯</div>
            <h4>Business-Focused</h4>
            <p>Solutions designed to meet specific business objectives and generate measurable ROI.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="Direct communication throughout the project">
            <div className="why-icon">💬</div>
            <h4>Direct Communication</h4>
            <p>Work directly with me - no account managers or intermediaries slowing down the process.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="Flexible solutions that adapt to your needs">
            <div className="why-icon">🔄</div>
            <h4>Flexible Solutions</h4>
            <p>Adaptable approaches that evolve with your changing requirements and feedback.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="AI and automation experience for smart solutions">
            <div className="why-icon">🤖</div>
            <h4>AI & Automation Experience</h4>
            <p>Expertise in implementing artificial intelligence and automation to enhance functionality.</p>
          </div>
          <div className="why-item" role="listitem" aria-label="Performance-focused development for speed">
            <div className="why-icon">⚡</div>
            <h4>Performance Focused</h4>
            <p>Optimized code and assets ensuring fast loading times and smooth user interactions.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseMe;