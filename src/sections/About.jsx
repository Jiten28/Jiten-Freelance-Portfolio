import React from 'react';
import './About.css';

const About = () => {
  return (
    <section id="about" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">About Me</span>
          <h2>Jiten Kumar — Web Developer & Digital Solutions</h2>
          <p>I build modern websites, AI-powered applications, digital experiences and practical technology solutions for businesses — combining clean design with dependable engineering so every project actually helps the business it's built for.</p>
        </div>
        <div className="about-content">
          <div className="about-avatar" aria-hidden="true">
            <svg viewBox="0 0 64 64" fill="none">
              <path d="M20 16h8v21a9 9 0 0 1-9 9h-3v-7h2a3 3 0 0 0 2-3V16z" fill="#C9A96A"/>
              <path d="M36 16h7v13l10-13h8L50 30l12 16h-8l-8-11-3 4v7h-7V16z" fill="#8A6E3C"/>
            </svg>
          </div>
          <div className="about-text">
            <p>With a focus on creating solutions that merge aesthetics with functionality, I specialize in:</p>
            <ul className="about-list">
              <li>Business websites that establish credible online presence</li>
              <li>Digital menu systems for modern dining experiences</li>
              <li>E-commerce platforms optimized for conversion</li>
              <li>Custom web applications tailored to business processes</li>
              <li>AI-powered solutions that automate and enhance workflows</li>
            </ul>
            <p>Every solution is built with clean code, responsive design, and business-focused UX to ensure it delivers real value.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;