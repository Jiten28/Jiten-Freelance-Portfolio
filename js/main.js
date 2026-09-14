/* ============================================================
   COORDINATION AND DOM LOGIC
   ============================================================ */

/* ============================================================
   NAV — mobile menu
   ============================================================ */
const hamburgerBtn = document.getElementById("hamburgerBtn");
const mobileMenu = document.getElementById("mobileMenu");
hamburgerBtn.addEventListener("click", ()=>{
  const open = mobileMenu.classList.toggle("open");
  hamburgerBtn.classList.toggle("open", open);
  hamburgerBtn.setAttribute("aria-expanded", open ? "true":"false");
  hamburgerBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
});
mobileMenu.querySelectorAll("a").forEach(a=>a.addEventListener("click", ()=>{
  mobileMenu.classList.remove("open"); hamburgerBtn.classList.remove("open");
  hamburgerBtn.setAttribute("aria-expanded","false"); hamburgerBtn.setAttribute("aria-label","Open menu");
}));

// Helper function to detect mobile devices
function isMobileDevice() {
  return window.matchMedia("(max-width: 768px)").matches;
}

// Wait for DOM to be fully loaded before running projects rendering
document.addEventListener("DOMContentLoaded", () => {
  /* ============================================================
     PROJECTS RENDER WITH FILTERING AND PREMIUM EFFECTS
     ============================================================ */
  const projGrid = document.getElementById("projGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");

  // Filter to only include the 4 specified featured projects
  const FEATURED_PROJECTS = ["Perfume Shop", "Voyage-AI", "Wonderful Crown", "Cindrix"];
  let featuredProjects = REAL_PROJECTS.filter(p => FEATURED_PROJECTS.includes(p.name));

  // Function to render projects based on filter
  function renderProjects(filterCategory = "all") {
    // Clear the grid
    projGrid.innerHTML = "";

    // Filter projects based on selected category
    let filteredProjects = featuredProjects;
    if (filterCategory !== "all") {
      filteredProjects = featuredProjects.filter(p => p.category === filterCategory);
    }

    // If no projects match the filter, show a message
    if (filteredProjects.length === 0) {
      const noProjectsMsg = document.createElement("div");
      noProjectsMsg.className = "no-projects";
      noProjectsMsg.textContent = "No projects match this filter.";
      noProjectsMsg.style.textAlign = "center";
      noProjectsMsg.style.padding = "40px";
      noProjectsMsg.style.color = "var(--text-dim)";
      projGrid.appendChild(noProjectsMsg);
      return;
    }

    // Render each project with premium effects
    filteredProjects.forEach(p=>{
      const card = document.createElement("div");
      card.className = "proj-card";
      card.tabIndex = 0;

      // Create premium card structure with layers for tilt effect
      const liveNote = p.hosting === "render" ? '<div class="note">Live demo may take a few seconds to start if the server has been inactive.</div>' : "";
      const liveBtn = p.url ? `<a class="live-btn" href="${p.url}" target="_blank" rel="noopener noreferrer">Open Live Project</a>` : `<div class="note">Live demo coming soon.</div>`;
      // Use mobile image on mobile devices when available
      const imgToShow = isMobileDevice() && p.mobileImg ? p.mobileImg : p.img;

      card.innerHTML = `
        <div class="proj-card-content">
          <div class="proj-card-layer proj-card-base">
            <div class="proj-thumb">${imgToShow ? `<img src="${imgToShow}" alt="${p.name} screenshot" loading="lazy">` : `<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;color:var(--text-dim);font-size:0.85rem;">Preview coming soon</div>`}</div>
            <div class="proj-body">
              <h3>${p.name}</h3>
              <span class="proj-tag">${p.category}</span>
            </div>
          </div>
          <div class="proj-card-layer proj-card-overlay">
            <div class="proj-overlay-content">
              <h3>${p.name}</h3>
              <div class="tech">${p.tech}</div>
              <div class="desc">${p.desc}</div>
              ${liveBtn}
              ${liveNote}
            </div>
          </div>
        </div>
      `;

      // Add event listeners for premium effects
      card.addEventListener("mousemove", (e) => handleCardMouseMove(e, card));
      card.addEventListener("mouseleave", () => handleCardMouseLeave(card));
      card.addEventListener("click", ()=>{ card.classList.toggle("tapped"); });
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          card.classList.toggle("tapped");
        }
      });

      projGrid.appendChild(card);
    });
  }

  // Initial render (show all featured projects)
  renderProjects("all");

  // Add event listeners to filter buttons
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      // Update active button
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      // Get filter category from button
      const filterCategory = button.dataset.filter;

      // Render projects with selected filter
      renderProjects(filterCategory);
    });

    // Add keyboard accessibility
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        // Get filter category from button
        const filterCategory = button.dataset.filter;

        // Render projects with selected filter
        renderProjects(filterCategory);
      }
    });
  });

  const moreTags = document.getElementById("moreProjTags");
  MORE_PROJECTS.forEach(name=>{
    const t = document.createElement("span");
    t.className = "tag-pill";
    t.textContent = name;
    moreTags.appendChild(t);
  });

  // Premium card interaction functions
  function handleCardMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; // x position within the element
    const y = e.clientY - rect.top; // y position within the element

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate the tilt angle (max 10 degrees)
    const tiltX = ((y - centerY) / centerY) * 10;
    const tiltY = ((centerX - x) / centerX) * 10;

    // Apply the tilt transform
    card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
  }

  function handleCardMouseLeave(card) {
    // Reset the transform on mouse leave
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
  }
});

/* ============================================================
   DESIGN STYLES RENDER
   ============================================================ */
function createStyleMiniature(styleName, gradients){
  // Create authentic visual demonstrations for each style
  switch(styleName){
    case "Glassmorphism":
      return `
        <div class="glass-demo">
          <div class="glass-panel" style="background: rgba(255,255,255,0.15); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;"></div>
          <div class="glass-panel" style="background: rgba(255,255,255,0.2); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.25); border-radius: 16px; margin: 8px 0 0 8px;"></div>
        </div>
      `;

    case "Minimalistic":
      return `
        <div class="mini-demo">
          <div class="mini-content" style="text-align: center; padding: 20%;">
            <h4 style="margin: 0 0 8px 0; font-size: 0.9rem; font-weight: 600;">Header</h4>
            <p style="margin: 0; font-size: 0.75rem; color: #666; line-height: 1.4;">Short description</p>
          </div>
        </div>
      `;

    case "Dark Mode":
      return `
        <div class="dark-demo">
          <div class="dark-header" style="background: #1a1a1a; padding: 12px 16px; border-bottom: 1px solid #333;">
            <h4 style="margin: 0; color: white; font-size: 0.9rem;">Dashboard</h4>
          </div>
          <div class="dark-content" style="padding: 16px;">
            <div class="card" style="background: #252525; border-radius: 8px; padding: 12px; margin-bottom: 12px; border: 1px solid #333;">
              <h5 style="margin: 0 0 8px 0; color: #fff; font-size: 0.85rem;">Card Title</h5>
              <p style="margin: 0; color: #ccc; font-size: 0.75rem;">Some content here</p>
            </div>
            <button style="background: #3b82f6; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;">Button</button>
          </div>
        </div>
      `;

    case "Colorful / Vibrant":
      return `
        <div class="colorful-demo">
          <div style="background: linear-gradient(45deg, #ff7a7a, #ffd36b); border-radius: 12px; padding: 16px; text-align: center;">
            <h4 style="margin: 0 0 8px 0; color: white; font-size: 0.9rem;">Vibrant Brand</h4>
            <p style="margin: 0; color: white; font-size: 0.75rem; opacity: 0.9;">Playful & Energetic</p>
          </div>
          <div style="display: flex; gap: 8px; margin-top: 12px;">
            <div style="background: #ff9e9e; width: 32px; height: 8px; border-radius: 4px;"></div>
            <div style="background: #ffd36b; width: 32px; height: 8px; border-radius: 4px;"></div>
            <div style="background: #ffb84d; width: 32px; height: 8px; border-radius: 4px;"></div>
          </div>
        </div>
      `;

    case "Neumorphism":
      return `
        <div class="neumorphism-demo">
          <div style="background: #e6e9ef; border-radius: 16px; padding: 20px;">
            <div class="neumorphic-card" style="background: #e6e9ef; border-radius: 12px; padding: 16px; box-shadow: 8px 8px 16px #d1d9e8, -8px -8px 16px #ffffff;">
              <h4 style="margin: 0 0 8px 0; color: #555; font-size: 0.9rem;">Soft UI</h4>
              <p style="margin: 0; color: #777; font-size: 0.75rem;">Subtle depth</p>
            </div>
          </div>
        </div>
      `;

    case "Brutalist":
      return `
        <div class="brutalist-demo">
          <div style="background: #111; color: #f4f4f4; padding: 20px; border: 2px solid #f4f4f4;">
            <h4 style="margin: 0 0 12px 0; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px;">BRUTALIST DESIGN</h4>
            <p style="margin: 0 0 12px 0; font-size: 0.75rem; line-height: 1.4;">Raw grids and hard edges</p>
            <button style="background: #111; color: #f4f4f4; border: 2px solid #f4f4f4; padding: 8px 16px; font-size: 0.75rem; cursor: pointer; text-transform: uppercase; letter-spacing: 0.5px;">CONTINUE</button>
          </div>
        </div>
      `;

    case "Vintage / Retro":
      return `
        <div class="vintage-demo">
          <div style="background: #f5f0e6; border: 1px solid #d4c5a8; border-radius: 8px; padding: 16px; font-family: 'Courier New', monospace;">
            <h4 style="margin: 0 0 8px 0; color: #5d4037; font-size: 0.9rem;">Heritage Brand</h4>
            <p style="margin: 0; color: #6d4c41; font-size: 0.75rem; line-height: 1.4;">Classic typography and warm tones</p>
            <div style="margin-top: 12px; padding-top: 8px; border-top: 1px dashed #bcaaa4;">
              <span style="color: #8d6e63; font-size: 0.7rem;">Est. 1923</span>
            </div>
          </div>
        </div>
      `;

    case "Hand-Drawn / Sketch":
      return `
        <div class="sketch-demo">
          <div style="background: #fff8f0; border: 2px dashed #ffd54f; border-radius: 12px; padding: 16px;">
            <h4 style="margin: 0 0 8px 0; color: #ff6f00; font-size: 0.9rem;">Sketchy Style</h4>
            <p style="margin: 0; color: #bf360c; font-size: 0.75rem;">Hand-drawn elements</p>
            <div style="margin-top: 12px; height: 32px; background: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"100\" height=\"32\"><path d=\"M5,10 Q15,5 25,10 T45,10 T65,10\" stroke=\"%23ff6f00\" stroke-width=\"2\" fill=\"none\"/></svg>') center/contain no-repeat;"></div>
          </div>
        </div>
      `;

    case "Parallax":
      return `
        <div class="parallax-demo" style="height: 100%; overflow: hidden; position: relative;">
          <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, rgba(41,75,122,0.3) 0%, rgba(92,134,201,0.3) 100%); z-index: 1;"></div>
          <div style="position: relative; z-index: 2; padding: 16px; text-align: center; color: white;">
            <h4 style="margin: 0 0 8px 0; font-size: 0.9rem;">Layered Depth</h4>
            <p style="margin: 0; font-size: 0.75rem; opacity: 0.9;">Scrolling effects</p>
            <div style="margin-top: 12px;">
              <div style="display: inline-block; width: 12px; height: 12px; background: rgba(255,255,255,0.5); border-radius: 50%; margin: 0 2px;"></div>
              <div style="display: inline-block; width: 12px; height: 12px; background: rgba(255,255,255,0.7); border-radius: 50%; margin: 0 2px;"></div>
              <div style="display: inline-block; width: 12px; height: 12px; background: rgba(255,255,255,0.9); border-radius: 50%; margin: 0 2px;"></div>
            </div>
          </div>
        </div>
      `;

    case "Landing Page":
      return `
        <div class="landing-demo">
          <div style="text-align: center; padding: 20px;">
            <h4 style="margin: 0 0 12px 0; font-size: 0.9rem;">Product Name</h4>
            <p style="margin: 0 0 16px 0; font-size: 0.75rem; color: #555; max-width: 200px; line-height: 1.4;">Clear value proposition that solves customer problems</p>
            <button style="background: #6a5bff; color: white; border: none; padding: 10px 20px; border-radius: 6px; font-size: 0.8rem; font-weight: 600; cursor: pointer;">Get Started Free</button>
            <div style="margin-top: 12px; font-size: 0.7rem; color: #999;">
              <div style="margin-bottom: 4px;">Feature one</div>
              <div style="margin-bottom: 4px;">Feature two</div>
              <div>Feature three</div>
            </div>
          </div>
        </div>
      `;

    case "One Page Scroll":
      return `
        <div class="onepage-demo">
          <div style="border-left: 3px solid #232735; padding-left: 16px;">
            <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
              <h4 style="margin: 0 0 4px 0; font-size: 0.85rem;">Section One</h4>
              <p style="margin: 0; font-size: 0.7rem; color: #666;">Introduction content</p>
            </div>
            <div style="margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #eee;">
              <h4 style="margin: 0 0 4px 0; font-size: 0.85rem;">Section Two</h4>
              <p style="margin: 0; font-size: 0.7rem; color: #666;">Features & benefits</p>
            </div>
            <div>
              <h4 style="margin: 0 0 4px 0; font-size: 0.85rem;">Section Three</h4>
              <p style="margin: 0; font-size: 0.7rem; color: #666;">Call to action</p>
            </div>
          </div>
        </div>
      `;

    case "Portfolio":
      return `
        <div class="portfolio-demo">
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; height: 100%;">
            <div style="background: #f0e6d2; border-radius: 8px; aspect-ratio: 1;"></div>
            <div style="background: #e8dcc5; border-radius: 8px; aspect-ratio: 1;"></div>
            <div style="background: #dfd2b8; border-radius: 8px; aspect-ratio: 1;"></div>
            <div style="background: #d6c8ab; border-radius: 8px; aspect-ratio: 1;"></div>
          </div>
          <div style="position: absolute; bottom: 12px; left: 16px; right: 16px; text-align: center; font-size: 0.75rem; color: #5d4037;">
            Curated project showcase
          </div>
        </div>
      `;

    case "E-Commerce":
      return `
        <div class="ecommerce-demo">
          <div style="display: flex; flex-direction: column; height: 100%;">
            <div style="flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px; margin-bottom: 12px;">
              <div style="background: #f8f9fa; border-radius: 8px; aspect-ratio: 1; border: 1px solid #eee;"></div>
              <div style="background: #f8f9fa; border-radius: 8px; aspect-ratio: 1; border: 1px solid #eee;"></div>
              <div style="background: #f8f9fa; border-radius: 8px; aspect-ratio: 1; border: 1px solid #eee;"></div>
              <div style="background: #f8f9fa; border-radius: 8px; aspect-ratio: 1; border: 1px solid #eee;"></div>
            </div>
            <div style="padding: 12px; background: white; border-top: 1px solid #eee;">
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                <span style="font-weight: 600; color: #111827; font-size: 0.85rem;">$89.99</span>
                <button style="background: #111827; color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Add to Cart</button>
              </div>
              <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Free shipping • 30-day returns</p>
            </div>
          </div>
        </div>
      `;

    case "Magazine / Blog":
      return `
        <div class="magazine-demo">
          <div style="display: flex; flex-direction: column; height: 100%;">
            <div style="flex: 0 0 80px; border-bottom: 2px solid #e5e7eb;">
              <h4 style="margin: 0; padding: 0 16px; line-height: 80px; font-size: 0.85rem; color: #1f2937;">Magazine Title</h4>
            </div>
            <div style="flex: 1; display: flex;">
              <div style="flex: 0 0 200px; border-right: 1px solid #eee;">
                <div style="background: #f9fafb; height: 60px; margin: 16px;"></div>
                <div style="background: #f9fafb; height: 40px; margin: 0 16px 16px 16px;"></div>
              </div>
              <div style="flex: 1; padding: 16px;">
                <h4 style="margin: 0 0 8px 0; font-size: 0.85rem; color: #1f2937;">Featured Article Title</h4>
                <p style="margin: 0 0 12px 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Brief excerpt of the featured article content goes here...</p>
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 0.7rem; color: #9ca3af;">Jan 15, 2024</span>
                  <span style="font-size: 0.7rem; color: #3b82f6;">Read more →</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    case "Corporate / Business":
      return `
        <div class="corporate-demo">
          <div style="display: flex; flex-direction: column; height: 100%;">
            <div style="flex: 0 0 60px; background: #1d3a63; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
              <div>
                <h4 style="margin: 0; font-size: 0.85rem;">Corporate Brand</h4>
                <p style="margin: 0; font-size: 0.7rem; opacity: 0.9;">Professional Services</p>
              </div>
              <nav style="display: flex; gap: 16px;">
                <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.75rem;">Services</a>
                <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.75rem;">About</a>
                <a href="#" style="color: rgba(255,255,255,0.8); text-decoration: none; font-size: 0.75rem;">Contact</a>
              </nav>
            </div>
            <div style="flex: 1; padding: 20px;">
              <h4 style="margin: 0 0 12px 0; font-size: 0.85rem; color: #1d3a63;">Professional Solutions for Business</h4>
              <p style="margin: 0 0 16px 0; font-size: 0.75rem; color: #4b5563; line-height: 1.4;">We help businesses achieve their goals through strategic planning and execution.</p>
              <div style="display: flex; gap: 12px;">
                <button style="background: #1d3a63; color: white; border: none; padding: 8px 16px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Learn More</button>
                <button style="background: transparent; color: #1d3a63; border: 2px solid #1d3a63; padding: 8px 16px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Get Quote</button>
              </div>
            </div>
          </div>
        </div>
      `;

    case "Educational":
      return `
        <div class="educational-demo">
          <div style="display: flex; flex-direction: column; height: 100%;">
            <div style="flex: 0 0 60px; background: #0f766e; color: white; display: flex; align-items: center; justify-content: space-between; padding: 0 20px;">
              <div>
                <h4 style="margin: 0; font-size: 0.85rem;">LearnHub</h4>
                <p style="margin: 0; font-size: 0.7rem; opacity: 0.9;">Online Learning Platform</p>
              </div>
              <div style="display: flex; gap: 12px;">
                <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Sign In</button>
                <button style="background: white; color: #0f766e; border: none; padding: 6px 12px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Get Started</button>
              </div>
            </div>
            <div style="flex: 1; padding: 20px;">
              <h4 style="margin: 0 0 12px 0; font-size: 0.85rem; color: #0f766e;">Master New Skills</h4>
              <p style="margin: 0 0 16px 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Access comprehensive courses designed by industry experts to help you achieve your learning goals.</p>
              <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                <span style="background: #ecfdf5; color: #0f766e; padding: 4px 8px; border-radius: 12px; font-size: 0.7rem;">Design</span>
                <span style="background: #ecfdf5; color: #0f766e; padding: 4px 8px; border-radius: 12px; font-size: 0.7rem;">Development</span>
                <span style="background: #ecfdf5; color: #0f766e; padding: 4px 8px; border-radius: 12px; font-size: 0.7rem;">Business</span>
              </div>
            </div>
          </div>
        </div>
      `;

    case "SaaS / Dashboard":
      return `
        <div class="saas-demo">
          <div style="display: flex; height: 100%;">
            <div style="flex: 0 0 60px; background: #1e293b; color: white; padding: 0 20px; display: flex; align-items: center;">
              <h4 style="margin: 0; font-size: 0.85rem;">Dashboard</h4>
            </div>
            <div style="flex: 1; display: flex; flex-direction: column;">
              <div style="flex: 0 0 50px; border-bottom: 1px solid #334155; padding: 0 20px; display: flex; align-items: center; justify-content: space-between;">
                <div style="display: flex; align-items: center; gap: 8px;">
                  <span style="background: #3b82f6; width: 8px; height: 8px; border-radius: 50%;"></span>
                  <span style="color: #e2e8f0; font-size: 0.75rem;">Overview</span>
                </div>
                <div style="display: flex; align-items: center; gap: 12px;">
                  <span style="color: #94a3b8; font-size: 0.75rem;">Filters</span>
                  <button style="background: transparent; color: #e2e8f0; border: none; padding: 4px 8px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">⋮</button>
                </div>
              </div>
              <div style="flex: 1; display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 20px;">
                <div style="background: #253047; border-radius: 8px; padding: 16px;">
                  <h5 style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 0.8rem;">Users Active</h5>
                  <p style="margin: 0; font-size: 1.5rem; font-weight: 600; color: #3b82f6;">2,347</p>
                  <p style="margin: 4px 0 0 0; font-size: 0.75rem; color: #94a3b8;">+12% vs last week</p>
                </div>
                <div style="background: #253047; border-radius: 8px; padding: 16px;">
                  <h5 style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 0.8rem;">Revenue</h5>
                  <p style="margin: 0; font-size: 1.5rem; font-weight: 600; color: #10b981;">$45,230</p>
                  <p style="margin: 4px 0 0 0; font-size: 0.75rem; color: #94a3b8;">+8% vs last week</p>
                </div>
                <div style="background: #253047; border-radius: 8px; padding: 16px;">
                  <h5 style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 0.8rem;">Performance</h5>
                  <div style="height: 20px; background: #334155; border-radius: 10px; overflow: hidden; margin-top: 8px;">
                    <div style="background: #3b82f6; width: 75%; height: 100%;"></div>
                  </p>
                  <p style="margin: 4px 0 0 0; font-size: 0.75rem; color: #94a3b8;">75% average</p>
                </div>
                <div style="background: #253047; border-radius: 8px; padding: 16px;">
                  <h5 style="margin: 0 0 8px 0; color: #e2e8f0; font-size: 0.8rem;">Growth</h5>
                  <p style="margin: 0; font-size: 1.25rem; font-weight: 600; color: #f59e0b;">18.5%</p>
                  <p style="margin: 2px 0 0 0; font-size: 0.75rem; color: #94a3b8;">Monthly</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    case "Entertainment":
      return `
        <div class="entertainment-demo">
          <div style="background: linear-gradient(45deg, #1a0b2e, #7c2ae8); border-radius: 16px; padding: 20px; text-align: center; color: white;">
            <h4 style="margin: 0 0 12px 0; font-size: 0.9rem;">Event Name</h4>
            <p style="margin: 0 0 16px 0; font-size: 0.75rem; opacity: 0.9;">Experience the unforgettable</p>
            <div style="display: flex; justify-center: center; gap: 12px; margin-bottom: 16px;">
              <div style="background: rgba(255,255,255,0.2); width: 40px; height: 4px; border-radius: 2px;"></div>
              <div style="background: rgba(255,255,255,0.2); width: 40px; height: 4px; border-radius: 2px;"></div>
              <div style="background: rgba(255,255,255,0.2); width: 40px; height: 4px; border-radius: 2px;"></div>
            </div>
            <button style="background: rgba(255,255,255,0.2); color: white; border: 2px solid white; padding: 10px 24px; border-radius: 50px; font-size: 0.8rem; cursor: pointer; backdrop-filter: blur(5px);">Buy Tickets</button>
          </div>
        </div>
      `;

    case "Nature / Eco":
      return `
        <div class="nature-demo">
          <div style="background: linear-gradient(135deg, #2f5233, #8bc34a); border-radius: 16px; padding: 20px; color: white;">
            <div style="display: flex; align-items: center; margin-bottom: 12px;">
              <div style="background: rgba(255,255,255,0.2); width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-right: 12px;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" stroke-width="2"/>
                  <path d="M12 8V12" stroke="white" stroke-width="2"/>
                  <path d="M12 16H12.01" stroke="white" stroke-width="2"/>
                </svg>
              </div>
              <div>
                <h4 style="margin: 0; font-size: 0.85rem;">EcoBrand</h4>
                <p style="margin: 0; font-size: 0.7rem; opacity: 0.9;">Sustainable Solutions</p>
              </div>
            </div>
            <p style="margin: 0 0 16px 0; font-size: 0.75rem; line-height: 1.4;">Organic tones and natural imagery for an earthy, grounded feel that connects with environmentally conscious consumers.</p>
            <div style="display: flex; gap: 12px;">
              <button style="background: rgba(255,255,255,0.2); color: white; border: none; padding: 8px 16px; border-radius: 4px; font-size: 0.75rem; cursor: pointer; backdrop-filter: blur(5px);">Learn More</button>
              <button style="background: white; color: #2f5233; border: none; padding: 8px 16px; border-radius: 4px; font-size: 0.75rem; cursor: pointer;">Shop Now</button>
            </div>
          </div>
        </div>
      `;

    case "AI / Tech":
      return `
        <div class="ai-demo">
          <div style="background: linear-gradient(135deg, #0a0e27, #3b82f6); border-radius: 16px; padding: 20px; position: relative; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background:
              radial-gradient(circle at 20% 20%, rgba(59,130,246,0.1) 0%, transparent 20%),
              radial-gradient(circle at 80% 80%, rgba(59,130,246,0.1) 0%, transparent 20%),
              repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(59,130,246,0.05) 2px, rgba(59,130,246,0.05) 4px);
            ">
            </div>
            <div style="position: relative; z-index: 2; text-align: center;">
              <h4 style="margin: 0 0 12px 0; color: white; font-size: 0.9rem;">AI Intelligence</h4>
              <p style="margin: 0 0 16px 0; color: rgba(255,255,255,0.9); font-size: 0.75rem; line-height: 1.4;">Futuristic gradients and geometric detail signalling technology innovation</p>
              <div style="display: flex; justify-content: center; gap: 12px; margin-bottom: 16px;">
                <div style="background: rgba(255,255,255,0.2); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="white" stroke-width="2"/>
                    <path d="M12 6V12" stroke="white" stroke-width="2"/>
                    <path d="M6 12H12" stroke="white" stroke-width="2"/>
                  </svg>
                </div>
                <div style="background: rgba(255,255,255,0.2); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 20h16" stroke="white" stroke-width="2"/>
                    <path d="M8 8h8" stroke="white" stroke-width="2"/>
                    <path d="M12 12h4" stroke="white" stroke-width="2"/>
                  </svg>
                </div>
                <div style="background: rgba(255,255,255,0.2); width: 24px; height: 24px; border-radius: 50%; display: flex; align-items: center; justify-content: center;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 12h8" stroke="white" stroke-width="2"/>
                    <path d="M12 8v4" stroke="white" stroke-width="2"/>
                    <path d="M12 12h4" stroke="white" stroke-width="2"/>
                  </svg>
                </div>
              </div>
              <button style="background: rgba(255,255,255,0.2); color: white; border: 2px solid white; padding: 10px 24px; border-radius: 50px; font-size: 0.8rem; cursor: pointer; backdrop-filter: blur(5px);">Explore AI</button>
            </div>
          </div>
        </div>
      `;

    default:
      // Fallback to gradient if style not found
      return `<div class="style-mini" style="background:linear-gradient(135deg, ${gradients[0]}, ${gradients[1]});"></div>`;
  }
}
const styleGrid = document.getElementById("styleGrid");
function renderStyles(){
  styleGrid.innerHTML = "";
  DESIGN_STYLES.forEach((s, i)=>{
    const card = document.createElement("div");
    card.className = "style-card" + (state.styleIndex === i ? " selected":"");
    card.innerHTML = `
      <div class="style-mini">${createStyleMiniature(s.n, s.g)}</div>
      <div class="style-body">
        <h4>${s.n}</h4>
        <span class="fit">Best for: ${s.fit}</span>
        <p>${s.d}</p>
        <button class="style-pick" data-i="${i}">${state.styleIndex === i ? "Selected" : "Choose This Style"}</button>
      </div>`;
    styleGrid.appendChild(card);
  });
  styleGrid.querySelectorAll(".style-pick").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      state.styleIndex = Number(btn.dataset.i);
      renderStyles();
      renderPlannerStep(); // keep planner in sync if user is on style step
    });
  });
  styleGrid.querySelectorAll(".style-card").forEach(card=>{
    card.addEventListener("mouseenter", ()=>styleGrid.classList.add("has-hover"));
    card.addEventListener("mouseleave", ()=>styleGrid.classList.remove("has-hover"));
  });
}
renderStyles();

/* ============================================================
   EXPERIENCE RENDER
   ============================================================ */
function createExperienceMiniature(featureName){
  // Create meaningful visual demonstrations for each experience feature
  switch(featureName){
    case "Smooth Scrolling":
      return `
        <div class="smooth-scroll-demo">
          <div style="display: flex; height: 100%; flex-direction: column;">
            <div style="flex: 0 0 40px; background: #1a1a1a; color: white; display: flex; align-items: center; padding: 0 16px;">
              <h4 style="margin: 0; font-size: 0.85rem;">Website</h4>
            </div>
            <div style="flex: 1; position: relative; overflow: hidden;">
              <div style="position: absolute; top: 0; left: 0; width: 100%; height: 33.33%; background: #f8f9fa; border-bottom: 1px solid #eee;"></div>
              <div style="position: absolute; top: 33.33%; left: 0; width: 100%; height: 33.33%; background: #fff; border-bottom: 1px solid #eee;"></div>
              <div style="position: absolute; top: 66.66%; left: 0; width: 100%; height: 33.34%; background: #f8f9fa;"></div>
              <div style="position: absolute; left: 16px; bottom: 20px; width: 4px; height: 40px; background: linear-gradient(to top, #3b82f6, transparent); border-radius: 2px; animation: scrollIndicator 2s ease-in-out infinite;"></div>
            </div>
          </div>
          <style>
            @keyframes scrollIndicator {
              0%, 100% { transform: translateY(0); opacity: 0.7; }
              50% { transform: translateY(-20px); opacity: 1; }
            }
          </style>
        </div>
      `;

    case "Responsive Design":
      return `
        <div class="responsive-demo">
          <div style="display: flex; height: 100%;">
            <!-- Desktop -->
            <div style="flex: 0 0 38%; background: white; border: 1px solid #eee; border-radius: 8px; margin: 4px; display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center;">
                <h4 style="margin: 0 0 4px 0; font-size: 0.75rem; color: #1f2937;">Desktop</h4>
                <p style="margin: 0; font-size: 0.65rem; color: #6b7280;">1200px</p>
              </div>
            </div>
            <!-- Tablet -->
            <div style="flex: 0 0 31%; background: white; border: 1px solid #eee; border-radius: 8px; margin: 4px; display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center;">
                <h4 style="margin: 0 0 4px 0; font-size: 0.75rem; color: #1f2937;">Tablet</h4>
                <p style="margin: 0; font-size: 0.65rem; color: #6b7280;">768px</p>
              </div>
            </div>
            <!-- Mobile -->
            <div style="flex: 0 0 31%; background: white; border: 1px solid #eee; border-radius: 8px; margin: 4px; display: flex; align-items: center; justify-content: center;">
              <div style="text-align: center;">
                <h4 style="margin: 0 0 4px 0; font-size: 0.75rem; color: #1f2937;">Mobile</h4>
                <p style="margin: 0; font-size: 0.65rem; color: #6b7280;">360px</p>
              </div>
            </div>
          </div>
          <div style="position: absolute; bottom: 8px; left: 16px; right: 16px; text-align: center; font-size: 0.7rem; color: #6b7280;">
            Same content adapting to different screen sizes
          </div>
        </div>
      `;

    case "Modern UI":
      return `
        <div class="modern-ui-demo">
          <div style="background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <div style="display: flex; border-bottom: 1px solid #eee;">
              <div style="flex: 0 0 60px; background: #3b82f6; color: white; display: flex; align-items: center; justify-content: center;">
                <h4 style="margin: 0; font-size: 0.8rem;">App</h4>
              </div>
              <div style="flex: 1; padding: 12px 16px;">
                <h4 style="margin: 0 0 8px 0; font-size: 0.85rem; color: #1f2937;">Dashboard Title</h4>
                <p style="margin: 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Clean interface with thoughtful spacing and typography</p>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 16px;">
              <div style="background: #f8fafc; border-radius: 8px; padding: 12px;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.75rem; color: #1f2937;">Card Component</h5>
                <p style="margin: 0; font-size: 0.65rem; color: #6b7280; line-height: 1.3;">Subtle elevation and hover states</p>
              </div>
              <div style="background: #f8fafc; border-radius: 8px; padding: 12px;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.75rem; color: #1f2937;">Button Group</h5>
                <div style="display: flex; gap: 6px;">
                  <button style="background: #3b82f6; color: white; border: none; padding: 6px 10px; border-radius: 6px; font-size: 0.7rem;">Primary</button>
                  <button style="background: transparent; color: #64748b; border: 1px solid #e2e8f0; padding: 6px 10px; border-radius: 6px; font-size: 0.7rem;">Secondary</button>
                </div>
              </div>
              <div style="background: #f8fafc; border-radius: 8px; padding: 12px;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.75rem; color: #1f2937;">Input Fields</h5>
                <div style="margin-top: 8px;">
                  <input type="text" placeholder="Enter text" style="width: 100%; padding: 8px 10px; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 0.7rem; background: white;">
                </div>
              </div>
              <div style="background: #f8fafc; border-radius: 8px; padding: 12px;">
                <h5 style="margin: 0 0 6px 0; font-size: 0.75rem; color: #1f2937;">Navigation</h5>
                <div style="display: flex; flex-wrap: wrap; gap: 6px;">
                  <span style="background: #e2e8f0; color: #64748b; padding: 4px 8px; border-radius: 4px; font-size: 0.65rem;">Active</span>
                  <span style="background: transparent; color: #94a3b8; padding: 4px 8px; border-radius: 4px; font-size: 0.65rem;">Link</span>
                  <span style="background: transparent; color: #94a3b8; padding: 4px 8px; border-radius: 4px; font-size: 0.65rem;">Link</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    case "Micro-interactions":
      return `
        <div class="micro-interactions-demo">
          <div style="text-align: center;">
            <div style="display: inline-block; width: 80px; height: 80px; background: #f8fafc; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; position: relative; overflow: hidden;">
              <button id="microBtn" style="background: #3b82f6; color: white; border: none; width: 40px; height: 40px; border-radius: 8px; font-size: 0.75rem; cursor: pointer; transition: transform 0.2s ease, background 0.2s ease;">+</button>
              <div style="position: absolute; top: -4px; right: -4px; background: #10b981; color: white; border-radius: 50%; width: 18px; height: 18px; display: flex; align-items: center; justify-content: center; font-size: 0.65rem; font-weight: 600;">1</div>
            </div>
            <p style="margin: 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Button press creates subtle feedback with state change and visual response</p>
          </div>
          <style>
            #microBtn:active {
              transform: scale(0.95);
              background: #2563eb;
            }
            #microBtn:hover {
              background: #2563eb;
              transform: translateY(-1px);
            }
          </style>
        </div>
      `;

    case "Subtle Parallax":
      return `
        <div class="parallax-demo">
          <div style="position: relative; height: 100%; overflow: hidden;">
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: linear-gradient(180deg, #eff6ff 0%, #dbeafe 100%); z-index: 1;"></div>
            <div style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"60\" height=\"60\"><circle cx=\"30\" cy=\"30\" r=\"20\" fill=\"%233b82f6\" fill-opacity=\"0.2\"/></svg>') repeat; pointer-events: none; z-index: 2; opacity: 0.6;"></div>
            <div style="position: relative; z-index: 3; padding: 20px; text-align: center;">
              <h4 style="margin: 0 0 12px 0; font-size: 0.85rem; color: #1f2937;">Layered Depth</h4>
              <p style="margin: 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Background elements move at different speeds creating subtle depth without distraction</p>
              <div style="margin-top: 16px; display: flex; justify-content: center; gap: 12px;">
                <div style="width: 20px; height: 4px; background: #3b82f6; border-radius: 2px;"></div>
                <div style="width: 20px; height: 4px; background: #3b82f6; border-radius: 2px;"></div>
                <div style="width: 20px; height: 4px; background: #3b82f6; border-radius: 2px;"></div>
              </div>
            </div>
          </div>
          <style>
            @media (prefers-reduced-motion: reduce) {
              .parallax-demo div:nth-child(2) {
                display: none;
              }
            }
          </style>
        </div>
      `;

    case "Mobile First":
      return `
        <div class="mobile-first-demo">
          <div style="background: white; border-radius: 12px; overflow: hidden;">
            <div style="display: flex; border-bottom: 1px solid #eee;">
              <div style="flex: 0 0 60px; background: #0f766e; color: white; display: flex; align-items: center; justify-content: center;">
                <h4 style="margin: 0; font-size: 0.8rem;">Menu</h4>
              </div>
              <div style="flex: 1; padding: 12px 16px;">
                <h4 style="margin: 0 0 8px 0; font-size: 0.85rem; color: #1f2937;">Mobile App</h4>
                <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Designed for touch with generous tap targets</p>
              </div>
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 12px; border-radius: 8px; gap: 8px;">
                  <div style="width: 12px; height: 12px; background: #10b981; border-radius: 50%;"></div>
                  <span style="font-size: 0.75rem; color: #374151;">Home</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 12px; border-radius: 8px; gap: 8px;">
                  <div style="width: 12px; height: 12px; background: #3b82f6; border-radius: 50%;"></div>
                  <span style="font-size: 0.75rem; color: #374151;">Search</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 12px; border-radius: 8px; gap: 8px;">
                  <div style="width: 12px; height: 12px; background: #f59e0b; border-radius: 50%;"></div>
                  <span style="font-size: 0.75rem; color: #374151;">Profile</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 12px; border-radius: 8px; gap: 8px;">
                  <div style="width: 12px; height: 12px; background: #8b5cf6; border-radius: 50%;"></div>
                  <span style="font-size: 0.75rem; color: #374151;">Settings</span>
                </div>
              </div>
              <div style="margin-top: 16px; text-align: center;">
                <button style="background: #0f766e; color: white; border: none; padding: 10px 16px; border-radius: 8px; font-size: 0.8rem; cursor: pointer;">Primary Action</button>
              </div>
            </div>
          </div>
        </div>
      `;

    case "Fast Performance":
      return `
        <div class="fast-performance-demo">
          <div style="text-align: center;">
            <div style="display: inline-block; width: 60px; height: 60px; background: #f0f9ff; border-radius: 12px; display: flex; align-items: center; justify-content: center; margin-bottom: 16px; position: relative;">
              <div style="width: 24px; height: 24px; border: 2px solid #3b82f6; border-radius: 50%; position: relative;">
                <div style="width: 10px; height: 10px; background: #3b82f6; border-radius: 50%; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: loadingSpin 1s ease-in-out infinite;"></div>
              </div>
            </div>
            <div style="margin-top: 12px; display: flex; justify-content: space-around;">
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 600; color: #10b981;">1.2s</div>
                <div style="font-size: 0.75rem; color: #6b7280;">Load Time</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 600; color: #10b981;">95%</div>
                <div style="font-size: 0.75rem; color: #6b7280;">Performance</div>
              </div>
              <div style="text-align: center;">
                <div style="font-size: 1.5rem; font-weight: 600; color: #10b981;">A</div>
                <div style="font-size: 0.75rem; color: #6b7280;">Score</div>
              </div>
            </div>
            <p style="margin-top: 12px; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Optimized assets, efficient code, and prioritized loading for instant responsiveness</p>
          </div>
          <style>
            @keyframes loadingSpin {
              to { transform: translate(-50%, -50%) rotate(360deg); }
            }
          </style>
        </div>
      `;

    case "Accessible Design":
      return `
        <div class="accessible-demo">
          <div style="display: flex; height: 100%; flex-direction: column;">
            <div style="flex: 0 0 40px; background: white; border-bottom: 1px solid #eee; display: flex; align-items: center; padding: 0 16px;">
              <h4 style="margin: 0; font-size: 0.85rem; color: #1f2937;">Navigation</h4>
            </div>
            <div style="flex: 1; display: flex; padding: 16px;">
              <!-- Keyboard Focus -->
              <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h11"/></svg>
                  <span style="margin-left: 8px; font-size: 0.75rem; color: #374151;">Keyboard navigable</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><circle cx="12" cy="12" r="10" stroke="currentColor"/><path d="M12 8v8M8 12h8"/></svg>
                  <span style="margin-left: 8px; font-size: 0.75rem; color: #374151;">Visible focus states</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M4 20h16"/><path d="M12 4v12"/></svg>
                  <span style="margin-left: 8px; font-size: 0.75rem; color: #374151;">Sufficient contrast</span>
                </div>
              </div>
              <!-- Screen Reader -->
              <div style="flex: 0 0 50%; display: flex; flex-direction: column; gap: 12px;">
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M2 3h20"/><path d="M6 7v2"/><path d="M10 7v2"/><path d="M14 7v2"/><path d="M18 7v2"/></svg>
                  <span style="margin-left: 8px; font-size: 0.75rem; color: #374151;">Semantic HTML structure</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M2 12h8"/><path d="M14 12h8"/><path d="M2 18h8"/><path d="M14 18h8"/></svg>
                  <span style="margin-left: 8px; font-size: 0.75rem; color: #374151;">Labels and descriptions</span>
                </div>
                <div style="display: flex; align-items: center; background: #f8fafc; padding: 10px; border-radius: 8px;">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M5 9h14"/><path d="M5 15h10"/><path d="M9 9v6"/></svg>
                  <span style="margin-left: 8px; font-size: 0.75rem; color: #374151;">Accessible controls</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    case "Business-Focused UX":
      return `
        <div class="business-focused-demo">
          <div style="background: white; border-radius: 12px; overflow: hidden;">
            <div style="display: flex; border-bottom: 1px solid #eee;">
              <div style="flex: 0 0 60px; background: #1d3a63; color: white; display: flex; align-items: center; justify-content: center;">
                <h4 style="margin: 0; font-size: 0.8rem;">Brand</h4>
              </div>
              <div style="flex: 1; padding: 12px 16px;">
                <h4 style="margin: 0 0 8px 0; font-size: 0.85rem; color: #1f2937;">Business Website</h4>
                <p style="margin: 0; font-size: 0.75rem; color: #6b7280;">Clear path from visitor to customer</p>
              </div>
            </div>
            <div style="padding: 16px;">
              <div style="display: flex; flex-direction: column; gap: 16px;">
                <div style="text-align: center;">
                  <h4 style="margin: 0 0 8px 0; font-size: 0.85rem; color: #1f2937;">Professional Services</h4>
                  <p style="margin: 0; font-size: 0.75rem; color: #6b7280; line-height: 1.4;">Expert solutions tailored to your business needs</p>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; padding: 12px; border-radius: 8px;">
                  <div>
                    <h5 style="margin: 0 0 4px 0; font-size: 0.75rem; color: #1f2937;">Free Consultation</h5>
                    <p style="margin: 0; font-size: 0.65rem; color: #6b7280;">Discuss your goals</p>
                  </div>
                  <button style="background: #1d3a63; color: white; border: none; padding: 8px 16px; border-radius: 6px; font-size: 0.75rem; cursor: pointer;">Schedule Call</button>
                </div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-top: 12px;">
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 600; color: #10b981;">3</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Consultations</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 600; color: #10b981;">12+</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Projects</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 600; color: #10b981;">95%</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Satisfaction</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 600; color: #10b981;">5★</div>
                    <div style="font-size: 0.75rem; color: #6b7280;">Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      `;

    default:
      // Fallback to simple indicator if feature not found
      return `<span class="dot"></span><h4>${featureName}</h4>`;
  }
}
const expGrid = document.getElementById("expGrid");
EXPERIENCE_ITEMS.forEach(item=>{
  const c = document.createElement("div");
  c.className = "exp-card";
  c.innerHTML = `<div class="experience-content">${createExperienceMiniature(item)}</div>`;
  expGrid.appendChild(c);
});

/* ============================================================
   PLANNER — multi-step wizard
   ============================================================ */
// Load persisted state from localStorage if available
function loadPlannerState() {
  try {
    const saved = localStorage.getItem('jitenLabsPlannerState');
    if (saved) {
      let parsed;
      try {
        parsed = JSON.parse(saved);
      } catch (parseError) {
        console.warn('Failed to parse planner state from localStorage, clearing corrupted data:', parseError);
        // Clear corrupted data
        localStorage.removeItem('jitenLabsPlannerState');
        return state;
      }

      // Validate parsed data structure
      if (parsed && typeof parsed === 'object') {
        // Merge with default state to ensure all properties exist
        const validatedState = {
          businessType: parsed.businessType || null,
          projectType: parsed.projectType || null,
          styleIndex: parsed.styleIndex !== null && !isNaN(parsed.styleIndex) ? parsed.styleIndex : null,
          features: Array.isArray(parsed.features) ? parsed.features : [],
          business: {
            name: typeof parsed.business?.name === 'string' ? parsed.business.name : '',
            owner: typeof parsed.business?.owner === 'string' ? parsed.business.owner : '',
            phone: typeof parsed.business?.phone === 'string' ? parsed.business.phone : '',
            email: typeof parsed.business?.email === 'string' ? parsed.business.email : '',
            location: typeof parsed.business?.location === 'string' ? parsed.business.location : '',
            web: typeof parsed.business?.web === 'string' ? parsed.business.web : '',
            notes: typeof parsed.business?.notes === 'string' ? parsed.business.notes : ''
          },
          budget: typeof parsed.budget === 'string' && parsed.budget !== '' ? parsed.budget : null,
          deployChoice: typeof parsed.deployChoice === 'string' && parsed.deployChoice !== '' ? parsed.deployChoice : null,
          aiConcept: parsed.aiConcept && typeof parsed.aiConcept === 'object' ? parsed.aiConcept : null
        };
        return validatedState;
      } else {
        console.warn('Invalid planner state structure in localStorage, using default state');
        return state;
      }
    }
  } catch (e) {
    // Failed to access localStorage, use default state
    console.warn('Could not access planner state from localStorage:', e);
  }
  return state;
}

// Save state to localStorage with error handling
function savePlannerState() {
  try {
    const stateToSave = {
      businessType: state.businessType,
      projectType: state.projectType,
      styleIndex: state.styleIndex,
      features: [...state.features],
      business: { ...state.business },
      budget: state.budget,
      deployChoice: state.deployChoice,
      aiConcept: state.aiConcept
    };
    localStorage.setItem('jitenLabsPlannerState', JSON.stringify(stateToSave));
  } catch (e) {
    console.warn('Could not save planner state to localStorage:', e);
    // Optionally, we could retry once or notify the user
    // For now, we'll just warn and continue
  }
}

// Initialize state from localStorage
const initializedState = loadPlannerState();
state.businessType = initializedState.businessType;
state.projectType = initializedState.projectType;
state.styleIndex = initializedState.styleIndex;
state.features = initializedState.features || [];
state.business = { ...state.business, ...initializedState.business };
state.budget = initializedState.budget;
state.deployChoice = initializedState.deployChoice;
state.aiConcept = initializedState.aiConcept;

const TOTAL_STEPS = 7; // business type, project type, style, features, business info, budget, deployment
let currentStep = 1;

const progressEl = document.getElementById("plannerProgress");
function renderProgress(){
  progressEl.innerHTML = "";
  for(let i=1;i<=TOTAL_STEPS;i++){
    const seg = document.createElement("div");
    seg.className = "seg" + (i<=currentStep ? " done":"");
    progressEl.appendChild(seg);
  }
}

// Validation functions - Enhanced for Phase 9
function validatePhone(phone) {
  if (!phone) return { valid: false, message: "Please enter your phone number." };

  // Trim whitespace
  const trimmed = phone.trim();

  // Check if empty after trimming
  if (trimmed === '') {
    return { valid: false, message: "Please enter your phone number." };
  }

  // Remove all non-digit characters except +
  const cleaned = trimmed.replace(/[^\d+]/g, '');

  // Check if it's a valid Indian mobile number
  // Support formats: 9876543210, +919876543210, 919876543210
  const indianRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

  // Also accept 10-digit format starting with 6-9
  const tenDigitRegex = /^[6-9]\d{9}$/;

  const isValid = indianRegex.test(cleaned) || tenDigitRegex.test(cleaned);

  if (!isValid) {
    return {
      valid: false,
      message: "Please enter a valid 10-digit Indian mobile number (e.g., 9876543210, +919876543210, or 919876543210)."
    };
  }

  // Normalize for storage: store as 10-digit number without country code
  const normalized = cleaned.replace(/^(\+91|91)?/, '');
  return { valid: true, message: "", normalized };
}

function validateEmail(email) {
  if (!email) return { valid: false, message: "Please enter your email address." };

  // Trim whitespace
  const trimmed = email.trim();

  // Check if empty after trimming
  if (trimmed === '') {
    return { valid: false, message: "Please enter your email address." };
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  if (!emailRegex.test(trimmed)) {
    return {
      valid: false,
      message: "Please enter a valid email address."
    };
  }

  // Additional checks for common invalid patterns as per Phase 9
  const invalidPatterns = [
    /^jiten$/i,
    /^jiten@/i,
    /^jiten@gmail/i,
    /^@gmail\.com$/i,
    /^[^@]+$/, // No @ symbol
    /^[^@]+@$/, // No domain
    /@[^@]+$/, // No local part
    /\s/ // Contains whitespace
  ];

  for (const pattern of invalidPatterns) {
    if (pattern.test(trimmed)) {
      return {
        valid: false,
        message: "Please enter a valid email address with a sensible local part, @ symbol, domain, and domain extension."
      };
    }
  }

  return { valid: true, message: "", normalized: trimmed.toLowerCase() };
}

function validateRequired(value, fieldName) {
  if (value === null || value === undefined) {
    return { valid: false, message: `Please enter your ${fieldName.toLowerCase()}.` };
  }

  // Trim whitespace
  const trimmed = String(value).trim();

  // Reject empty or whitespace-only values
  if (trimmed === '') {
    return { valid: false, message: `Please enter your ${fieldName.toLowerCase()}.` };
  }

  return { valid: true, message: "", normalized: trimmed };
}

function optButtons(options, selected, onPick, getLabel, getSub){
  const wrap = document.createElement("div");
  wrap.className = "opt-grid";
  options.forEach((opt, index)=>{
    const label = getLabel ? getLabel(opt) : opt;
    const sub = getSub ? getSub(opt) : null;
    const btn = document.createElement("button");
    btn.className = "opt-btn" + (selected === opt ? " selected":"");
    btn.type = "button";
    btn.innerHTML = label + (sub ? `<small>${sub}</small>` : "");

    // Accessibility attributes
    btn.setAttribute("role", "radio");
    btn.setAttribute("aria-checked", selected === opt ? "true" : "false");
    btn.setAttribute("aria-label", label);

    btn.addEventListener("click", ()=>{
      onPick(opt);
      savePlannerState(); // Save state when selection changes
      renderPlannerStep();
    });

    // Keyboard accessibility
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        onPick(opt);
        savePlannerState();
        renderPlannerStep();
      }
    });

    wrap.appendChild(btn);
  });
  return wrap;
}

function renderPlannerStep(){
  renderProgress();
  const area = document.getElementById("plannerStepArea");
  area.innerHTML = "";

  const stepWrap = document.createElement("div");
  stepWrap.className = "planner-step";

  if(currentStep === 1){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 1 OF ${TOTAL_STEPS}</div><h3>What kind of business is this for?</h3>`;
    stepWrap.appendChild(optButtons(BUSINESS_TYPES, state.businessType, v=>state.businessType=v));
  }
  else if(currentStep === 2){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 2 OF ${TOTAL_STEPS}</div><h3>What are you looking to build?</h3>`;
    stepWrap.appendChild(optButtons(PROJECT_TYPES.map(p=>p.n), state.projectType, v=>state.projectType=v));
  }
  else if(currentStep === 3){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 3 OF ${TOTAL_STEPS}</div><h3>Pick a design direction</h3><p style="color:var(--text-ink-mid);margin-bottom:18px;">Selecting here updates your choice in the Design Style gallery above.</p>`;
    const grid = document.createElement("div");
    grid.className = "opt-grid style-selector-grid";
    DESIGN_STYLES.forEach((s,i)=>{
      const btn = document.createElement("button");
      btn.className = "opt-btn" + (state.styleIndex === i ? " selected":"");
      btn.type = "button";
      btn.innerHTML = `
        <div class="style-preview">
          <div class="style-mini">${createStyleMiniature(s.n, s.g)}</div>
          <div class="style-info">
            <h4>${s.n}</h4>
            <p>${s.d}</p>
          </div>
        </div>
      `;

      // Accessibility attributes
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", state.styleIndex === i ? "true" : "false");
      btn.setAttribute("aria-label", `Select ${s.n} design style`);

      btn.addEventListener("click", ()=>{
        state.styleIndex = i;
        renderStyles();
        savePlannerState(); // Save state when selection changes
        renderPlannerStep();
      });

      // Keyboard accessibility
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          state.styleIndex = i;
          renderStyles();
          savePlannerState();
          renderPlannerStep();
        }
      });

      grid.appendChild(btn);
    });
    stepWrap.appendChild(grid);
  }
  else if(currentStep === 4){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 4 OF ${TOTAL_STEPS}</div><h3>Which features do you need?</h3>`;
    const grid = document.createElement("div");
    grid.className = "opt-grid feature-selector-grid";
    FEATURE_OPTIONS.forEach((f, index)=>{
      const on = state.features.includes(f);
      const btn = document.createElement("button");
      btn.className = "opt-btn" + (on ? " selected":"");
      btn.type = "button";
      btn.textContent = f;

      // Accessibility attributes
      btn.setAttribute("role", "checkbox");
      btn.setAttribute("aria-checked", on ? "true" : "false");
      btn.setAttribute("aria-label", `${on ? "Unselect" : "Select"} ${f} feature`);

      btn.addEventListener("click", ()=>{
        if(on) {
          state.features = state.features.filter(x=>x!==f);
        } else {
          state.features.push(f);
        }
        savePlannerState(); // Save state when selection changes
        renderPlannerStep();
      });

      // Keyboard accessibility
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          if(on) {
            state.features = state.features.filter(x=>x!==f);
          } else {
            state.features.push(f);
          }
          savePlannerState();
          renderPlannerStep();
        }
      });

      grid.appendChild(btn);
    });
    stepWrap.appendChild(grid);
  }
  else if(currentStep === 5){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 5 OF ${TOTAL_STEPS}</div><h3>Tell me about your business</h3>`;
    const form = document.createElement("div");
    form.innerHTML = `
      <div class="form-field">
        <label for="f-bname">Business Name *</label>
        <input type="text" id="f-bname" value="${state.business.name || ''}" placeholder="Enter your business name">
        <div class="form-error" id="f-bname-error" role="alert"></div>
      </div>
      <div class="form-field">
        <label for="f-oname">Owner Name *</label>
        <input type="text" id="f-oname" value="${state.business.owner || ''}" placeholder="Enter your name">
        <div class="form-error" id="f-oname-error" role="alert"></div>
      </div>
      <div class="form-field">
        <label for="f-phone">Phone Number *</label>
        <input type="tel" id="f-phone" value="${state.business.phone || ''}" placeholder="Enter your 10-digit mobile number">
        <div class="form-error" id="f-phone-error" role="alert"></div>
      </div>
      <div class="form-field">
        <label for="f-email">Email Address *</label>
        <input type="email" id="f-email" value="${state.business.email || ''}" placeholder="Enter your email address">
        <div class="form-error" id="f-email-error" role="alert"></div>
      </div>
      <div class="form-field">
        <label for="f-loc">Business Location</label>
        <input type="text" id="f-loc" value="${state.business.location || ''}" placeholder="Enter your business location (optional)">
        <div class="form-error" id="f-loc-error" role="alert"></div>
      </div>
      <div class="form-field">
        <label for="f-web">Website / Instagram</label>
        <input type="text" id="f-web" value="${state.business.web || ''}" placeholder="Enter your website or Instagram (optional)">
        <div class="form-error" id="f-web-error" role="alert"></div>
      </div>
      <div class="form-field">
        <label for="f-notes">Additional Requirements</label>
        <textarea id="f-notes" placeholder="Any additional requirements or details about your project...">${state.business.notes || ''}</textarea>
        <div class="form-error" id="f-notes-error" role="alert"></div>
      </div>
    `;
    stepWrap.appendChild(form);

    // Add event listeners for validation on blur and on attempt to proceed
    setTimeout(()=>{
      const bnameInput = document.getElementById("f-bname");
      const onameInput = document.getElementById("f-oname");
      const phoneInput = document.getElementById("f-phone");
      const emailInput = document.getElementById("f-email");
      const locInput = document.getElementById("f-loc");
      const webInput = document.getElementById("f-web");
      const notesInput = document.getElementById("f-notes");

      // Validation function for business info step
      const validateBusinessInfo = () => {
        // Validate each field using enhanced validation functions
        const bnameResult = validateRequired(bnameInput.value, "Business Name");
        const onameResult = validateRequired(onameInput.value, "Owner Name");
        const phoneResult = validatePhone(phoneInput.value);
        const emailResult = validateEmail(emailInput.value);
        // Location is optional, but validate if provided
        const locResult = locInput.value.trim() === ''
          ? { valid: true, message: "", normalized: "" }
          : validateRequired(locInput.value, "Business Location");
        const webResult = { valid: true, message: "", normalized: webInput.value.trim() }; // Optional
        const notesResult = { valid: true, message: "", normalized: notesInput.value.trim() }; // Optional

        // Show errors with accessibility attributes
        bnameInput.setAttribute("aria-invalid", bnameResult.valid ? "false" : "true");
        bnameInput.setAttribute("aria-describedby", "f-bname-error");
        document.getElementById("f-bname-error").textContent = bnameResult.message;

        onameInput.setAttribute("aria-invalid", onameResult.valid ? "false" : "true");
        onameInput.setAttribute("aria-describedby", "f-oname-error");
        document.getElementById("f-oname-error").textContent = onameResult.message;

        phoneInput.setAttribute("aria-invalid", phoneResult.valid ? "false" : "true");
        phoneInput.setAttribute("aria-describedby", "f-phone-error");
        document.getElementById("f-phone-error").textContent = phoneResult.message;

        emailInput.setAttribute("aria-invalid", emailResult.valid ? "false" : "true");
        emailInput.setAttribute("aria-describedby", "f-email-error");
        document.getElementById("f-email-error").textContent = emailResult.message;

        locInput.setAttribute("aria-invalid", locResult.valid ? "false" : "true");
        locInput.setAttribute("aria-describedby", "f-loc-error");
        document.getElementById("f-loc-error").textContent = locResult.message;

        webInput.setAttribute("aria-invalid", webResult.valid ? "false" : "true");
        webInput.setAttribute("aria-describedby", "f-web-error");
        document.getElementById("f-web-error").textContent = webResult.message;

        notesInput.setAttribute("aria-invalid", notesResult.valid ? "false" : "true");
        notesInput.setAttribute("aria-describedby", "f-notes-error");
        document.getElementById("f-notes-error").textContent = notesResult.message;

        // Add/remove error classes for visual feedback
        bnameInput.classList.toggle("input-error", !bnameResult.valid);
        onameInput.classList.toggle("input-error", !onameResult.valid);
        phoneInput.classList.toggle("input-error", !phoneResult.valid);
        emailInput.classList.toggle("input-error", !emailResult.valid);
        locInput.classList.toggle("input-error", !locResult.valid);
        webInput.classList.toggle("input-error", !webResult.valid);
        notesInput.classList.toggle("input-error", !notesResult.valid);

        // Check if Custom Feature is selected and requires explanation in notes
        const customFeatureSelected = state.features.includes("Custom Feature");
        const notesHaveContent = notesInput.value.trim() !== '';

        let customFeatureValid = { valid: true, message: "" };
        if (customFeatureSelected && !notesHaveContent) {
          customFeatureValid = {
            valid: false,
            message: "Please describe your custom feature requirements in the Additional Requirements field."
          };
          notesInput.setAttribute("aria-invalid", "true");
          notesInput.setAttribute("aria-describedby", "f-notes-error");
          // Append to existing notes error or create new one
          const currentNotesError = document.getElementById("f-notes-error").textContent;
          document.getElementById("f-notes-error").textContent =
            currentNotesError ? currentNotesError + " " + customFeatureValid.message
                              : customFeatureValid.message;
          notesInput.classList.add("input-error");
        }

        // Save state if all required fields are valid
        const allValid = bnameResult.valid && onameResult.valid && phoneResult.valid &&
                        emailResult.valid && locResult.valid && webResult.valid &&
                        notesResult.valid && customFeatureValid.valid;

        if (allValid) {
          // Apply normalized values to state
          state.business.name = bnameResult.normalized || bnameInput.value.trim();
          state.business.owner = onameResult.normalized || onameInput.value.trim();
          state.business.phone = phoneResult.normalized || phoneInput.value.trim();
          state.business.email = emailResult.normalized || emailInput.value.trim().toLowerCase();
          state.business.location = locResult.normalized || locInput.value.trim();
          state.business.web = webResult.normalized || webInput.value.trim();
          state.business.notes = notesResult.normalized || notesInput.value.trim();
          savePlannerState();
        }

        return allValid;
      };

      // Add blur event listeners for validation when user leaves field
      bnameInput.addEventListener("blur", validateBusinessInfo);
      onameInput.addEventListener("blur", validateBusinessInfo);
      phoneInput.addEventListener("blur", validateBusinessInfo);
      emailInput.addEventListener("blur", validateBusinessInfo);
      locInput.addEventListener("blur", validateBusinessInfo);
      webInput.addEventListener("blur", validateBusinessInfo);
      notesInput.addEventListener("blur", validateBusinessInfo);

      // Initial validation
      validateBusinessInfo();
    },0);
  }
  else if(currentStep === 6){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 6 OF ${TOTAL_STEPS}</div><h3>What's your budget range?</h3>`;
    stepWrap.appendChild(optButtons(BUDGET_OPTIONS, state.budget, v=>state.budget=v));
  }
  else if(currentStep === 7){
    stepWrap.innerHTML = `<div class="planner-step-label">STEP 7 OF ${TOTAL_STEPS}</div><h3>Deployment & Hosting</h3><p style="color:var(--text-ink-mid);margin-bottom:18px;">Where would you like your website/application deployed? Hosting/platform charges and my deployment/setup fee are always shown separately.</p>`;

    // Hosting options with detailed information
    const hostingOptions = [
      { key: "netlify", label: "Netlify" },
      { key: "vercel", label: "Vercel" },
      { key: "render", label: "Render" },
      { key: "cloudflare", label: "Cloudflare Pages" },
      { key: "firebase", label: "Firebase" },
      { key: "supabase", label: "Supabase" },
      { key: "cloudrun", label: "Google Cloud / Cloud Run" },
      { key: "existing", label: "I already have hosting" },
      { key: "unsure", label: "I'm not sure — recommend one" }
    ];

    const hostingGrid = document.createElement("div");
    hostingGrid.className = "hosting-options-grid";

    hostingOptions.forEach(option => {
      const key = option.key;
      const isSelected = state.deployChoice === key;
      const btn = document.createElement("button");
      btn.className = "hosting-opt-btn" + (isSelected ? " selected":"");
      btn.type = "button";

      // Get platform info
      const platformInfo = DEPLOY_PLATFORMS[key] || {
        name: option.label,
        best: "",
        cost: "",
        fee: "",
        note: ""
      };

      btn.innerHTML = `
        <div class="hosting-option-content">
          <div class="hosting-option-header">
            <h4>${platformInfo.name}</h4>
            ${isSelected ? '<span class="selected-badge">Selected</span>' : ''}
          </div>
          <div class="hosting-option-details">
            <p><strong>Best for:</strong> ${platformInfo.best}</p>
            <p><strong>Hosting/Platform Cost:</strong> ${platformInfo.cost}</p>
            <p><strong>JITEN LABS Setup Fee:</strong> ${platformInfo.fee}</p>
          </div>
          ${platformInfo.note ? `<p class="hosting-note">${platformInfo.note}</p>` : ''}
        </div>
      `;

      // Accessibility attributes - these are radio buttons (mutually exclusive)
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", isSelected ? "true" : "false");
      btn.setAttribute("aria-label", `Select ${platformInfo.name} hosting option`);

      btn.addEventListener("click", ()=>{
        state.deployChoice = key;
        savePlannerState(); // Save state when selection changes
        renderPlannerStep();
      });

      // Keyboard accessibility
      btn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          state.deployChoice = key;
          savePlannerState();
          renderPlannerStep();
        }
      });

      hostingGrid.appendChild(btn);
    });

    stepWrap.appendChild(hostingGrid);

    // Show recommendation if user selected "I'm not sure — recommend one"
    if (state.deployChoice === "unsure") {
      const key = recommendedPlatformFor();
      if (key && DEPLOY_PLATFORMS[key]) {
        const d = DEPLOY_PLATFORMS[key];
        const recommendationBox = document.createElement("div");
        recommendationBox.className = "hosting-recommendation-box";
        recommendationBox.innerHTML = `
          <div class="recommendation-header">
            <h4>Our Recommendation Based on Your Project</h4>
            <p style="color:var(--text-ink-mid);font-size:0.9rem;">Based on your project requirements, we suggest:</p>
          </div>
          <div class="recommendation-details">
            <div class="row"><span>Platform</span><span>${d.name}</span></div>
            <div class="row"><span>Best for</span><span>${d.best}</span></div>
            <div class="row"><span>Hosting Cost</span><span>${d.cost}</span></div>
            <div class="row"><span>JITEN LABS Setup Fee</span><span>${d.fee}</span></div>
            <div class="row"><span>Domain</span><span>Separate (billed at registrar's current price)</span></div>
            <p class="disclaimer">*Subject to the platform's current pricing and usage limits. ${d.note}</p>
            <p style="margin-top:12px;color:var(--text-ink-mid);font-size:0.9rem;">
              <strong>Note:</strong> This is just a suggestion — you can still manually select any other option above if you prefer a different provider.
            </p>
          </div>
        `;
        stepWrap.appendChild(recommendationBox);
      }
    }
  }

  area.appendChild(stepWrap);

  // nav buttons
  const nav = document.createElement("div");
  nav.className = "planner-nav";
  const backBtn = document.createElement("button");
  backBtn.className = "btn-plain"; backBtn.textContent = "Back"; backBtn.disabled = currentStep===1;
  backBtn.addEventListener("click", ()=>{
    currentStep = Math.max(1,currentStep-1);
    renderPlannerStep();
  });
  nav.appendChild(backBtn);

  // Determine if we can proceed to next step
  let canProceed = true;
  if (currentStep === 1) {
    canProceed = !!state.businessType;
  } else if (currentStep === 2) {
    canProceed = !!state.projectType;
  } else if (currentStep === 3) {
    canProceed = state.styleIndex !== null;
  } else if (currentStep === 4) {
    canProceed = state.features.length > 0;
  } else if (currentStep === 5) {
    // Validate business info using enhanced validation functions
    const bnameResult = validateRequired(state.business.name, "Business Name");
    const onameResult = validateRequired(state.business.owner, "Owner Name");
    const phoneResult = validatePhone(state.business.phone);
    const emailResult = validateEmail(state.business.email);
    // Location is optional, but validate if provided
    const locResult = state.business.location.trim() === ''
      ? { valid: true, message: "" }
      : validateRequired(state.business.location, "Business Location");

    // Check if Custom Feature is selected and requires explanation in notes
    const customFeatureSelected = state.features.includes("Custom Feature");
    const notesHaveContent = state.business.notes.trim() !== '';
    let customFeatureValid = { valid: true, message: "" };
    if (customFeatureSelected && !notesHaveContent) {
      customFeatureValid = {
        valid: false,
        message: "Please describe your custom feature requirements in the Additional Requirements field."
      };
    }

    canProceed = bnameResult.valid && onameResult.valid && phoneResult.valid &&
                 emailResult.valid && locResult.valid && customFeatureValid.valid;
  } else if (currentStep === 6) {
    canProceed = !!state.budget;
  } else if (currentStep === 7) {
    canProceed = !!state.deployChoice;
  }

  if(currentStep < TOTAL_STEPS){
    const nextBtn = document.createElement("button");
    nextBtn.className = "cta-btn" + (canProceed ? "" : " disabled");
    nextBtn.style.border="none";
    nextBtn.textContent = "Next";
    nextBtn.disabled = !canProceed;
    if (canProceed) {
      nextBtn.addEventListener("click", ()=>{
        currentStep = Math.min(TOTAL_STEPS,currentStep+1);
        renderPlannerStep();
        window.scrollTo({top: document.getElementById('planner').offsetTop - 90, behavior:'smooth'});
      });
    }
    nav.appendChild(nextBtn);
  }
  area.appendChild(nav);
}

/* ============================================================
   UI BUILDERS (moved from data.js since they create DOM elements)
   ============================================================ */
function buildSummaryDOM(){
  const wrap = document.createElement("div");
  const styleName = state.styleIndex !== null ? DESIGN_STYLES[state.styleIndex].n : "Not selected yet";
  const deployKey = state.deployChoice ? recommendedPlatformFor() : null;
  const deployInfo = deployKey && DEPLOY_PLATFORMS[deployKey] ? DEPLOY_PLATFORMS[deployKey] : null;

  wrap.innerHTML = `
    <div class="summary-block">
      <h4>Project</h4>
      <div class="row"><span>Business Type</span><span>${state.businessType || "—"}</span></div>
      <div class="row"><span>Project Type</span><span>${state.projectType || "—"}</span></div>
      <div class="row"><span>Preferred Design</span><span>${styleName}${state.aiConcept ? " + AI Concept" : ""}</span></div>
      <div class="row"><span>Selected Features</span><span>${state.features.length ? state.features.join(", ") : "—"}</span></div>
      <div class="row"><span>Budget</span><span>${state.budget || "—"}</span></div>
      <div class="row"><span>Estimated Starting Package</span><span>${estimatePackage()}</span></div>
    </div>
    <div class="summary-block">
      <h4>Business Information</h4>
      <div class="row"><span>Business Name</span><span>${state.business.name || "—"}</span></div>
      <div class="row"><span>Owner</span><span>${state.business.owner || "—"}</span></div>
      <div class="row"><span>Phone</span><span>${state.business.phone || "—"}</span></div>
      <div class="row"><span>Email</span><span>${state.business.email || "—"}</span></div>
      <div class="row"><span>Location</span><span>${state.business.location || "—"}</span></div>
      <div class="row"><span>Website/Instagram</span><span>${state.business.web || "—"}</span></div>
    </div>
    ${state.business.notes ? `<div class="summary-block"><h4>Additional Requirements</h4><p style="font-size:0.92rem;">${state.business.notes}</p></div>` : ""}
    <div class="summary-block">
      <h4>Deployment</h4>
      ${state.deployChoice === "existing" ? `
        <div class="row"><span>Hosting Selection</span><span>I already have hosting</span></div>
        <p style="font-size:0.92rem;color:var(--text-ink-mid);">Hosting details to be provided during consultation.</p>
      ` : state.deployChoice === "unsure" ? `
        <div class="row"><span>Hosting Preference</span><span>I'm not sure — recommend one</span></div>
        ${deployInfo ?
          `
          <div class="row"><span>Suggested Platform</span><span>${deployInfo.name}</span></div>
          <div class="row"><span>Hosting</span><span>${deployInfo.cost}</span></div>
          <div class="row"><span>Deployment & Setup Fee</span><span>${deployInfo.fee}</span></div>
          <div class="row"><span>Domain</span><span>Not included — billed separately</span></div>
          <p class="disclaimer">*Subject to the platform's current pricing and usage limits.</p>
          <p style="margin-top:8px;color:var(--text-ink-mid);font-size:0.9rem;">
            <em>This is a suggestion based on your project — you can select any hosting provider.</em>
          </p>
          ` : `
          <p style="font-size:0.92rem;color:var(--text-ink-mid);">No recommendation available yet</p>
          `}
` : state.deployChoice && DEPLOY_PLATFORMS[state.deployChoice] ? `
        <div class="row"><span>Selected Platform</span><span>${DEPLOY_PLATFORMS[state.deployChoice].name}</span></div>
        <div class="row"><span>Hosting</span><span>${DEPLOY_PLATFORMS[state.deployChoice].cost}</span></div>
        <div class="row"><span>Deployment & Setup Fee</span><span>${DEPLOY_PLATFORMS[state.deployChoice].fee}</span></div>
        <div class="row"><span>Domain</span><span>Not included — billed separately</span></div>
        <p class="disclaimer">*Subject to the platform's current pricing and usage limits.</p>
      ` : `<p style="font-size:0.92rem;color:var(--text-ink-mid);">Not selected yet — go back to Step 7.</p>`}
    </div>
    <p class="disclaimer">Estimated pricing is based on the information provided. Final pricing is confirmed after reviewing the complete project requirements. Third-party hosting, domain, API and cloud service charges are separate from development and deployment service fees unless explicitly included in the quotation.</p>
  `;
  return wrap;
}

function buildAIPreviewDOM(){
  const wrap = document.createElement("div");
  wrap.className = "ai-preview-box";
  wrap.innerHTML = `
    <h3 style="font-size:1.1rem;">Visualize Your Website Before We Build It</h3>
    <p style="color:var(--text-ink-mid);font-size:0.92rem;margin-top:8px;">Generate a visual concept direction based on your business, selected style and requirements.</p>
    <div id="aiConceptOutput"></div>
    <div class="action-row">
      <button id="genConceptBtn" class="cta-btn" style="border:none;">Generate Concept</button>
      <button id="useDirectionBtn" class="ghost-btn on-light" style="color:var(--text-ink);border-color:var(--paper-line);display:${state.aiConcept ? 'inline-block':'none'};">Use This Direction</button>
    </div>
  `;
  setTimeout(()=>{
    renderAIConceptOutput();
    document.getElementById("genConceptBtn").addEventListener("click", ()=>{
      generateConcept();
      renderAIConceptOutput();
    });
    document.getElementById("useDirectionBtn").addEventListener("click", ()=>{
      state.aiConcept.used = true;
      renderPlannerStep();
    });
  },0);
  return wrap;
}

function generateConcept(){
  const style = state.styleIndex !== null ? DESIGN_STYLES[state.styleIndex] : DESIGN_STYLES[19];
  state.aiConcept = {
    style: style.n,
    palette: style.g,
    used:false,
    blurb:`A ${style.n.toLowerCase()} direction for ${state.business.name || "your business"}${state.businessType ? " ("+state.businessType+")" : ""}, built around ${state.features.length ? state.features.slice(0,3).join(", ") : "your core features"}.`
  };
}

function renderAIConceptOutput(){
  const out = document.getElementById("aiConceptOutput");
  if(!out) return;
  if(!state.aiConcept){
    out.innerHTML = `<p style="font-size:0.86rem;color:var(--text-dim);margin-top:14px;">AI preview is currently running in offline/fallback mode — your project planner still works fully without it.</p>`;
    return;
  }
  const c = state.aiConcept;
  out.innerHTML = `
    <div class="ai-concept-card" style="background:linear-gradient(135deg, ${c.palette[0]}, ${c.palette[1]});">
      <span class="badge">CONCEPT</span>
      <h4>${c.style} direction${c.used ? " — Selected" : ""}</h4>
      <div class="palette">${c.palette.map(col=>`<div class="swatch" style="background:${col};"></div>`).join("")}</div>
      <p>${c.blurb}</p>
      <p style="font-size:0.76rem;margin-top:14px;opacity:0.85;">AI-generated concept for visual direction only. The final website design may differ after consultation and implementation.</p>
    </div>
  `;
  const useBtn = document.getElementById("useDirectionBtn");
  if(useBtn) useBtn.style.display = "inline-block";
}

function isPlannerValidForSubmission() {
  // Check if all required planner steps have valid data
  if (!state.businessType) return false;
  if (!state.projectType) return false;
  if (state.styleIndex === null) return false;
  if (state.features.length === 0) return false;

  // Validate business information
  const bnameResult = validateRequired(state.business.name, "Business Name");
  const onameResult = validateRequired(state.business.owner, "Owner Name");
  const phoneResult = validatePhone(state.business.phone);
  const emailResult = validateEmail(state.business.email);

  // Location is optional, but validate if provided
  const locResult = state.business.location.trim() === ''
    ? { valid: true, message: "" }
    : validateRequired(state.business.location, "Business Location");

  // Check if Custom Feature is selected and requires explanation in notes
  const customFeatureSelected = state.features.includes("Custom Feature");
  const notesHaveContent = state.business.notes.trim() !== '';
  let customFeatureValid = { valid: true, message: "" };
  if (customFeatureSelected && !notesHaveContent) {
    customFeatureValid = {
      valid: false,
      message: "Please describe your custom feature requirements in the Additional Requirements field."
    };
  }

  return bnameResult.valid && onameResult.valid && phoneResult.valid &&
         emailResult.valid && locResult.valid && customFeatureValid.valid &&
         !!state.budget && !!state.deployChoice;
}

function buildFinalActionsDOM(){
  const wrap = document.createElement("div");
  const isValid = isPlannerValidForSubmission();

  wrap.innerHTML = `
    <div class="summary-block">
      <h4>Send Your Requirements</h4>
      <div class="whatsapp-preview" id="waPreview"></div>
      <div class="final-actions">
        <a id="waSendBtn" href="#" target="_blank" rel="noopener" class="cta-btn ${isValid ? '' : 'disabled'}">Send Requirements on WhatsApp</a>
        <button id="copyReqBtn" class="ghost-btn on-light ${isValid ? '' : 'disabled'}" style="color:var(--text-ink);border-color:var(--paper-line);">Copy Requirements</button>
        <a id="emailSendBtn" href="#" class="ghost-btn on-light ${isValid ? '' : 'disabled'}" style="color:var(--text-ink);border-color:var(--paper-line);">Send via Email</a>
        <button id="pdfBtn" class="ghost-btn on-light ${isValid ? '' : 'disabled'}" style="color:var(--text-ink);border-color:var(--paper-line);">Download Project Proposal (PDF)</button>
      </div>
      <p class="disclaimer" id="copyStatus" role="status"></p>
      ${!isValid ? '<p style="color:var(--text-ink-mid);font-size:0.9rem;margin-top:12px;">Please complete all required steps before sending your requirements.</p>' : ''}
    </div>
  `;
  setTimeout(()=>{
    // Only enable actions if planner is valid
    if (isValid) {
      const msg = buildWhatsAppMessage();
      document.getElementById("waPreview").textContent = msg;
      document.getElementById("waSendBtn").href = `https://wa.me/917675023149?text=${encodeURIComponent(msg)}`;
      document.getElementById("emailSendBtn").href = `mailto:jiten.freelance@gmail.com?subject=${encodeURIComponent("New Project Requirement — "+(state.business.name||"Untitled"))}&body=${encodeURIComponent(msg)}`;

      document.getElementById("copyReqBtn").addEventListener("click", async ()=>{
        try{
          await navigator.clipboard.writeText(msg);
          document.getElementById("copyStatus").textContent = "Copied to clipboard.";
        }
        catch(e){
          document.getElementById("copyStatus").textContent = "Couldn't copy automatically — please select and copy the text above.";
        }
      });

      document.getElementById("pdfBtn").addEventListener("click", generateProposalPDF);
    }
  },0);
  return wrap;
}

/* ============================================================
   PDF PROPOSAL GENERATION (jsPDF)
   ============================================================ */
function generateProposalPDF(){
  const status = document.getElementById("copyStatus");
  try{
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF({ unit:"pt", format:"a4" });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const margin = 54;
    let y = 0;

    const NAVY = [10,10,12], BLUE=[201,169,106], VIOLET=[138,110,60], INK=[20,24,38], MUTE=[110,118,150];

    function watermark(){
      doc.saveGraphicsState();
      doc.setGState(new doc.GState({opacity:0.05}));
      doc.setFont("helvetica","bold");
      doc.setFontSize(84);
      doc.setTextColor(20,24,38);
      doc.text("JITEN KUMAR", pageW/2, pageH/2, {angle:35, align:"center"});
      doc.restoreGraphicsState();
    }
    function footer(pageNum){
      doc.setFontSize(8.5); doc.setTextColor(...MUTE); doc.setFont("helvetica","normal");
      doc.text("JITEN LABS — Digital Solutions", margin, pageH-28);
      doc.text(`Page ${pageNum}`, pageW-margin, pageH-28, {align:"right"});
    }
    function header(title){
      doc.setFillColor(...NAVY); doc.rect(0,0,pageW,64,"F");
      doc.setFont("helvetica","bold"); doc.setFontSize(13); doc.setTextColor(255,255,255);
      doc.text("JITEN LABS", margin, 38);
      doc.setFont("helvetica","normal"); doc.setFontSize(9); doc.setTextColor(200,206,230);
      doc.text("Jiten Kumar — Digital Solutions", margin, 52);
      doc.setFont("helvetica","bold"); doc.setFontSize(11); doc.setTextColor(255,255,255);
      doc.text(title, pageW-margin, 45, {align:"right"});
      y = 96;
    }
    function sectionTitle(t){
      if(y > pageH-100){ doc.addPage(); watermark(); y = 60; }
      doc.setFont("helvetica","bold"); doc.setFontSize(12.5); doc.setTextColor(...NAVY);
      doc.text(t, margin, y);
      doc.setDrawColor(...BLUE); doc.setLineWidth(1.4);
      doc.line(margin, y+6, margin+34, y+6);
      y += 24;
    }
    function row(label, value){
      if(y > pageH-80){ doc.addPage(); watermark(); y = 60; }
      doc.setFont("helvetica","bold"); doc.setFontSize(9.5); doc.setTextColor(...MUTE);
      doc.text(label, margin, y);
      doc.setFont("helvetica","normal"); doc.setFontSize(10.5); doc.setTextColor(...INK);
      const lines = doc.splitTextToSize(String(value||"—"), pageW - margin*2 - 170);
      doc.text(lines, margin+170, y);
      y += Math.max(16, lines.length*13) + 6;
    }
    function paragraph(text){
      if(y > pageH-100){ doc.addPage(); watermark(); y = 60; }
      doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(...INK);
      const lines = doc.splitTextToSize(text, pageW - margin*2);
      doc.text(lines, margin, y);
      y += lines.length*13 + 14;
    }

    // ---- COVER PAGE ----
    doc.setFillColor(...NAVY); doc.rect(0,0,pageW,pageH,"F");
    // JK mark
    doc.setFillColor(...BLUE); doc.roundedRect(margin, 70, 26, 60, 4, 4, "F");
    doc.setFillColor(...VIOLET); doc.roundedRect(margin+34, 70, 26, 60, 4, 4, "F");
    doc.setFont("helvetica","bold"); doc.setFontSize(20); doc.setTextColor(255,255,255);
    doc.text("JITEN LABS", margin, 158);
    doc.setFont("helvetica","normal"); doc.setFontSize(11); doc.setTextColor(190,198,224);
    doc.text("Jiten Kumar — Digital Solutions", margin, 178);

    doc.setFont("helvetica","bold"); doc.setFontSize(34); doc.setTextColor(255,255,255);
    doc.text("PROJECT PROPOSAL", margin, pageH/2 - 20);

    doc.setDrawColor(120,140,220); doc.setLineWidth(0.7);
    doc.line(margin, pageH/2, pageW-margin, pageH/2);

    doc.setFont("helvetica","normal"); doc.setFontSize(11); doc.setTextColor(210,215,235);
    doc.text(`Business Name:  ${state.business.name || "—"}`, margin, pageH/2 + 34);
    doc.text(`Project Type:  ${state.projectType || "—"}`, margin, pageH/2 + 54);
    doc.text(`Date:  ${new Date().toLocaleDateString("en-IN",{year:'numeric',month:'long',day:'numeric'})}`, margin, pageH/2 + 74);

    doc.setFontSize(9); doc.setTextColor(150,158,190);
    doc.text("jiten.freelance@gmail.com   ·   +91 76750 23149", margin, pageH-50);

    // ---- PAGE 2: Overview + Business Info ----
    doc.addPage(); watermark(); header("Project Proposal");
    sectionTitle("1. Project Overview");
    paragraph(`This proposal outlines the recommended approach for building a ${(state.projectType||'digital solution').toLowerCase()} for ${state.business.name || 'your business'}, based on the requirements gathered through the JITEN LABS project planner.`);

    sectionTitle("2. Business Information");
    row("Business Name", state.business.name);
    row("Owner Name", state.business.owner);
    row("Business Type", state.businessType);
    row("Phone", state.business.phone);
    row("Email", state.business.email);
    row("Location", state.business.location);
    row("Website / Instagram", state.business.web);

    sectionTitle("3. Project Type");
    row("Selected Project Type", state.projectType);

    sectionTitle("4. Preferred Design Style");
    const styleName = state.styleIndex !== null ? DESIGN_STYLES[state.styleIndex].n : "Not selected";
    row("Design Direction", styleName);
    if(state.aiConcept && state.aiConcept.used){
      row("AI Visual Direction", state.aiConcept.blurb + " (AI-generated concept for visual direction only.)");
    }

    sectionTitle("5. Selected Features");
    paragraph(state.features.length ? state.features.join(", ") : "No specific features selected yet — to be finalized during consultation.");

    footer(2);

    // ---- PAGE 3: Requirements, Pricing, Workflow ----
    doc.addPage(); watermark(); header("Project Proposal");
    sectionTitle("6. Client Requirements");
    paragraph(state.business.notes || "No additional requirements provided.");

    sectionTitle("7. Estimated Starting Package");
    paragraph(estimatePackage());
    paragraph("Final pricing is confirmed after reviewing the complete requirements and project scope.");

    sectionTitle("8. Project Vision");
    paragraph(`A ${styleName.toLowerCase()} digital presence for ${state.business.name || 'the business'}, focused on ${state.businessType ? state.businessType.toLowerCase()+' customers' : 'the target audience'} and built to convert visitors into real inquiries and sales.`);

    sectionTitle("9. Proposed Workflow");
    ["01  Understand business goals and requirements","02  Confirm design direction and content",
     "03  Design and build the website/application","04  Review, refine and test across devices",
     "05  Deploy, connect domain, and launch","06  Handover with optional ongoing support"].forEach(step=>{
      doc.setFont("helvetica","normal"); doc.setFontSize(10); doc.setTextColor(...INK);
      if(y > pageH-80){ doc.addPage(); watermark(); y=60; }
      doc.text(step, margin, y); y += 18;
    });
    y += 8;

    footer(3);

    // ---- PAGE 4: Deployment, Next steps, Contact ----
    doc.addPage(); watermark(); header("Project Proposal");

    sectionTitle("10. Deployment & Hosting");
    if(state.deployChoice === "existing"){
      row("Hosting Selection", "I already have hosting");
      paragraph("Hosting details to be provided during consultation. Hosting, domain registration and third-party platform charges are separate from development and deployment service fees unless explicitly included in the quotation.");
    } else if(state.deployChoice === "unsure"){
      const deployKey = recommendedPlatformFor();
      const deployInfo = deployKey && DEPLOY_PLATFORMS[deployKey] ? DEPLOY_PLATFORMS[deployKey] : null;
      if(deployInfo){
        row("Hosting Preference", "I'm not sure — recommend one");
        row("Suggested Platform", deployInfo.name);
        row("Hosting Tier / Cost", deployInfo.cost);
        row("Deployment Setup Fee", deployInfo.fee);
        row("Domain Cost", "Not included — billed separately at registrar's current price");
        row("Estimated Recurring Cost", deployInfo.cost);
        paragraph("Note: Hosting, domain registration and third-party platform charges are separate from development and deployment service fees unless explicitly included in the quotation. *Subject to the platform's current pricing and usage limits.");
      } else {
        row("Hosting Preference", "I'm not sure — recommend one");
        paragraph("No recommendation available yet. Hosting, domain and platform charges will always be itemized separately from development and deployment service fees.");
      }
    } else if(state.deployChoice && DEPLOY_PLATFORMS[state.deployChoice]){
      const deployInfo = DEPLOY_PLATFORMS[state.deployChoice];
      row("Selected Platform", deployInfo.name);
      row("Hosting Tier / Cost", deployInfo.cost);
      row("Deployment Setup Fee", deployInfo.fee);
      row("Domain Cost", "Not included — billed separately at registrar's current price");
      row("Estimated Recurring Cost", deployInfo.cost);
      paragraph("Note: Hosting, domain registration and third-party platform charges are separate from development and deployment service fees unless explicitly included in the quotation. *Subject to the platform's current pricing and usage limits.");
    } else {
      paragraph("Deployment platform not selected yet. Hosting, domain and platform charges will always be itemized separately from development and deployment service fees.");
    }

    sectionTitle("11. Next Steps");
    paragraph("Reply on WhatsApp or email to confirm scope and timeline. Once confirmed, a formal quotation and project timeline will be shared before work begins.");

    sectionTitle("12. Contact Information");
    row("Name", "Jiten Kumar");
    row("Phone / WhatsApp", "+91 76750 23149");
    row("Email", "jiten.freelance@gmail.com");

    paragraph("Final pricing is confirmed after reviewing the complete requirements and project scope.");
  }catch(err){
    console.error(err);
    if(status) status.textContent = "Unable to generate the proposal right now. Please try again.";
  }
}

// Active link highlighting based on scroll position
function setActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a[href^="#"]');

  let currentSectionId = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollPosition >= sectionTop - 100 && scrollPosition < sectionTop + sectionHeight - 100) {
      currentSectionId = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSectionId}`) {
      link.classList.add('active');
    }
  });
}

// Add active class to CSS for active nav links
// We'll add this via JavaScript to avoid modifying CSS file
const navStyle = document.createElement('style');
navStyle.textContent = `
  .site-nav a.active {
    color: var(--text-hi) !important;
  }
  .site-nav a.active::before,
  .site-nav a.active::after {
    transform: scaleX(1) !important;
  }
`;
document.head.appendChild(navStyle);

// Update active link on scroll and load
window.addEventListener('scroll', setActiveNavLink);
window.addEventListener('load', setActiveNavLink);

// Subtle parallax effect for hero device mockups
function initHeroParallax() {
  const deviceStack = document.querySelector('.device-stack');
  if (!deviceStack) return;

  const deviceBrowser = deviceStack.querySelector('.device-browser');
  const devicePhone = deviceStack.querySelector('.device-phone');

  if (!deviceBrowser || !devicePhone) return;

  let ticking = false;

  function updateParallax() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const heroTop = heroSection.offsetTop;
    const heroHeight = heroSection.offsetHeight;
    const scrollProgress = (scrollPosition - heroTop) / heroHeight;

    // Limit parallax to hero section only
    if (scrollProgress < 0 || scrollProgress > 1) return;

    // Subtle parallax movement - devices move slightly opposite to scroll
    const parallaxAmount = scrollProgress * 20; // 20px max movement

    // Apply transforms
    deviceBrowser.style.transform = `translateY(${-parallaxAmount * 0.3}px)`;
    devicePhone.style.transform = `translateY(${parallaxAmount * 0.2}px)`;

    ticking = false;
  }

  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('load', onScroll);
}

// Touch handling for service cards
function initServiceCardTouch() {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach(card => {
    let tapped = false;

    card.addEventListener('touchstart', (e) => {
      // Prevent double handling
      if (tapped) return;

      tapped = true;
      card.classList.add('tapped');

      // Reset after a short delay to allow for tap back
      setTimeout(() => {
        tapped = false;
        card.classList.remove('tapped');
      }, 300);
    });

    // Also handle click for non-touch devices
    card.addEventListener('click', (e) => {
      // Only toggle if not already handling a touch event
      if (!tapped) {
        card.classList.toggle('tapped');
      }
    });
  });
}

// Theme System
function initThemeSystem() {
    const htmlElement = document.documentElement;
    const themeToggle = document.querySelector('.theme-toggle');

    // Get saved theme from localStorage or system preference
    const savedTheme = localStorage.getItem('jitenLabsTheme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    // Determine initial theme
    let initialTheme = 'dark'; // default to dark
    if (savedTheme === 'light' || savedTheme === 'dark') {
        initialTheme = savedTheme;
    } else if (!savedTheme) {
        // First visit - respect system preference
        initialTheme = systemPrefersDark ? 'dark' : 'light';
    }

    // Apply initial theme
    htmlElement.setAttribute('data-theme', initialTheme);

    // Update theme toggle icon based on initial theme
    if (themeToggle) {
        updateThemeToggleIcon(themeToggle, initialTheme);
    }

    // Add click event listener to theme toggle
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            // Apply new theme
            htmlElement.setAttribute('data-theme', newTheme);

            // Save preference to localStorage
            localStorage.setItem('jitenLabsTheme', newTheme);

            // Update toggle icon
            updateThemeToggleIcon(themeToggle, newTheme);
        });
    }

    // Helper function to update theme toggle icons
    function updateThemeToggleIcon(toggleElement, theme) {
        const sunIcon = toggleElement.querySelector('.sun');
        const moonIcon = toggleElement.querySelector('.moon');

        if (theme === 'dark') {
            sunIcon.style.opacity = '0';
            sunIcon.style.transform = 'scale(0)';
            moonIcon.style.opacity = '1';
            moonIcon.style.transform = 'scale(1)';
        } else {
            sunIcon.style.opacity = '1';
            sunIcon.style.transform = 'scale(1)';
            moonIcon.style.opacity = '0';
            moonIcon.style.transform = 'scale(0)';
        }
    }
}

// Initialize theme system before other init functions
initThemeSystem();

// init
initHeroParallax();
initServiceCardTouch();
renderPlannerStep();