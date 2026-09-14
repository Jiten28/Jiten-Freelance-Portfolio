import React from 'react';
import './ProposalContact.css';

const ProposalContact = () => {
  return (
    <section id="contact" className="dark-section">
      <div className="wrap">
        <div className="contact-cta">
          <h2>Let's build something that works for your business.</h2>
          <p>Tell me what you need and I'll help turn it into a practical digital solution.</p>
          <div className="hero-ctas">
            <a href="#planner" className="cta-btn" aria-label="Start a new project">
              Start a Project
            </a>
            <a href="https://wa.me/917675023149" target="_blank" rel="noopener" className="ghost-btn" aria-label="Contact me via WhatsApp">
              WhatsApp Me
            </a>
          </div>
          <div className="contact-info" role="list">
            <div className="contact-item" role="listitem">
              <span className="contact-label">Phone:</span>
              <a href="tel:+917675023149" className="contact-link" aria-label="Call me at +91 76750 23149">
                +91 76750 23149
              </a>
            </div>
            <div className="contact-item" role="listitem">
              <span className="contact-label">Email:</span>
              <a href="mailto:jiten.freelance@gmail.com" className="contact-link" aria-label="Email me at jiten.freelance@gmail.com">
                jiten.freelance@gmail.com
              </a>
            </div>
            <div className="contact-item" role="listitem">
              <span className="contact-label">LinkedIn:</span>
              <a href="https://www.linkedin.com/in/jiten-kumar-85a03217/" target="_blank" rel="noopener" className="contact-link" aria-label="Visit my LinkedIn profile">
                LinkedIn
              </a>
            </div>
            <div className="contact-item" role="listitem">
              <span className="contact-label">GitHub:</span>
              <a href="https://github.com/Jiten28" target="_blank" rel="noopener" className="contact-link" aria-label="Visit my GitHub profile">
                GitHub
              </a>
            </div>
            <div className="contact-item" role="listitem">
              <span className="contact-label">Instagram:</span>
              <a href="https://www.instagram.com/buildwithjiten/" target="_blank" rel="noopener" className="contact-link" aria-label="Visit my Instagram profile">
                Instagram
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProposalContact;