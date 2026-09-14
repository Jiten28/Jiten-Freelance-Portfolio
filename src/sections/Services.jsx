import React from 'react';
import { PROJECT_TYPES } from '../data/data.js';
import './Services.css';

const Services = () => {
  // Map project types to service details
  const serviceDetails = {
    "Digital Menu": {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
          <circle cx="6" cy="6" r="2"></circle>
          <circle cx="6" cy="12" r="2"></circle>
          <circle cx="6" cy="18" r="2"></circle>
        </svg>
      ),
      title: "Digital Menus",
      frontDesc: "Interactive, touch-friendly digital menus for restaurants and cafes. Features include real-time updates, dietary filters, and contactless ordering capabilities.",
      backDesc: "Menu analytics, multi-language support, allergy alerts, integration with POS systems, and QR code generation for seamless customer experience."
    },
    "QR Digital Menu": {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 6h16M4 12h16M4 18h16"></path>
          <circle cx="6" cy="6" r="2"></circle>
          <circle cx="6" cy="12" r="2"></circle>
          <circle cx="6" cy="18" r="2"></circle>
        </svg>
      ),
      title: "QR Digital Menus",
      frontDesc: "Contactless QR code menus that customers can access instantly via smartphone scanning. Perfect for hygienic, modern dining experiences.",
      backDesc: "Dynamic menu updates, multi-language support, nutritional information, and integration with restaurant management systems."
    },
    "Business Website": {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="4" width="18" height="16" rx="2"></rect>
          <line x1="3" y1="10" x2="21" y2="10"></line>
          <line x1="7" y1="4" x2="7" y2="10"></line>
          <line x1="11" y1="4" x2="11" y2="10"></line>
          <line x1="15" y1="4" x2="15" y2="10"></line>
        </svg>
      ),
      title: "Business Websites",
      frontDesc: "Professional, responsive websites that showcase your brand, engage visitors, and convert leads into customers. Built with modern technologies and optimized for performance.",
      backDesc: "Custom development, CMS integration, SEO optimization, mobile responsiveness, and ongoing maintenance to ensure your website performs at its best."
    },
    "E-commerce Website": {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="8" r="6"></circle>
          <path d="M12 14v4l2-2"></path>
          <rect x="9" y="16" width="6" height="2" rx="1"></rect>
        </svg>
      ),
      title: "E-Commerce Websites",
      frontDesc: "Secure, scalable online stores with product catalogs, shopping carts, payment processing, inventory management, and customer accounts.",
      backDesc: "Product variations, tax calculations, shipping integrations, abandoned cart recovery, and analytics to help grow your online business."
    },
    "Web Application": {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="12" rx="2"></rect>
          <circle cx="6" cy="9" r="2"></circle>
          <circle cx="12" cy="9" r="2"></circle>
          <circle cx="18" cy="9" r="2"></circle>
          <path d="M3 14h18"></path>
        </svg>
      ),
      title: "Web Applications",
      frontDesc: "Tailored web applications for specific business needs - from booking systems and dashboards to portals and workflow automation tools.",
      backDesc: "Database integration, user authentication, role-based permissions, API development, and scalable architecture to grow with your business."
    },
    "Custom Solution": {
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="6" width="18" height="12" rx="2"></rect>
          <circle cx="6" cy="9" r="2"></circle>
          <circle cx="12" cy="9" r="2"></circle>
          <circle cx="18" cy="9" r="2"></circle>
          <path d="M3 14h18"></path>
        </svg>
      ),
      title: "Custom Solutions",
      frontDesc: "Bespoke digital solutions engineered for unique business challenges. From AI integrations to complex data processing systems.",
      backDesc: "Full lifecycle development including consultation, architecture design, implementation, testing, deployment, and ongoing support."
    }
  };

  return (
    <section className="services" id="services">
      <div className="section-head">
        <div className="kicker">What I Build</div>
        <h2>Services</h2>
        <p>Comprehensive digital solutions tailored to your business needs, from initial concept to final deployment and beyond.</p>
      </div>

      <div className="service-grid">
        {PROJECT_TYPES.map((projectType, index) => {
          const details = serviceDetails[projectType.n] || {
            icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2"></rect>
            </svg>,
            title: `${projectType.n} Services`,
            frontDesc: "Professional services tailored to your business needs.",
            backDesc: "Custom development and ongoing support to ensure your solution performs at its best."
          };

          return (
            <div key={index} className="service-card" tabindex="0">
              <div className="flip-inner">
                <div className="flip-face flip-front">
                  <div className="service-icon">
                    {details.icon}
                  </div>
                  <h3>{details.title}</h3>
                  <p>{details.frontDesc}</p>
                  <a href="#planner" className="card-cta">Start Project</a>
                </div>
                <div className="flip-face flip-back">
                  <div className="service-icon">
                    {details.icon}
                  </div>
                  <h3>{details.title}</h3>
                  <p>{details.backDesc}</p>
                  <a href="#planner" className="card-cta">Start Project</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Services;