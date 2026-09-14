import React from 'react';
import './AIConceptPreview.css';

const AIConceptPreview = () => {
  const [progress, setProgress] = React.useState(0);
  const [concept, setConcept] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const generateConcept = () => {
    setLoading(true);
    setError(null);
    setProgress(0);

    // Simulate concept generation
    const interval = setInterval(() => {
      setProgress(prev => Math.min(prev + 10, 100));
    }, 100);

    setTimeout(() => {
      clearInterval(interval);
      setLoading(false);
      setProgress(100);
      setConcept({
        palette: 'Modern Petrol & Ivory',
        features: [
          'Responsive Design',
          'Custom Animations',
          'SEO Optimized',
          'CMS Integrated'
        ],
        disclaimer: 'AI-generated concept for visualization purposes only'
      });
    }, 2000);
  };

  if (loading) {
    return (
      <section id="ai-concept-preview" className="dark-section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">AI Concept Preview</span>
            <h2>See Your Vision Come to Life</h2>
          </div>
          <div className="ai-concept-container">
            <div className="ai-concept-card">
              <div className="ai-concept-header">
                <h3>Generating Your Concept...</h3>
                <p className="ai-concept-subtext">Creating a unique digital solution tailored to your business needs</p>
              </div>
              <div className="progress-container">
                <div className="progress-track"></div>
                <div className="progress-fill" style={{ transform: `scaleX(${progress / 100})` }}></div>
              </div>
              <div className="ai-concept-actions">
                <button className="cta-btn" onCancel onClick={generateConcept}>
                  {progress < 100 ? 'Generating...' : 'Try Again'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="ai-concept-preview" className="dark-section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">AI Concept Preview</span>
            <h2>See Your Vision Come to Life</h2>
          </div>
          <div className="ai-concept-container">
            <div className="ai-concept-card">
              <div className="ai-concept-header">
                <h3>Something Went Wrong</h3>
                <p className="ai-concept-subtext">We encountered an error while generating your concept.</p>
              </div>
              <div className="ai-concept-error">
                <p>{error.message}</p>
              </div>
              <div className="ai-concept-actions">
                <button className="cta-btn" onClick={generateConcept}>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (!concept) {
    return (
      <section id="ai-concept-preview" className="dark-section">
        <div className="wrap">
          <div className="section-head">
            <span className="kicker">AI Concept Preview</span>
            <h2>See Your Vision Come to Life</h2>
          </div>
          <div className="ai-concept-container">
            <div className="ai-concept-card">
              <div className="ai-concept-header">
                <h3>Ready to Visualize Your Project?</h3>
                <p className="ai-concept-subtext">
                  Click below to generate an AI-powered concept preview of your digital solution
                </p>
              </div>
              <div className="ai-concept-actions">
                <button className="cta-btn" onClick={generateConcept}>
                  Generate Concept
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="ai-concept-preview" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">AI Concept Preview</span>
          <h2>See Your Vision Come to Life</h2>
        </div>
        <div className="ai-concept-container">
          <div className="ai-concept-card">
            <div className="ai-concept-header">
              <h3>Your AI Concept Preview</h3>
              <p className="ai-concept-subtext">
                A unique digital solution concept generated specifically for your business
              </p>
            </div>
            <div className="ai-concept-details">
              <div className="ai-concept-item">
                <h4>Design Palette</h4>
                <p>{concept.palette}</p>
              </div>
              <div className="ai-concept-item">
                <h4>Key Features</h4>
                <ul className="feature-list">
                  {concept.features.map((feature, index) => (
                    <li key={index}>• {feature}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="ai-concept-disclaimer">
              <p>{concept.disclaimer}</p>
            </div>
            <div className="ai-concept-actions">
              <button className="ghost-btn" onClick={() => setConcept(null)}>
                Generate New Concept
              </button>
              <button className="cta-btn" onClick={generateConcept}>
                Refine Concept
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AIConceptPreview;