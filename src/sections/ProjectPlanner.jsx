import React, { useState } from 'react';
import './ProjectPlanner.css';

const ProjectPlanner = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    businessType: '',
    projectType: '',
    features: [],
    designStyle: '',
    businessInfo: '',
    budget: '',
    deployment: '',
  });

  const steps = [
    { id: 1, title: 'Business & Goals', description: 'Tell me about your business and what you want to achieve' },
    { id: 2, title: 'Project Type', description: 'Select the type of project you need' },
    { id: 3, title: 'Features & Functionality', description: 'Choose the features and functionality required' },
    { id: 4, title: 'Design Style', description: 'Select your preferred design style' },
    { id: 5, title: 'Business Information', description: 'Provide your business details and contact information' },
    { id: 6, title: 'Budget & Timeline', description: 'Share your budget range and timeline expectations' },
    { id: 7, title: 'Deployment & Hosting', description: 'Choose your preferred deployment and hosting options' },
    { id: 8, title: 'Review & Generate', description: 'Review your selections and generate project summary' }
  ];

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCheckboxChange = (feature, isChecked) => {
    setFormData(prev => {
      const features = isChecked
        ? [...prev.features, feature]
        : prev.features.filter(f => f !== feature);
      return { ...prev, features };
    });
  };

  const isFormValid = () => {
    // Basic validation - in a real app this would be more comprehensive
    return (
      formData.businessType.trim() !== '' &&
      formData.projectType.trim() !== '' &&
      formData.designStyle.trim() !== '' &&
      formData.businessInfo.trim() !== ''
    );
  };

  return (
    <section id="planner" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Let's Build This</span>
          <h2>Let's Plan Your Project</h2>
          <p>Answer a few quick questions and I'll generate a project summary, a downloadable proposal PDF, and a pre-filled WhatsApp message you can send me directly.</p>
        </div>

        <div className="planner-shell">
          <div className="planner-header">
            <h3>Project Planner</h3>
            <p>Interactive project planner to help you define your project requirements and generate a detailed proposal.</p>
          </div>

          <div className="planner-content">
            {/* Progress Steps */}
            <div className="planner-steps">
              {steps.map((step, index) => (
                <div
                  key={step.id}
                  className={`planner-step${currentStep === step.id ? ' active' : currentStep > step.id ? ' completed' : ''}`}
                  role="button"
                  tabIndex="0"
                  aria-label={`${step.title}, ${currentStep >= step.id ? 'completed' : 'upcoming'} step`}
                >
                  {step.id}
                </div>
              ))}
            </div>

            {/* Step Content */}
            <div className="planner-step-content">
              {renderStepContent()}
            </div>

            {/* Navigation */}
            <div className="planner-navigation">
              {currentStep > 1 && (
                <button
                  className="nav-btn prev"
                  onClick={goToPrevStep}
                  aria-label="Go to previous step"
                >
                  Back
                </button>
              )}
              {currentStep < steps.length && (
                <button
                  className="nav-btn next"
                  onClick={goToNextStep}
                  aria-label="Go to next step"
                >
                  Next Step
                </button>
              )}
              {currentStep === steps.length && (
                <button
                  className="nav-btn submit"
                  onClick={handleSubmit}
                  disabled={!isFormValid()}
                  aria-label="Generate project summary"
                >
                  Get Project Summary
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  function renderStepContent() {
    const step = steps.find(s => s.id === currentStep);
    if (!step) return null;

    switch (currentStep) {
      case 1:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group">
              <label htmlFor="businessType">Business Type or Industry:</label>
              <input
                type="text"
                id="businessType"
                value={formData.businessType || ''}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                placeholder="e.g., Restaurant, Retail Store, Consulting Agency"
                aria-label="Business type or industry"
              />
            </div>
            <div className="form-group">
              <label htmlFor="projectGoals">Project Goals:</label>
              <textarea
                id="projectGoals"
                value={formData.businessInfo || ''}
                onChange={(e) => handleInputChange('businessInfo', e.target.value)}
                rows={4}
                placeholder="What do you want to achieve with this project?"
                aria-label="Project goals"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group">
              <label htmlFor="projectType">Select Project Type:</label>
              <select
                id="projectType"
                value={formData.projectType || ''}
                onChange={(e) => handleInputChange('projectType', e.target.value)}
                aria-label="Project type"
              >
                <option value="">Select a project type</option>
                <option value="business-website">Business Website</option>
                <option value="digital-menu">Digital Menu System</option>
                <option value="ecommerce">E-commerce Website</option>
                <option value="web-app">Custom Web Application</option>
                <option value="ai-solution">AI-Powered Solution</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        );
      case 3:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group features">
              <h5>Select Features:</h5>
              <div className="feature-checkboxes">
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('responsive-design')}
                    onChange={(e) => handleCheckboxChange('responsive-design', e.target.checked)}
                  />
                  Responsive Design
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('cms')}
                    onChange={(e) => handleCheckboxChange('cms', e.target.checked)}
                  />
                  Content Management System
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('ecommerce')}
                    onChange={(e) => handleCheckboxChange('ecommerce', e.target.checked)}
                  />
                  E-commerce Functionality
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('booking-system')}
                    onChange={(e) => handleCheckboxChange('booking-system', e.target.checked)}
                  />
                  Booking / Appointment System
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('member-area')}
                    onChange={(e) => handleCheckboxChange('member-area', e.target.checked)}
                  />
                  Member / Login Area
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('seo-optimized')}
                    onChange={(e) => handleCheckboxChange('seo-optimized', e.target.checked)}
                  />
                  SEO Optimized
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('multilingual')}
                    onChange={(e) => handleCheckboxChange('multilingual', e.target.checked)}
                  />
                  Multilingual Support
                </label>
                <label>
                  <input
                    type="checkbox"
                    checked={formData.features.includes('analytics')}
                    onChange={(e) => handleCheckboxChange('analytics', e.target.checked)}
                  />
                  Analytics & Reporting
                </label>
              </div>
            </div>
          </div>
        );
      case 4:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group">
              <label htmlFor="designStyle">Preferred Design Style:</label>
              <select
                id="designStyle"
                value={formData.designStyle || ''}
                onChange={(e) => handleInputChange('designStyle', e.target.value)}
                aria-label="Design style"
              >
                <option value="">Select a design style</option>
                <option value="glassmorphism">Glassmorphism</option>
                <option value="minimalistic">Minimalistic</option>
                <option value="dark-mode">Dark Mode</option>
                <option value="colorful-vibrant">Colorful / Vibrant</option>
                <option value="neumorphism">Neumorphism</option>
                <option value="brutalist">Brutalist</option>
                <option value="vintage-retro">Vintage / Retro</option>
                <option value="hand-drawn">Hand-Drawn / Sketch</option>
                <option value="parallax">Parallax</option>
                <option value="landing-page">Landing Page</option>
                <option value="one-page-scroll">One Page Scroll</option>
                <option value="portfolio">Portfolio</option>
                <option value="ecommerce">E-Commerce</option>
                <option value="magazine-blog">Magazine / Blog</option>
                <option value="corporate-business">Corporate / Business</option>
                <option value="educational">Educational</option>
                <option value="saas-dashboard">SaaS / Dashboard</option>
                <option value="entertainment">Entertainment</option>
                <option value="nature-eco">Nature / Eco</option>
                <option value="ai-tech">AI / Tech</option>
              </select>
            </div>
          </div>
        );
      case 5:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group">
              <label htmlFor="businessName">Business Name:</label>
              <input
                type="text"
                id="businessName"
                value={formData.businessInfo || ''}
                onChange={(e) => handleInputChange('businessInfo', e.target.value)}
                placeholder="Your business name"
                aria-label="Business name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactEmail">Contact Email:</label>
              <input
                type="email"
                id="contactEmail"
                value={formData.businessInfo || ''}
                onChange={(e) => handleInputChange('businessInfo', e.target.value)}
                placeholder="your@email.com"
                aria-label="Contact email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="contactPhone">Contact Phone:</label>
              <input
                type="tel"
                id="contactPhone"
                value={formData.businessInfo || ''}
                onChange={(e) => handleInputChange('businessInfo', e.target.value)}
                placeholder="+91 XXXXXXXXXX"
                aria-label="Contact phone"
              />
            </div>
            <div className="form-group">
              <label htmlFor="businessAddress">Business Address (Optional):</label>
              <input
                type="text"
                id="businessAddress"
                value={formData.businessInfo || ''}
                onChange={(e) => handleInputChange('businessInfo', e.target.value)}
                placeholder="Street, City, State, PIN"
                aria-label="Business address"
              />
            </div>
          </div>
        );
      case 6:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group">
              <label htmlFor="budgetRange">Budget Range (₹):</label>
              <select
                id="budgetRange"
                value={formData.budget || ''}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                aria-label="Budget range"
              >
                <option value="">Select budget range</option>
                <option value="under-5000">Under ₹5,000</option>
                <option value="5000-15000">₹5,000 - ₹15,000</option>
                <option value="15000-30000">₹15,000 - ₹30,000</option>
                <option value="30000-50000">₹30,000 - ₹50,000</option>
                <option value="50000-100000">₹50,000 - ₹1,00,000</option>
                <option value="100000-above">Above ₹1,00,000</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="timeline">Expected Timeline:</label>
              <select
                id="timeline"
                value={formData.businessInfo || ''}
                onChange={(e) => handleInputChange('businessInfo', e.target.value)}
                aria-label="Expected timeline"
              >
                <option value="">Select timeline</option>
                <option value="1-2-weeks">1-2 Weeks</option>
                <option value="3-4-weeks">3-4 Weeks</option>
                <option value="1-2-months">1-2 Months</option>
                <option value="3-4-months">3-4 Months</option>
                <option value="5-6-months">5-6 Months</option>
                <option value="6-months-above">6+ Months</option>
              </select>
            </div>
          </div>
        );
      case 7:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="form-group">
              <label htmlFor="deployment">Deployment Preference:</label>
              <select
                id="deployment"
                value={formData.deployment || ''}
                onChange={(e) => handleInputChange('deployment', e.target.value)}
                aria-label="Deployment preference"
              >
                <option value="">Select deployment preference</option>
                <option value="netlify">Netlify</option>
                <option value="vercel">Vercel</option
              >
                <option value="render">Render</option>
                <option value="cloudflare-pages">Cloudflare Pages</option>
                <option value="firebase">Firebase</option>
                <option value="supabase">Supabase</option>
                <option value="google-cloud">Google Cloud / Cloud Run</option>
                <option value="aws">AWS</option>
                <option value="traditional-hosting">Traditional Hosting</option>
                <option value="client-server">Client to Provide Server</option>
              </select>
            </div>
          </div>
        );
      case 8:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="planner-summary">
              <h5>Project Summary</h5>
              <div className="summary-item">
                <strong>Business Type:</strong> {formData.businessType || 'Not specified'}
              </div>
              <div className="summary-item">
                <strong>Project Type:</strong> {formData.projectType || 'Not specified'}
              </div>
              <div className="summary-item">
                <strong>Features:</strong> {formData.features.length > 0 ? formData.features.join(', ') : 'None selected'}
              </div>
              <div className="summary-item">
                <strong>Design Style:</strong> {formData.designStyle || 'Not specified'}
              </div>
              <div className="summary-item">
                <strong>Business Info:</strong> {formData.businessInfo || 'Not provided'}
              </div>
              <div className="summary-item">
                <strong>Budget:</strong> {formData.budget || 'Not specified'}
              </div>
              <div className="summary-item">
                <strong>Deployment:</strong> {formData.deployment || 'Not specified'}
              </div>
              <div className="summary-actions">
                <button className="cta-btn" onClick={handleDownloadPDF}>
                  Download Proposal PDF
                </button>
                <button className="cta-btn whatsapp" onClick={handleShareWhatsApp}>
                  Share via WhatsApp
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  }

  const handleDownloadPDF = () => {
    // In a real app, this would generate and download a PDF
    alert('PDF download functionality would be implemented here in a production environment.');
  };

  const handleShareWhatsApp = () => {
    // In a real app, this would create a WhatsApp share link
    alert('WhatsApp sharing functionality would be implemented here in a production environment.');
  };

  const handleSubmit = () => {
    // Move to summary step or show success message
    alert('Form submitted! In a real app, this would generate your project summary.');
  };
};

export default ProjectPlanner;