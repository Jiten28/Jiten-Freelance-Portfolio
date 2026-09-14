import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero" id="home">
      <div className="container">
        <div className="hero-grid">
          <div className="hero-content">
            {/* Eyebrow/Tagline - Small and subtle */}
            <div className="eyebrow-pill">
              Digital Experiences. Built for Business.
            </div>

            {/* Main Heading */}
            <h1>
              Jiten Kumar<br/>
              <span className="accent">Web Developer & Digital Solutions</span>
            </h1>

            {/* Supporting Description */}
            <p className="lede">
              Jiten Kumar builds modern business websites, digital menus, e-commerce websites, AI applications and custom digital solutions for businesses and startups.
            </p>

            {/* CTA Buttons */}
            <div className="hero-ctas">
              <a href="#planner" className="cta-btn">Start a Project</a>
              <a href="#projects" className="ghost-btn on-light">View Portfolio</a>
            </div>
          </div>

          {/* Device/Project Visual Area */}
          <div className="device-stack">
            <div className="device-browser">
              <div className="bar">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <div className="screen">
                <div className="ui-block" style={{ top: '14%', left: '8%', width: '40%', height: '10%' }}></div>
                <div className="ui-block" style={{ top: '32%', left: '8%', width: '26%', height: '18%' }}></div>
                <div className="ui-block" style={{ top: '32%', left: '38%', width: '26%', height: '18%' }}></div>
                <div className="ui-block" style={{ top: '32%', left: '68%', width: '26%', height: '18%' }}></div>
              </div>
            </div>
            <div className="device-phone">
              <div className="screen">
                <div className="ui-block" style={{ top: '10%', left: '12%', width: '76%', height: '12%' }}></div>
                <div className="ui-block" style={{ top: '28%', left: '12%', width: '76%', height: '26%' }}></div>
              </div>
            </div>
            <div className="float-chip c1">✓ Mobile Responsive</div>
            <div className="float-chip c2">⚡ Fast & Modern</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;