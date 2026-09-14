import React from 'react';
import './MenuExperiences.css';

const MenuExperiences = () => {
  return (
    <section className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Future Menu Experiences</span>
          <h2>Digital Menu Experiences</h2>
          <p>Digital menus are a separate product category from client projects. They represent Jiten Labs' service offerings for creating modern, QR-accessible dining experiences.</p>
        </div>

        {/* Digital Menu Architecture Overview */}
        <div className="menu-architecture">
          <h3>How It Works</h3>
          <div className="menu-flow">
            {/* Normal Digital Menu Flow */}
            <div className="menu-flow-item">
              <h4>Normal Digital Menu</h4>
              <div className="flow-step qr-code">QR Code</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step menu-landing">Menu Landing Page</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step menu-experience">Menu Experience</div>
              <div className="flow-actions">
                <span className="action-item">View Digital Menu</span>
                <span className="action-item">View/Download PDF</span>
                <span className="action-item">Share</span>
                <span className="action-item">WhatsApp</span>
                <span className="action-item">Call</span>
                <span className="action-item">Location</span>
              </div>
            </div>

            {/* AR Digital Menu Flow */}
            <div className="menu-flow-item">
              <h4>AR Digital Menu</h4>
              <div className="flow-step qr-code">QR Code</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step menu-landing">Menu Landing Page</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step decision">Normal Menu / View in AR</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step device-check">Device Support Check</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step ar-branch">AR Experience</div>
              <div className="flow-arrow">→</div>
              <div className="flow-step ar-fallback">Normal Menu Fallback</div>
            </div>
          </div>
        </div>

        {/* Data Architecture */}
        <div className="menu-data-architecture">
          <h3>Data-Driven Architecture</h3>
          <p>One shared data structure supports multiple menu formats:</p>
          <div className="data-flow">
            <div className="data-source">Business & Menu Data</div>
            <div className="data-arrow">↓</div>
            <div className="data-output">A4 Printable Menu</div>
            <div className="data-arrow">↓</div>
            <div className="data-output">PDF Menu</div>
            <div className="data-arrow">↓</div>
            <div className="data-output">Normal Web Menu</div>
            <div className="data-arrow">↓</div>
            <div className="data-output">AR Menu</div>
            <div className="data-arrow">↓</div>
            <div className="data-output">Future Integrations</div>
          </div>
        </div>

        {/* Service Distinction */}
        <div className="menu-service-note">
          <h3>Service vs Portfolio</h3>
          <p><strong>Featured Projects:</strong> Real completed client work</p>
          <p><strong>Digital Menu Experiences:</strong> Jiten Labs service offerings</p>
          <p>These experiences represent what we can build for you — not completed projects in our portfolio.</p>
        </div>
      </div>
    </section>
  );
};

export default MenuExperiences;