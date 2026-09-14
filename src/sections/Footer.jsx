import React from 'react';
import { NAV_ITEMS, SOCIAL_LINKS, BRAND_INFO } from '../data/data.js';
import './Footer.css';

const Footer = () => {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: '10px' }}>
              <svg viewBox="0 0 64 64" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <rect width="64" height="64" rx="16" fill="#0B0F1F"/>
                <path d="M20 16h8v21a9 9 0 0 1-9 9h-3v-7h2a3 3 0 0 0 2-3V16z" fill="#C9A96A"/>
                <path d="M36 16h7v13l10-13h8L50 30l12 16h-8l-8-11-3 4v7h-7V16z" fill="#8A6E3C"/>
              </svg>
              <span style={{ fontFamily: "'Manrope'", color: 'var(--text-hi)', fontWeight: '600' }}>
                {BRAND_INFO.name}
              </span>
            </div>
            <p style={{ maxWidth: '32ch' }}>
              Digital Experiences. Built for Business.
            </p>
            <div className="social-row">
              {SOCIAL_LINKS.map((link, index) => (
                <a
                  key={index}
                  className="social-icon"
                  href={link.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={link.name}
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d={link.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer">
            {NAV_ITEMS.map((item) => (
              <a key={item.id} href={`#${item.id}`}>
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Jiten Kumar / JITEN LABS. All rights reserved.</span>
          <span>jiten.freelance@gmail.com · +91 76750 23149</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;