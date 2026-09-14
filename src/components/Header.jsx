import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'projects', label: 'Projects' },
  { id: 'styles', label: 'Styles' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'about', label: 'About' },
  { id: 'planner', label: "Let's Plan" },
  { id: 'contact', label: 'Contact' }
];

const Header = () => {
  const [activeItem, setActiveItem] = useState('home');
  const [hoveredItem, setHoveredItem] = useState(null);
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
    if (magicLineRef.current) {
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
              {navItems.map((item) => (
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
          >
            Start a Project
          </button>

          {/* Theme Toggle */}
          <div
            className="theme-toggle"
            role="switch"
            aria-checked="false"
            aria-label="Toggle theme"
            onClick={() => {
              const currentTheme = document.documentElement.getAttribute('data-theme');
              const newTheme = currentTheme === 'light' ? '' : 'light';
              if (newTheme) {
                document.documentElement.setAttribute('data-theme', newTheme);
              } else {
                document.documentElement.removeAttribute('data-theme');
              }
            }}
          >
            <span className="theme-toggle-slider" aria-hidden="true"></span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;