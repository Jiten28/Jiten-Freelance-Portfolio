Images:

assets/wonderful-crown-desktop.png
assets/wonderful-crown-mobile.png
Project 4

Cindrix – Intelligent AI Assistant

Live:

https://cindrix-ai.onrender.com/

Images:

assets/cindrix-desktop.png
assets/cindrix-mobile.png
Project interaction

Desktop:

Hover/focus project
Reveal browser-style screenshot preview
Show project name
Show category
Show technologies
Show live-project button

Mobile:

Tap/focus
Expand project preview
Maintain touch-friendly controls
Important

Live projects should open in a new tab.

Do not use all live websites as iframes simply to display the portfolio.

5. Phase 4 — Digital Menu Architecture

Build the portfolio's future-facing digital menu system.

This phase does not require building every final client menu immediately.

Normal Digital Menu

Architecture:

QR Code → Menu Landing Page → Menu Experience

Possible actions:

View Digital Menu
View / Download PDF
Share
WhatsApp
Call
Location
AR Digital Menu

Architecture:

QR Code → Menu Landing Page → View in AR

Then:

Check device/browser support
Launch AR experience if supported
Provide normal-menu fallback when unsupported
Data architecture

The same business/menu data should eventually support:

A4 menu
PDF menu
Normal web menu
AR menu
Goal

Make the portfolio architecture ready for future menu products without forcing unnecessary backend complexity now.

6. Phase 5 — Design Style Gallery

Implement all 20 design styles.

Styles
Glassmorphism
Minimalistic
Dark Mode
Colorful / Vibrant
Neumorphism
Brutalist
Vintage / Retro
Hand-Drawn / Sketch
Parallax
Landing Page
One Page Scroll
Portfolio
E-Commerce
Magazine / Blog
Corporate / Business
Educational
SaaS / Dashboard
Entertainment
Nature / Eco
AI / Tech
Every style card must contain
Real visual miniature preview
Style name
Description
Best-suited business types
Choose This Style button
Important

Do not create blank rectangles with only text.

The preview itself should visually communicate the style.

Integration

The selected style must be reusable by:

Project Planner
Project Summary
AI/Concept Preview
WhatsApp message
Proposal PDF 7. Phase 6 — Website Experience

Build the Website Experience section.

Features
Smooth Scrolling
Responsive Design
Modern UI
Micro-interactions
Subtle Parallax
Mobile First
Fast Performance
Accessible Design
Business-Focused UX
Requirement

Each feature should have a meaningful visual miniature/demo.

Avoid cards that are simply:

Feature name + small dot + description

The visual should demonstrate what the feature actually means.

8. Phase 7 — Pricing

Implement the pricing section.

Digital Menu Basic

₹1,999

Up to 30 items
Mobile responsive
QR code
WhatsApp button
1 revision
Digital Menu Pro

₹4,999

Custom modern design
Up to 60 items
QR code
WhatsApp
Contact/location
2 revisions

Mark as:

Most Popular

Business Website

₹7,999

4–5 sections/pages
Responsive design
WhatsApp
Google Maps
Contact form
Basic SEO
2 revisions
Website + Digital Menu

₹12,999

Complete website
Dedicated digital menu
Custom design
WhatsApp
Maps
Responsive design
Extra revision
Custom Projects

Discuss

For projects requiring custom functionality or architecture.

Add-ons
Google Business setup/help: ₹1,000–₹2,500
Maintenance: ₹500–₹1,500/month
Extra page: ₹1,000–₹2,500
Custom features: On request 9. Phase 8 — Project Planner

Build the multi-step project planner.

Step 1 — Business Type

Options:

Restaurant
Café
Salon
Dry Cleaner
Bakery
Gym
Retail Shop
Professional Service
Startup
Other
Step 2 — Project Type

Options:

Digital Menu
QR Digital Menu
Business Website
E-commerce Website
Web Application
Custom Solution
Step 3 — Design Style

All 20 styles must be available.

Step 4 — Features

Options:

WhatsApp
QR Code
Google Maps
Contact Form
Online Booking
Product Catalog
Online Ordering
Payment Integration
Gallery
Reviews
Blog
Social Media Links
Admin Dashboard
Custom Feature
Step 5 — Business Information

Fields:

Business Name
Owner Name
Phone
Email
Business Location
Website / Instagram
Additional Requirements
Step 6 — Budget

Options:

₹2,000–₹5,000
₹5,000–₹10,000
₹10,000–₹20,000
₹20,000+
Step 7 — Hosting / Deployment

Options:

Netlify
Vercel
Render
Cloudflare Pages
Firebase
Supabase
Google Cloud / Cloud Run
Already have hosting
I'm not sure — recommend one
Important

The recommended hosting option must not automatically lock the user into that platform.

The client must be able to manually select another option.

10. Phase 9 — Form Validation

Implement strong validation.

Required
Business Name
Owner Name
Phone
Email
Phone

Accept:

Indian 10-digit mobile number
Optional +91 format

Reject:

Letters
Obviously invalid values
Random short strings

Use an appropriate telephone input.

Email

Use:

HTML email validation
JavaScript validation

Reject examples such as:

jiten
jiten@
jiten@gmail
@gmail.com
UX

Validation errors must:

Appear inline
Clearly explain the problem
Highlight the invalid field
Use aria-invalid
Use aria-describedby where appropriate 11. Phase 10 — Hosting Selection

Provide useful information for every hosting option.

Each option should explain:

Platform
Best for
Benefits
Limitations
Jiten Creative Co. setup fee
Third-party pricing disclaimer
Setup fee ranges
Netlify: ₹999–₹1,999
Vercel: ₹999–₹2,499
Render: ₹1,499–₹3,499
Cloudflare Pages: ₹999–₹1,999
Firebase: ₹1,499–₹3,499
Supabase: ₹1,999–₹4,999+
Google Cloud / Cloud Run: ₹2,499–₹5,999+
Important

Provider pricing must be described as subject to the provider's current pricing, usage, plan and limits.

Do not present third-party pricing as guaranteed.

12. Phase 11 — Project Summary

After the planner is complete, show a complete summary.

Include
Business type
Project type
Design style
Selected features
Budget
Contact information
Requirements
Hosting/deployment
Visual direction
Estimated starting package
Pricing disclaimer

The user should be able to review the information before submitting.

13. Phase 12 — WhatsApp Integration

Create a dynamic WhatsApp submission flow.

Primary CTA

Send Requirements on WhatsApp

The generated message should include the planner information.

Send to:

+91 76750 23149

Message should contain
Business name
Owner
Business type
Project type
Design style
Features
Budget
Contact details
Requirements
Hosting choice
Visual direction
Additional option

Allow the user to copy their requirements.

Do not silently lose planner data if WhatsApp cannot be opened.

14. Phase 13 — AI / Design Concept Preview

Build:

Visualize Your Website Before We Build It

Preview requirements

The result must be a meaningful visual concept based on:

Business type
Project type
Selected style
Features

It must not be a generic gradient card.

Two possible implementation approaches
Option A — AI-generated concept

Use an AI generation endpoint securely.

Example architecture:

/api/generate-design-preview

Any API key must remain server-side.

Use environment variables.

Never expose secret keys in client-side code.

Option B — Deterministic concept preview

Generate a sophisticated HTML/CSS visual based on the selected configuration.

If this approach is used, call it:

Interactive Concept Preview

or

Preview generated from your selected direction

Do not falsely describe it as AI-generated.

Required states
Loading
Progress
Success
Error
Retry

The planner must continue working even if preview generation fails.

Action

Use This Direction

The selected visual direction should be saved and passed into:

Project Summary
WhatsApp
Proposal PDF 15. Phase 14 — Proposal PDF

Generate a genuine professional A4 proposal PDF.

Do not simply rely on browser printing.

Cover

Include:

JITEN CREATIVE CO.
Digital Experiences. Built for Business.
PROJECT PROPOSAL
Client/business name
Project type
Date
Subtle JK watermark
Document structure
Project Overview
Business Information
Project Type
Preferred Design Style
Selected Features
Client Requirements
Estimated Starting Package
Project Vision
Proposed Workflow
Next Steps
Contact
PDF features
A4 layout
Professional typography
Header
Footer
Page numbers
Consistent spacing
Clean section hierarchy
Pricing separation

Clearly distinguish:

Jiten Creative Co. project/setup fee

from:

Hosting/platform cost

Domain cost

API / third-party service costs

Include appropriate pricing disclaimers.

16. Phase 15 — Social Footer Animation

Implement the footer social icons:

GitHub
LinkedIn
Instagram
WhatsApp
Animation

Based on the supplied reference:

Circular icon
Bottom-to-top color fill
Icon rotates approximately 360° on interaction
Smooth transition
Network-specific branding
Interaction

Support:

Mouse hover
Keyboard focus
Touch interaction
Accessibility

Respect:

prefers-reduced-motion

Do not make the animation the only way to understand or activate the links.

17. Phase 16 — Responsive & Accessibility Audit

Test the portfolio across:

360×800
390×844
430×932
768×1024
820×1180
1280×720
1366×768
1440×900
1536×864
1920×1080
2560×1440
Check
No horizontal overflow
No clipped content
No overlapping elements
Navigation works
Planner works
Forms work
Buttons remain touch-friendly
Text remains readable
Images scale correctly
Modals/previews fit smaller screens
Mobile interactions work without hover
Parallax is reduced appropriately on mobile 18. Phase 17 — Performance Audit

Check:

Image sizes
Lazy loading
Unnecessary JavaScript
Animation performance
Large dependencies
Repeated rendering
Network requests
Unnecessary live-site embeds
Mobile performance

Prefer efficient animations using properties such as:

transform
opacity

Avoid unnecessary layout-triggering animations.

19. Phase 18 — Final QA

Before considering the portfolio complete:

Functional
Navigation works
All CTAs work
Project links work
Social links work
Planner works
Back/Next works
State persists while navigating planner steps
Validation works
Hosting selection works
Summary works
WhatsApp generation works
Copy functionality works
Preview works
PDF generation works
Visual
No blank style previews
No broken images
No placeholder content
No fake testimonials
No inconsistent spacing
No accidental template sections
No unfinished UI
Content

Verify:

Contact information
Pricing
Project names
Project URLs
Project screenshots
Service descriptions
Design styles 20. Phase 19 — Documentation & Memory

After meaningful implementation progress:

Update project documentation.

Documentation should reflect
What was implemented
What remains
Important architecture decisions
Known issues
Changed dependencies
Testing status
Future work

When development begins, maintain:

Memory.md

This should act as the project's ongoing development memory so future AI sessions can understand:

Current progress
Completed phases
Current phase
Important decisions
Known bugs
Next task
Files/components changed
Things that must not be changed
Phase Completion Rule

A phase is not complete merely because code has been written.

A phase should be marked complete only after:

Implementation is finished.
The project runs successfully.
Obvious errors are resolved.
The relevant UI is checked responsively.
Relevant interactions are tested.
Accessibility considerations are checked where applicable.
Documentation is updated when the change affects architecture or project behavior.
The next phase can safely build on the completed work.
Implementation Order

The recommended order is:

Inspect → Foundation → Portfolio → Projects → Menus → Styles → Experience → Pricing → Planner → Validation → Hosting → Summary → WhatsApp → Preview → PDF → Footer Animation → Responsive QA → Performance → Final QA → Documentation

Do not jump directly into complex features such as AI preview or PDF generation before the foundation and planner data flow are stable.

Important: The phase names above are a roadmap only. They are not instructions to create 20 folders or 20 files in the project.
