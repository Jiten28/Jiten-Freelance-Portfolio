Architecture.md

# Jiten Creative Co. — Architecture Document

## 1. Purpose

This document defines the technical architecture and structural direction for the Jiten Creative Co. portfolio.

The goal is to create a maintainable, scalable, production-ready website without unnecessarily rewriting the existing project.

The architecture must support the current portfolio while leaving room for future features such as:

- Digital Menus
- AR Menus
- AI design previews
- Lead management
- Database integration
- Admin dashboard
- Client management
- Additional web applications

---

# 2. Most Important Rule — Existing Codebase

This is an existing project.

Before changing the architecture or rewriting code, inspect the current project.

The implementation agent must first understand:

- current framework
- current build system
- package.json
- existing source files
- existing components
- current CSS/styling
- existing JavaScript logic
- existing assets
- existing animations
- existing project sections
- existing dependencies
- current functionality

Do not delete or replace working code simply because another architecture is possible.

Reuse good existing work wherever practical.

Refactor only when it improves maintainability or is necessary for the required functionality.

---

# 3. Architecture Principle

The application should be organized around clear responsibilities.

The main conceptual layers are:

1. UI / Components
2. Sections
3. Data
4. Business Logic / Utilities
5. Services
6. Styling
7. Assets
8. Optional Backend/API

The exact folder structure should follow the existing technology when possible.

Do not force a framework migration just to match this document.

---

# 4. Preferred Frontend Architecture

If the existing project is already using React/Vite, continue using it.

Preferred structure:

```text
src/
├── components/
├── sections/
├── data/
├── services/
├── utils/
├── styles/
└── App

This is a logical guideline, not a command to recreate the project from scratch.

If the existing project uses another appropriate structure, preserve it and apply the same architectural principles.

5. Components

Reusable interface elements should be separated from large page sections.

Examples of reusable components include:

Button
Navbar
Footer
Project Card
Service Card
Design Style Card
Modal
Form Input
Badge
Section Heading
Preview Window

Components should have a clear responsibility.

Avoid creating extremely large components containing unrelated functionality.

Also avoid creating hundreds of tiny components without a practical reason.

6. Website Sections

Large sections of the portfolio should be logically separated.

Main sections include:

Hero
Introduction
Services
Featured Projects
Digital Menu Experiences
Design Style Gallery
Website Experience
Pricing
How It Works
About
Project Planner
Design Preview
Project Summary
Contact
Footer

The implementation may organize these differently depending on the existing project.

The important requirement is clear separation of responsibilities.

7. Data-Driven Content

Repeated content should preferably be stored as structured data.

This applies especially to:

projects
services
design styles
pricing packages
hosting options
planner options
menu experiences

For example, a project can conceptually contain:

id
name
category
description
liveUrl
technologies
previewImage

The actual implementation language may be JavaScript, TypeScript, JSON, or another appropriate format based on the current project.

Do not duplicate the same project information across multiple components.

8. Featured Project Data

The Featured Projects section must contain exactly four real projects.

Perfume Shop

Category:
Full-Stack E-Commerce

Live URL:

https://perfume-shop-digital.netlify.app/

Preview asset:

assets/perfume-shop.png

Voyage-AI

Category:
Intelligent Travel Planner

Live URL:

https://voyage-ai-p1bd.onrender.com/

Preview asset:

assets/voyage-ai.png

Wonderful Crown

Category:
Healthcare Recommendation System

Live URL:

https://wonderful-crown.onrender.com/

Preview assets:

assets/wonderful-crown-desktop.png

assets/wonderful-crown-mobile.png

Cindrix

Category:
Intelligent AI Assistant

Live URL:

https://cindrix-ai.onrender.com/

Preview assets:

assets/cindrix-desktop.png

assets/cindrix-mobile.png

9. Projects That Must Not Be Featured

The following must not appear in the Featured Projects section:

E-Commerce Website
AgriVision-XAI

Do not invent replacement projects.

Do not add an "Explore All Projects" section unless explicitly requested later.

10. Project Preview Architecture

Project cards should use local screenshots as the primary visual preview.

Do not automatically load every live website.

Avoid using multiple live iframes.

Desktop interaction:

Project Card
    ↓
Hover / Focus
    ↓
Browser-style Preview
    ↓
Project Information
    ↓
Open Live Project

Mobile interaction:

Project Card
    ↓
Tap / Focus
    ↓
Expanded Preview
    ↓
Open Live Project

The live project should open only when the user intentionally chooses to open it.

11. Design Style Architecture

The portfolio contains exactly 20 selectable design directions.

They should be represented as structured data rather than duplicated manually throughout the application.

Each style should conceptually contain:

id
name
description
suitableFor
visualPreview
designTokens

The same style information should be usable by:

Design Style Gallery
Project Planner
Design Concept Preview
Project Summary
Proposal PDF
WhatsApp requirement message

This prevents the selected style from becoming disconnected between sections.

12. Design Style List

The styles are:

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
13. Planner State Architecture

The project planner should have one central state representing the current requirements.

Conceptually:

businessType
projectType
designStyle
features
businessName
ownerName
phone
email
location
website
requirements
budget
hosting
visualDirection

The exact implementation may use:

React state
Context
reducer
another appropriate state solution

Do not add a large state-management library unless genuinely necessary.

14. Planner Navigation

The planner follows this logical flow:

Business Type
        ↓
Project Type
        ↓
Design Style
        ↓
Features
        ↓
Business Information
        ↓
Budget
        ↓
Hosting
        ↓
Review
        ↓
Concept Preview
        ↓
WhatsApp / Proposal

The user must be able to move backward without losing previously entered information.

15. Validation Architecture

Validation should be reusable and centralized where practical.

Validation is required for:

Business Name
Owner Name
Phone
Email
Required selections

Phone validation must support valid Indian mobile formats.

Examples:

9876543210
+919876543210

Email validation must reject malformed values such as:

jiten
jiten@
jiten@gmail
@gmail.com

Invalid fields must:

show a visible error
receive an appropriate error state
prevent progression
remain accessible to keyboard and assistive technology users
16. Hosting Architecture

The planner must support manual hosting selection.

Supported options:

Netlify
Vercel
Render
Cloudflare Pages
Firebase
Supabase
Google Cloud / Cloud Run
Existing hosting
Recommendation

Hosting information should be represented as structured data.

Each option can contain:

name
bestFor
benefits
limitations
jitenLabsSetupFee
thirdPartyCostNote

Third-party provider pricing must never be treated as permanently fixed.

17. WhatsApp Service

WhatsApp message generation should be separated from UI components.

Conceptual flow:

Planner State
      ↓
Requirement Formatter
      ↓
WhatsApp Message
      ↓
URL Encoding
      ↓
WhatsApp

The message must be generated dynamically from the user's actual selections.

The destination number is:

+91 76750 23149
18. Project Summary

The summary should be generated from the same planner state.

It should contain:

business type
project type
design style
selected features
budget
business information
requirements
hosting choice
visual direction
estimated starting package

The summary must not contain contradictory information.

19. Proposal PDF

PDF generation should be separated from the visual planner UI.

Conceptual flow:

Planner State
      ↓
Project Summary
      ↓
PDF Generator
      ↓
A4 Proposal

The PDF should be generated as an actual PDF document.

Do not rely on browser printing as the primary proposal-generation mechanism.

20. AI Design Preview

The concept preview should use the planner information.

Inputs:

Business Type
Project Type
Design Style
Features

Conceptually:

Planner
   ↓
Design Direction
   ↓
Concept Generator
   ↓
Visual Preview

The implementation may use either:

AI-generated output, or
deterministic HTML/CSS preview

If AI generation is unavailable, the deterministic preview should remain functional.

It must not be falsely described as AI-generated.

21. AI API Security

If an external AI API such as Gemini is used, private API credentials must never be exposed in frontend code.

Preferred architecture:

Frontend
   ↓
Backend/API Route
   ↓
AI Provider
   ↓
Safe Response
   ↓
Frontend

Credentials must be stored in environment variables.

Never commit secrets to source control.

22. Digital Menu Architecture

Digital menus are a separate product category from Featured Projects.

The portfolio should eventually support:

Digital Menu Experiences
        ├── Normal Digital Menus
        └── AR Menus

Each future menu experience should conceptually contain:

id
name
type
description
previewImage
liveUrl
technologies

The architecture should make adding future menus easy.

Do not build all menu products as part of the current portfolio implementation unless explicitly requested.

23. Future AR Menu Support

The architecture should not assume that every device supports AR.

Future AR menu flow:

QR Code
   ↓
Menu Landing Page
   ↓
Normal Menu
   │
   └── View in AR
          ↓
       Device Check
          ↓
    AR Supported?
       /       \
     Yes        No
      ↓          ↓
     AR       Normal Menu

Normal menu functionality must remain available as the fallback.

Hand-tracking interactions may be considered experimental in the future and must not become a dependency for basic menu usage.

24. Future Lead Storage

The current version does not require a full database or CRM.

However, the architecture should be ready for future lead storage.

A future lead record may contain:

leadId
createdAt
clientName
businessName
businessType
projectType
designStyle
features
budget
phone
email
location
website
requirements
hostingChoice
visualDirection
leadStatus

Possible statuses:

New
Contacted
Discussion
Quotation Sent
In Progress
Completed
Closed

Do not build the complete CRM in the current phase.

25. Local Storage

Local storage may be used for temporary planner persistence.

It can preserve:

selected options
form progress
unfinished planner data

It must not be treated as permanent lead storage.

26. Asset Architecture

Use the existing project asset system where appropriate.

Project screenshots should remain local whenever possible.

Known assets include:

assets/perfume-shop.png
assets/voyage-ai.png
assets/wonderful-crown-desktop.png
assets/wonderful-crown-mobile.png
assets/cindrix-desktop.png
assets/cindrix-mobile.png

Do not replace real project screenshots with random stock images.

27. Styling Architecture

Styling should have a coherent global design system.

The project should maintain reusable definitions for:

colors
typography
spacing
borders
shadows
radii
animation timing
responsive behavior

Avoid defining the same design token in many unrelated places.

Follow Design.md for the visual system.

28. Animation Architecture

Animations should be reusable and scoped.

The supplied social-media hover animation reference should be preserved as part of the visual direction.

Animation implementation must support:

hover
focus
touch where applicable
reduced motion

Do not allow animation selectors to accidentally affect unrelated elements.

29. Responsive Architecture

The website must be fluid.

Use:

CSS Grid
Flexbox
responsive units
clamp()
min()
max()
appropriate media queries

Avoid fixed desktop widths.

Avoid fixed heights for major sections.

The layout must adapt to:

mobile
tablet
laptop
desktop
large desktop
30. Accessibility Architecture

Accessibility is part of the architecture, not an optional final step.

Interactive elements should support:

keyboard navigation
visible focus
semantic HTML
appropriate labels
ARIA when necessary
reduced motion

Forms must have associated labels.

31. Performance Architecture

Performance should be considered during implementation.

Prefer:

optimized local images
lazy loading
CSS transforms for animation
opacity/transform-based motion
limited network requests

Avoid:

loading all live projects simultaneously
unnecessary iframes
unnecessary large libraries
unnecessary animations
32. Backend Philosophy

The first version does not require a complete backend.

Backend/API functionality should only be introduced when required for a feature such as:

secure AI API calls
future lead storage
future admin functionality

Do not create a backend merely for the sake of having one.

33. Architecture Decision Principle

When choosing between two technically valid approaches, prefer the option that:

preserves existing working code
is easier to maintain
has fewer unnecessary dependencies
is secure
performs well
remains extensible
is understandable by another developer

The goal is a professional codebase, not maximum complexity.

34. Final Architecture Principle

The website should be built so that today's portfolio can become tomorrow's complete Jiten Creative Co. business platform without requiring a complete rewrite.

However, future scalability must not be used as an excuse to overengineer the current version.
```
