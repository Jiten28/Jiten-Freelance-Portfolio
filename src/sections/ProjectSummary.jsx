import React, { useContext } from 'react';
import './ProjectSummary.css';

// We'll use a simple context or props to get planner data
// For now, we'll simulate with localStorage or props from parent
// In a real app, this would come from Redux, Context API, or props

const ProjectSummary = () => {
  // Simulate getting data from planner context or localStorage
  const [summaryData, setSummaryData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Simulate loading summary data
    const loadSummary = async () => {
      setLoading(true);
      // Simulate async delay
      await new Promise(resolve => setTimeout(resolve, 500));

      // Try to get data from localStorage (simulating planner data)
      const savedData = localStorage.getItem('jitenLabsPlannerData');
      if (savedData) {
        try {
          setSummaryData(JSON.parse(savedData));
        } catch (e) {
          setSummaryData(null);
        }
      } else {
        setSummaryData(null); // No data yet
      }
      setLoading(false);
    };

    loadSummary();
  }, []);

  // Function to save planner data (would be called from planner)
  const savePlannerData = (data) => {
    localStorage.setItem('jitenLabsPlannerData', JSON.stringify(data));
    setSummaryData(data);
  };

  if (loading) {
    return renderLoadingState();
  }

  if (!summaryData) {
    return renderEmptyState();
  }

  return renderSummaryContent(summaryData);
};

function renderLoadingState() {
  return (
    <section id="project-summary" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Project Summary</span>
          <h2>Your Project Overview</h2>
        </div>
        <div className="summary-placeholder">
          <div className="summary-loading">
            <h3>Loading Your Project Summary</h3>
            <p>Please wait while we generate your project overview...</p>
            <div className="loading-spinner"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderEmptyState() {
  return (
    <section id="project-summary" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Project Summary</span>
          <h2>Your Project Overview</h2>
          <p>Complete the project planner to see a comprehensive summary of your requirements here.</p>
        </div>
        <div className="summary-placeholder">
          <div className="summary-empty">
            <h3>No Project Data Yet</h3>
            <p>Your project summary will appear here after you complete the project planner.</p>
            <div className="empty-illustration">
              <div className="empty-icon">📋</div>
              <p>The summary will show:</p>
              <ul className="empty-list">
                <li>Project overview and type</li>
                <li>Selected features and functionality</li>
                <li>Design style preferences</li>
                <li>Business information and contact details</li>
                <li>Budget and timeline estimates</li>
                <li>Deployment and hosting recommendations</li>
              </ul>
            </div>
            <div className="summary-actions">
              <button className="cta-btn" onClick={() => {
                // Scroll to planner or navigate to it
                const plannerSection = document.getElementById('planner');
                if (plannerSection) {
                  plannerSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}>
                Go to Planner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function renderSummaryContent(data) {
  // Extract data from planner format
  const businessType = data.businessType || 'Not specified';
  const projectType = data.projectType || 'Not specified';
  const features = data.features || [];
  const designStyle = data.designStyle || 'Not specified';
  const businessInfo = data.businessInfo || 'Not provided';
  const budget = data.budget || 'Not specified';
  const deployment = data.deployment || 'Not specified';

  // Format features for display
  const featuresText = features.length > 0
    ? features.map(f => {
        const featureMap = {
          'responsive-design': 'Responsive Design',
          'cms': 'Content Management System',
          'ecommerce': 'E-commerce Functionality',
          'booking-system': 'Booking / Appointment System',
          'member-area': 'Member / Login Area',
          'seo-optimized': 'SEO Optimized',
          'multilingual': 'Multilingual Support',
          'analytics': 'Analytics & Reporting'
        };
        return featureMap[f] || f;
      }).join(', ')
    : 'None selected';

  return (
    <section id="project-summary" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Project Summary</span>
          <h2>Your Project Overview</h2>
          <p>A comprehensive summary of your project requirements and specifications.</p>
        </div>
        <div className="summary-placeholder">
          <div className="summary-content">
            <div className="summary-block">
              <h4>Project Overview</h4>
              <div className="row">
                <span>Business Type</span><span>{businessType}</span>
              </div>
              <div className="row">
                <span>Project Type</span><span>{projectType}</span>
              </div>
              <div className="row">
                <span>Preferred Design</span><span>{designStyle}</span>
              </div>
              <div className="row">
                <span>Selected Features</span><span>{featuresText}</span>
              </div>
              <div className="row">
                <span>Budget Range</span><span>{budget}</span>
              </div>
              <div className="row">
                <span>Deployment Preference</span><span>{deployment}</span>
              </div>
            </div>

            <div className="summary-block">
              <h4>Business Information</h4>
              <div className="row">
                <span>Information Provided</span><span>{businessInfo !== 'Not provided' ? 'Yes' : 'Pending'}</span>
              </div>
              {businessInfo !== 'Not provided' && (
                <>
                  <div className="row">
                    <span>Contact Details</span><span>Provided</span>
                  </div>
                  <div className="row">
                    <span>Business Info</span><span>Completed</span>
                  </div>
                </>
              )}
            </div>

            <div className="summary-block">
              <h4>Recommended Package</h4>
              <div className="row">
                <span>Estimated Starting Point</span><span>{getRecommendedPackage(projectType, features)}</span>
              </div>
              <div className="row">
                <span>Scope Notes</span><span>{getScopeNotes(projectType, features)}</span>
              </div>
            </div>

            <div className="summary-block">
              <h4>Next Steps</h4>
              <p>Based on your summary, here are the recommended next steps:</p>
              <ul className="next-steps">
                <li>Review the above summary for accuracy</li>
                <li>Confirm your selections and preferences</li>
                <li>Proceed to proposal generation</li>
                <li>Schedule a consultation if needed</li>
              </ul>
              <div className="summary-actions">
                <button className="cta-btn" onClick={generateProposal}>
                  Generate Proposal PDF
                </button>
                <button className="ghost-btn on-light" onClick={resetSummary}>
                  Start Over
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function getRecommendedPackage(projectType, features) {
  const packageMap = {
    'digital-menu': 'Digital Menu Pro (₹4,999)',
    'business-website': 'Business Website (₹7,999)',
    'ecommerce': 'E-commerce Website (₹12,999+)',
    'web-app': 'Custom Web Application (₹15,000+)',
    'ai-solution': 'AI-Powered Solution (₹20,000+)'
  };

  const basePackage = packageMap[projectType] || 'Custom Package (To Be Determined)';

  // Add notes for premium features
  const premiumFeatures = ['ecommerce', 'ai-solution', 'member-area'];
  const hasPremium = features.some(f => premiumFeatures.includes(f));

  return hasPremium && !projectType.includes('ecommerce') && !projectType.includes('ai-solution')
    ? `${basePackage} + Premium Features`
    : basePackage;
}

function getScopeNotes(projectType, features) {
  const notes = [];

  if (features.includes('ecommerce')) {
    notes.push('Includes product catalog, shopping cart, and payment processing');
  }

  if (features.includes('member-area')) {
    notes.push('Includes user authentication, profile management, and access controls');
  }

  if (features.includes('ai-solution')) {
    notes.push('Includes AI model integration, data processing, and intelligent features');
  }

  if (features.length > 4) {
    notes.push('Extended functionality may affect timeline and budget');
  }

  return notes.length > 0 ? notes.join('; ') : 'Standard scope applies';
}

function generateProposal() {
  // In a real app, this would generate and download a PDF
  alert('Proposal generation functionality would be implemented here in a production environment.\n\nThis would create a detailed PDF proposal based on your project summary.');
}

function resetSummary() {
  // Clear the saved data
  localStorage.removeItem('jitenLabsPlannerData');
  // Trigger reload to show empty state
  window.location.reload();
}

export default ProjectSummary;