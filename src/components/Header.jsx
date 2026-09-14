import React, { useState, useRef, useEffect } from 'react';
import { NAV_ITEMS } from '../data/data.js';
import './Header.css';

const Header = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const magicLineRef = useRef(null);
  const [isReducedMotion, setIsReducedMotion] = useState(() =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  // Check for reduced motion preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e) => setIsReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Update magic line position
  useEffect(() => {
    if (magicLineRef.current && !isReducedMotion) {
      const navItems = document.querySelectorAll('.nav-item');

      // Determine which item to base the magic line on
      const targetItem = hoveredItem || activeItem;
      if (targetItem) {
        const targetElement = document.querySelector(`.nav-item[data-id="${targetItem}"]`);
        if (targetElement && magicLineRef.current) {
          const rect = targetElement.getBoundingClientRect();
          const navRect = targetElement.parentElement.getBoundingClientRect();

          magicLineRef.current.style.left = `${rect.left - navRect.left}px`;
          magicLineRef.current.style.width = `${rect.width}px`;
          magicLineRef.current.style.opacity = '1';
        }
      } else if (magicLineRef.current) {
        magicLineRef.current.style.opacity = '0';
      }
    }
  }, [hoveredItem, activeItem, isReducedMotion]);

  // Handle scroll to section when nav item is clicked
  const handleNavClick = (id) => {
    setActiveItem(id);
    setHoveredItem(null);
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      // Account for header height
      const headerHeight = document.querySelector('.header')?.offsetHeight || 0;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - headerHeight - 20; // 20px extra padding

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Handle theme toggle
  const handleThemeToggle = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? '' : 'light';
    if (newTheme) {
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('jitenLabsTheme', newTheme);
    } else {
      document.documentElement.removeAttribute('data-theme');
      localStorage.removeItem('jitenLabsTheme');
    }
  };

  // Check for saved theme preference on load
  useEffect(() => {
    const savedTheme = localStorage.getItem('jitenLabsTheme');
    if (savedTheme) {
      document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
      // Respect system preference on first visit
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (!systemPrefersDark) {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('jitenLabsTheme', 'light');
      }
    }
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          {/* Brand */}
          <div className="brand">
            <div className="brand-symbol">JK</div>
            <div className="brand-text">
              <div className="brand-name">JITEN LABS</div>
              <div className="brand-tagline">Web Developer & Digital Solutions</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="nav">
            <ul className="nav-list" role="menubar" aria-label="Primary">
              {NAV_ITEMS.map((item) => (
                <li
                  key={item.id}
                  className={`nav-item ${activeItem === item.id ? 'active' : ''} ${hoveredItem === item.id ? 'hovered' : ''}`}
                  data-id={item.id}
                  onMouseEnter={() => !isReducedMotion && setHoveredItem(item.id)}
                  onMouseLeave={() => !isReducedMotion && setHoveredItem(null)}
                  onFocus={() => setHoveredItem(item.id)}
                  onBlur={() => setHoveredItem(null)}
                  onClick={() => handleNavClick(item.id)}
                  role="menuitem"
                  tabIndex={0}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </li>
              ))}
            </ul>
            {/* Magic Line */}
            <div ref={magicLineRef} className="magic-line" aria-hidden="true"></div>
          </nav>

          {/* CTA Button */}
          <button
            className="cta-button"
            aria-label="Start a new project"
            onClick={() => handleNavClick('planner')}
          >
            Start a Project
          </button>

          {/* Theme Toggle */}
          <div
            className="theme-toggle"
            role="switch"
            aria-checked={document.documentElement.getAttribute('data-theme') === 'light'}
            aria-label="Toggle theme"
            onClick={handleThemeToggle}
          >
            <div className="theme-toggle-slider" aria-hidden="true"></div>
          </div>

          {/* Mobile Menu Button (hamburger) */}
          <button
            className="mobile-menu-button"
            aria-label="Open menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`nav-menu-mobile ${isMenuOpen ? 'open' : ''}`}>
        <nav className="nav">
          <ul className="nav-list" role="menubar" aria-label="Mobile">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.id}
                className={`nav-item ${activeItem === item.id ? 'active' : ''}`}
                data-id={item.id}
                onClick={() => {
                  handleNavClick(item.id);
                  setIsMenuOpen(false);
                }}
                role="menuitem"
                tabIndex={0}
                aria-label={`Navigate to ${item.label} section`}
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;