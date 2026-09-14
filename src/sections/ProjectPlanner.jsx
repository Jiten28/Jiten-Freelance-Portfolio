import React, { useState } from 'react';
import {
  BUSINESS_TYPES,
  PROJECT_TYPES,
  FEATURE_OPTIONS,
  DESIGN_STYLES,
  BUDGET_OPTIONS,
  DEPLOY_PLATFORMS,
  DEPLOY_CHOICE_MAP,
  estimatePackage,
  recommendedPlatformFor
} from '../data/data.js';
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
                list="business-type-list"
                placeholder="e.g., Restaurant, Retail Store, Consulting Agency"
                aria-label="Business type or industry"
              />
              <datalist id="business-type-list">
                {BUSINESS_TYPES.map(type => (
                  <option key={type} value={type} />
                ))}
              </datalist>
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
                {PROJECT_TYPES.map(type => (
                  <option key={type.n} value={type.n}>
                    {type.n}
                  </option>
                ))}
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
                {FEATURE_OPTIONS.map(feature => {
                  const featureKey = feature.toLowerCase().replace(/\s+/g, '-');
                  return (
                    <label key={feature}>
                      <input
                        type="checkbox"
                        checked={formData.features.includes(featureKey)}
                        onChange={(e) => handleCheckboxChange(featureKey, e.target.checked)}
                      />
                      {feature}
                    </label>
                  );
                })}
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
                {DESIGN_STYLES.map(style => (
                  <option key={style.n} value={style.n}>
                    {style.n}
                  </option>
                ))}
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
                {BUDGET_OPTIONS.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
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
                {Object.keys(DEPLOY_PLATFORMS).map(key => {
                  const platform = DEPLOY_PLATFORMS[key];
                  return (
                    <option key={key} value={key}>
                      {platform.name}
                    </option>
                  );
                })}
                <option key="existing" value="existing">
                  {DEPLOY_CHOICE_MAP.existing.label}
                </option>
                <option key="unsure" value="unsure">
                  {DEPLOY_CHOICE_MAP.unsure.label}
                </option>
              </select>
            </div>

            {/* Show recommendation if user selected "I'm not sure — recommend one" */}
            {formData.deployment === "unsure" && (
              <div className="hosting-recommendation">
                <div className="recommendation-header">
                  <h4>Our Recommendation Based on Your Project</h4>
                  <p style={{ color: 'var(--text-ink-mid)', fontSize: '0.9rem' }}>
                    Based on your project requirements, we suggest:
                  </p>
                </div>
                <div className="recommendation-details">
                  <div className="row">
                    <span>Platform</span>
                    <span>
                      {recommendedPlatformFor({
                        ...formData,
                        deployChoice: "unsure"
                      }) &&
                      DEPLOY_PLATFORMS[
                        recommendedPlatformFor({
                          ...formData,
                          deployChoice: "unsure"
                        })
                      ]?.name ||
                      "Netlify"
                    }
                  </span>
                  </div>
                  <div className="row">
                    <span>Best for</span>
                    <span>
                      {recommendedPlatformFor({
                        ...formData,
                        deployChoice: "unsure"
                      }) &&
                      DEPLOY_PLATFORMS[
                        recommendedPlatformFor({
                          ...formData,
                          deployChoice: "unsure"
                        })
                      ]?.best ||
                      "Business websites, digital menus, React/Vite frontends"
                    }
                  </span>
                  </div>
                  <div className="row">
                    <span>Hosting Cost</span>
                    <span>
                      {recommendedPlatformFor({
                        ...formData,
                        deployChoice: "unsure"
                      }) &&
                      DEPLOY_PLATFORMS[
                        recommendedPlatformFor({
                          ...formData,
                          deployChoice: "unsure"
                        })
                      ]?.cost ||
                      "Free tier available"
                    }
                  </span>
                  </div>
                  <div className="row">
                    <span>JITEN LABS Setup Fee</span>
                    <span>
                      {recommendedPlatformFor({
                        ...formData,
                        deployChoice: "unsure"
                      }) &&
                      DEPLOY_PLATFORMS[
                        recommendedPlatformFor({
                          ...formData,
                          deployChoice: "unsure"
                        })
                      ]?.jitenLabsSetupFee ||
                      "₹999–₹1,999"
                    }
                  </span>
                  </div>
                  <div className="row">
                    <span>Domain</span>
                    <span>Separate (billed at registrar's current price)</span>
                  </div>
                  <p className="disclaimer">
                    *Subject to the platform's current pricing and usage limits.
                  </p>
                  <p style={{ marginTop: '12px', color: 'var(--text-ink-mid)', fontSize: '0.9rem' }}>
                    <strong>Note:</strong> This is just a suggestion — you can still manually select any other option above if you prefer a different provider.
                  </p>
                </div>
              </div>
            )}
          </div>
        );
      case 8:
        return (
          <div>
            <h4>{step.title}</h4>
            <p>{step.description}</p>
            <div className="planner-summary">
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
                <strong>Budget:</strong> {estimatePackage(formData.projectType) || 'Not specified'}
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