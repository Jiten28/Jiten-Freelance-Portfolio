import React, { useState } from 'react';
import './FeaturedWork.css';

// Featured projects - only these 4 should be featured according to requirements
const FEATURED_PROJECTS = [
  {
    name: "Perfume Shop",
    category: "Full-Stack E-Commerce",
    type: "Website",
    tech: "React, TailwindCSS, Vite, Node.js, MongoDB",
    desc: "Responsive perfume storefront with product pages, reviews and a trending section.",
    url: "https://perfume-shop-digital.netlify.app/",
    img: "assets/perfume-shop.png",
    status: "real",
    featured: true
  },
  {
    name: "Voyage-AI",
    category: "Intelligent Travel Planner",
    type: "Web Application",
    tech: "Google AI Studio / AI-powered application",
    desc: "AI travel planner generating itineraries, budgets, hotel picks and destination visuals.",
    url: "https://voyage-ai-p1bd.onrender.com/",
    img: "assets/voyage-ai.png",
    status: "real",
    featured: true
  },
  {
    name: "Wonderful Crown",
    category: "Healthcare Recommendation System",
    type: "Web Application",
    tech: "Full-stack AI / machine learning",
    desc: "AI healthcare platform predicting conditions from symptoms with specialist matching.",
    url: "https://wonderful-crown.onrender.com/",
    img: "assets/wonderful-crown-desktop.png",
    mobileImg: "assets/wonderful-crown-mobile.png",
    status: "real",
    featured: true
  },
  {
    name: "Cindrix",
    category: "Intelligent AI Assistant",
    type: "Web Application",
    tech: "Gemini, RAG, persistent memory, Flask, Three.js",
    desc: "AI assistant with persistent memory, voice interaction, web/image search and a 3D interface.",
    url: "https://cindrix-ai.onrender.com/",
    img: "assets/cindrix-desktop.png",
    mobileImg: "assets/cindrix-mobile.png",
    status: "real",
    featured: true
  }
];

const FeaturedWork = () => {
  const [filter, setFilter] = useState('all'); // all, menu, websites

  // Filter projects based on selected filter
  const getFilteredProjects = () => {
    if (filter === 'all') return FEATURED_PROJECTS;
    if (filter === 'menu') return FEATURED_PROJECTS.filter(p =>
      p.name.toLowerCase().includes('menu') ||
      p.category.toLowerCase().includes('menu')
    );
    if (filter === 'websites') return FEATURED_PROJECTS.filter(p =>
      !(p.name.toLowerCase().includes('menu') ||
        p.category.toLowerCase().includes('menu'))
    );
    return FEATURED_PROJECTS;
  };

  const filteredProjects = getFilteredProjects();

  return (
    <section id="projects" className="dark-section">
      <div className="wrap">
        <div className="section-head">
          <span className="kicker">Real, Live Work</span>
          <h2>Featured Projects</h2>
          <p>Projects I've actually designed and built — not design concepts. Tap or hover a project to preview it.</p>
        </div>

        {/* Filter Controls */}
        <div className="proj-filters">
          <button
            className={`${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`${filter === 'menu' ? 'active' : ''}`}
            onClick={() => setFilter('menu')}
          >
            Menu
          </button>
          <button
            className={`${filter === 'websites' ? 'active' : ''}`}
            onClick={() => setFilter('websites')}
          >
            Websites
          </button>
        </div>

        <div className="proj-grid">
          {filteredProjects.map((project, index) => (
            <div
              key={index}
              className="proj-card"
              tabIndex="0"
              role="button"
              aria-label={`Preview ${project.name} project`}
            >
              <div className="proj-thumb">
                {project.img ? (
                  <img
                    src={project.img}
                    alt={`${project.name} screenshot`}
                    loading="lazy"
                  />
                ) : (
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-dim)',
                      fontSize: '0.85rem'
                    }}
                  >
                    Preview coming soon
                  </div>
                )}
              </div>
              <div className="proj-body">
                <h3>{project.name}</h3>
                <span className="proj-tag">{project.category}</span>
              </div>
              <div className="proj-overlay">
                <h3>{project.name}</h3>
                <div className="tech">{project.tech}</div>
                <div className="desc">{project.desc}</div>
                {project.url ? (
                  <a
                    className="live-btn"
                    href={project.url}
                    target="_blank"
                    rel="noopener"
                  >
                    Open Live Project
                  </a>
                ) : (
                  <div className="note">Live demo coming soon.</div>
                )}
                {project.hosting === "render" && (
                  <div className="note">
                    Live demo may take a few seconds to start if the server has been inactive.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;