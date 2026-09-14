import React from 'react';
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
                JITEN LABS
              </span>
            </div>
            <p style={{ maxWidth: '32ch' }}>
              Digital Experiences. Built for Business.
            </p>
            <div className="social-row">
              <a className="social-icon" href="https://github.com/Jiten28" target="_blank" rel="noopener" aria-label="GitHub">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.5v-1.94c-2.78.62-3.37-1.36-3.37-1.36-.46-1.2-1.11-1.52-1.11-1.52-.91-.64.07-.63.07-.63 1 .07 1.53 1.05 1.53 1.05.9 1.57 2.34 1.12 2.92.85.09-.67.35-1.12.64-1.38-2.22-.26-4.56-1.14-4.56-5.06 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.31.1-2.73 0 0 .84-.28 2.75 1.05A9.3 9.3 0 0 1 12 6.8c.85 0 1.71.12 2.51.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.42.2 2.47.1 2.73.64.72 1.03 1.63 1.03 2.75 0 3.93-2.35 4.8-4.58 5.05.36.32.68.94.68 1.9v2.82c0 .28.18.61.69.5A10.26 10.26 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>
              </a>
              <a className="social-icon" href="https://www.linkedin.com/in/jiten-kumar-85a03217/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6.94 8.5H3.56V21h3.38V8.5zM5.25 3a1.96 1.96 0 1 0 0 3.92A1.96 1.96 0 0 0 5.25 3zM20.44 21h-3.37v-6.28c0-1.5-.03-3.42-2.08-3.42-2.08 0-2.4 1.63-2.4 3.31V21H9.22V8.5h3.24v1.71h.05c.45-.86 1.56-1.77 3.21-1.77 3.44 0 4.07 2.26 4.07 5.21V21z"/></svg>
              </a>
              <a className="social-icon" href="https://www.instagram.com/buildwithjiten/" target="_blank" rel="noopener" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.55.22.95.47 1.37.89.42.42.67.82.89 1.37.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.55-.47.95-.89 1.37-.42.42-.82.67-1.37.89-.42.16-1.06.36-2.23.41-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41-.55-.22-.95-.47-1.37-.89a3.9 3.9 0 0 1-.89-1.37c-.16-.42-.36-1.06-.41-2.23-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.55.47-.95.89-1.37.42-.42.82-.67 1.37-.89.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.7a6.14 6.14 0 1 0 0 12.28 6.14 6.14 0 0 0 0-12.28zm0 10.13a3.99 3.99 0 1 1 0-7.98 3.99 3.99 0 0 1 0 7.98zm6.4-10.38a1.44 1.44 0 1 1-2.87 0 1.44 1.44 0 0 1 2.87 0z"/></svg>
              </a>
              <a className="social-icon" href="https://wa.me/917675023149" target="_blank" rel="noopener" aria-label="WhatsApp">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.1 3.9C17.9 1.7 15 .5 12 .5 5.8.5.7 5.6.7 11.9c0 2 .5 3.9 1.2 5.6l-.3 4c-.4 1.3-.3 2.7.5 3.5l2.7.8c.9.3 1.8.3 2.5-.1l1.2-1c.7-.4 1.2-1.1 1.4-1.9l2-3.9c.4-.8.5-1.1.5-1.2 0-.1-.1-.3-.3-.5-.1-.1-.3-.3-.4-.5-.2-.2-.4-.3-.6-.3l-.2-.1c-.2-.1-.4-.1-.6-.1-2.8-.1-3.7.8-4.2 2.6l-.1.5-.2.9c-.1.4-.1.9-.1 1.8.1.9.6 1.6 1.2 1.8l1.6.8c1 .4 2 .7 3 .8l1.5-.1c.4-.1.9-.2 1.3-.3l2.1-1.1c.5-.3 1-.6 1.3-1.1l.7-1.4c.3-.6.4-1.2.2-1.8-.1-.5-.5-1.1-1-1.5-.4-.5-1-.9-1.4-1.3l-.2-.2v-.5c0-.1 0-.2.1-.3.1-.1.3-.3.4-.4l2-1.1c.5-.3 1-.5 1.4-.6l1.6-.6c.4-.2.9-.3 1.4-.1l.6.3c.2.1.5.2.6.4l.2.1c.2.1.4.2.5.4l.3.2c.2.1.5.1.6.1l.2-.1c.2-.1.4-.1.6-.1z"/></svg>
              </a>
            </div>
          </div>
          <nav className="footer-links" aria-label="Footer">
            <a href="#home">Home</a><a href="#services">Services</a><a href="#projects">Projects</a>
            <a href="#styles">Styles</a><a href="#pricing">Pricing</a><a href="#about">About</a><a href="#planner">Let's Plan</a>
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