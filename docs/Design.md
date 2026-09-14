Design.md

Purpose: This document defines the visual design system for the Jiten Creative Co. portfolio.
It describes how the website should look and behave. It is a design specification, not a list of files to create.

Jiten Creative Co. — Design System

1. Design Direction

Jiten Creative Co. should feel like a premium modern digital agency, not a generic developer portfolio.

The overall impression should be:

Professional
Modern
Premium
Technical
Business-focused
Trustworthy
Visually interactive
Clean
Responsive

The design should communicate that Jiten Creative Co. builds real digital products for businesses, rather than simply creating websites.

Core message

Digital Experiences. Built for Business.

2. Overall Visual Language

The website should combine:

Dark premium hero sections
Light content sections
Deep navy / near-black backgrounds
Blue and purple accent gradients
Muted gold accents
Selective glassmorphism
Large typography
Clean cards
Device mockups
Subtle depth
Micro-interactions
Controlled animation

Avoid making every section look like glass.

Glassmorphism should be an accent, not the entire design language.

3. Color System

Use a small, consistent color system.

Primary

Near-black / deep navy should dominate premium sections.

Example direction:

#070B14
#0B1020
#111827
Light surfaces

Use warm/off-white rather than pure white wherever appropriate.

Example direction:

#F8F8F6
#F3F4F6
#FFFFFF
Primary accent

Blue:

#2563EB
#3B82F6
Secondary accent

Purple:

#7C3AED
#8B5CF6
Premium accent

Muted gold:

#C8A96B
#D4B978

Gold should be used selectively for:

Small highlights
Decorative details
Premium indicators
Selected states
Logo-related accents

Do not make gold the primary interface color.

4. Typography

Preferred typography direction:

Headings

Manrope

Use for:

Hero heading
Section headings
Large statistics
Important labels
Body

Inter

Use for:

Paragraphs
Form labels
Buttons
Navigation
Descriptions
Supporting text

If the existing project already uses a suitable typography system, preserve it unless there is a strong reason to change it.

5. Typography Hierarchy

The typography should have obvious hierarchy.

Hero heading

Very large and bold.

Use fluid sizing rather than fixed desktop-only values.

Concept:

clamp(min, preferred, max)
Section heading

Large but clearly smaller than the hero.

Card title

Medium/large semibold.

Body

Comfortable reading size with sufficient line height.

Supporting text

Smaller and visually muted.

Avoid excessively small text on mobile.

6. Layout System

Use a responsive container system.

Desktop

Content should not stretch indefinitely across extremely wide screens.

Use a maximum content width appropriate for the existing application.

Tablet

Allow sections to adapt naturally.

Mobile

Prioritize:

Readability
Vertical spacing
Touch interaction
Clear hierarchy

Avoid simply shrinking the desktop layout.

7. Responsive Breakpoints

The design should be evaluated at:

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

These are testing targets, not instructions to create fixed-size layouts.

8. Fluid Sizing

Use fluid values where appropriate.

Prefer:

clamp()
%
vw
vh
min()
max()
minmax()

Avoid unnecessary fixed dimensions.

Example
font-size: clamp(2.5rem, 6vw, 6rem);

The exact values should be adapted to the existing design.

9. Hero Section

The hero should immediately establish Jiten Creative Co. as a premium digital solutions agency.

Primary message

Your Business. Your Style. Your Digital Presence.

Supporting message

Communicate that Jiten Creative Co. provides:

Business websites
Digital menus
E-commerce
Custom web applications
Digital solutions
Visual direction

Use:

Dark background
Large typography
Gradient accents
Device mockup
Subtle parallax
Floating UI elements
Controlled motion

The visual should feel like a real product showcase.

10. Navigation

Desktop navigation should be:

Clean
Minimal
Easy to scan
Sticky or appropriately persistent

Possible navigation:

Home
Services
Projects
Styles
Pricing
Planner
Contact

Do not overcrowd the navigation.

Mobile

Use a hamburger menu.

The menu should:

Be easy to open
Be easy to close
Have large touch targets
Trap focus appropriately if implemented as a modal
Work without hover 11. Buttons

Buttons should feel like real agency/product UI.

Primary button

Use the main accent treatment.

Examples:

Start Your Project
Plan Your Project
Send Requirements
Choose This Style
View Project
Secondary button

Use:

Outline
Subtle surface
Ghost treatment

depending on the surrounding section.

Interaction

Buttons should have subtle:

Hover movement
Shadow/depth change
Background transition
Focus state

Avoid excessive bouncing or exaggerated animations.

12. Cards

Cards should have:

Consistent radius
Consistent internal spacing
Clear hierarchy
Strong hover/focus state
Appropriate contrast

Use different card treatments where useful.

Not every card needs:

Glass effect
Gradient
Shadow
Border

Variation should support hierarchy.

13. Glassmorphism

Glass effects may be used for:

Hero floating panels
Navigation overlays
Project previews
Planner panels
Small premium UI elements

Use:

Transparency
Blur
Thin borders
Controlled shadows

Avoid excessive blur.

The underlying content must remain readable.

14. Featured Project Design

Featured project cards should visually prioritize the actual project.

Card structure
Project Screenshot
↓
Project Name
Category
Technology
Short Description
↓
View Live Project
Desktop

Hover/focus can reveal:

Browser frame
Larger screenshot
Project information
Live button
Mobile

Use:

Tap
Expand
Focus

because hover is not available.

15. Project Screenshots

Use the provided local screenshots whenever possible.

Featured project assets
assets/perfume-shop.png

assets/voyage-ai.png

assets/wonderful-crown-desktop.png
assets/wonderful-crown-mobile.png

assets/cindrix-desktop.png
assets/cindrix-mobile.png

Do not invent screenshots.

Do not create fake project previews that imply they are actual screenshots.

16. Digital Menu Visuals

Digital menu experiences should visually resemble real products.

Normal menu concept

Show realistic elements such as:

Restaurant branding
Categories
Food/product cards
Prices
Images
QR interaction
WhatsApp
Location
Contact
AR menu concept

Visually communicate:

QR entry
AR mode
Product/object preview
Device compatibility
Normal fallback

The visual should clearly distinguish an AR experience from a normal menu.

17. Design Style Gallery

The gallery should feel like a design studio, not a list of themes.

Each miniature should visually demonstrate the selected style.

For example:

Glassmorphism

Visual characteristics:

Transparent panels
Background blur
Layered surfaces
Soft gradients
Brutalist

Visual characteristics:

Strong typography
Hard borders
Minimal decoration
Intentional visual tension
Vintage / Retro

Visual characteristics:

Retro typography
Aged-paper feel
Classic layouts
Decorative details
AI / Tech

Visual characteristics:

Dark surfaces
Technical grids
Glowing accents
Futuristic interface elements

Every style should have its own recognizable visual identity.

18. Style Selection

When a user chooses a style:

Highlight the selected card.
Show a clear selected state.
Preserve the selection when navigating between planner steps.
Pass the style into the final summary.
Pass it into the concept preview.
Pass it into WhatsApp.
Pass it into the proposal.

The selection should never disappear when the user clicks Back and then Next.

19. Website Experience Section

The nine experience features should be presented visually.

Smooth Scrolling

Miniature:

Section navigation
Smooth movement indicator
Responsive Design

Miniature:

Desktop + tablet + mobile layouts
Modern UI

Miniature:

Modern interface card
Micro-interactions

Miniature:

Button/state transition
Subtle Parallax

Miniature:

Layered moving elements
Mobile First

Miniature:

Phone-first interface
Fast Performance

Miniature:

Performance/loading visualization
Accessible Design

Miniature:

Keyboard/focus/contrast indicators
Business-Focused UX

Miniature:

Clear conversion flow

The visual examples should make the feature understandable without reading the description.

20. Pricing Design

Pricing should feel transparent and trustworthy.

Recommended hierarchy

Highlight:

Digital Menu Pro — ₹4,999

as the Most Popular option.

Do not make every pricing card equally visually dominant.

Pricing information

Keep:

Price
Features
Revision count
CTA

easy to scan.

Custom projects

Provide a clear path for users who need something outside predefined packages.

21. Hosting Pricing Presentation

Hosting costs must not be visually confused with Jiten Creative Co. project fees.

Use separate labels such as:

Jiten Creative Co. Setup Fee

and

Third-Party Platform Cost

Include a small disclaimer:

Third-party hosting, domain, API and platform charges are subject to the provider's current pricing, plan and usage limits.

22. Project Planner Design

The planner should feel like a modern product configurator.

Visual structure
Step Indicator
↓
Question / Selection
↓
Options
↓
Back / Continue
Step indicator

Clearly communicate:

Current step
Completed steps
Remaining steps

Do not make the progress indicator overly complicated.

23. Planner Selection Cards

Selection cards should have:

Icon or visual
Title
Short description where useful
Selected state

Selected state should be obvious through more than just color.

Possible indicators:

Border
Checkmark
Background change
Small status label 24. Planner Form Design

Forms should be spacious and easy to understand.

Input fields

Use:

Clear labels
Helpful placeholders where useful
Error messages
Focus states
Appropriate input types

Do not rely on placeholder text as the only label.

25. Validation Design

Invalid fields should show:

Error border
Error message
Clear explanation

Example:

Please enter a valid Indian mobile number.

or:

Please enter a valid email address.

Do not use vague messages such as:

Invalid input.

26. AI / Concept Preview Design

The preview should feel like a real design studio feature.

Layout

Possible structure:

Your Selected Direction
↓
Visual Website Concept
↓
Business / Style / Project Information
↓
Use This Direction

The concept should reflect the selected:

Business
Project
Style
Features
Loading

Use an intentional loading state.

Avoid showing a broken blank box.

Error

If generation fails:

We couldn't generate the preview right now.

Then provide:

Try Again

The planner itself must remain usable.

27. Proposal PDF Design

The proposal should visually represent Jiten Creative Co. as a professional agency.

Style
Clean
Premium
A4
Strong hierarchy
Generous whitespace
Consistent typography
Cover

Use:

JITEN CREATIVE CO.

Digital Experiences. Built for Business.

PROJECT PROPOSAL

Include subtle branding rather than excessive decoration.

28. Footer

The footer should be visually strong but not oversized.

Include:

Jiten Creative Co. logo/name
Short description
Contact
Email
Social links
Copyright
Relevant navigation
Social icons

Include exactly:

GitHub
LinkedIn
Instagram
WhatsApp

Use the supplied circular social animation as the visual reference.

29. Social Brand Treatments

Suggested colors:

GitHub

#181717

LinkedIn

#0077B5

Instagram

Use an Instagram-style gradient/brand treatment.

WhatsApp

#25D366

Do not use an unrelated gold background for Instagram.

30. Animation Philosophy

Animations should communicate polish, not distract from content.

Use:

Fade
Slide
Scale
Transform
Opacity
Subtle parallax
Hover transitions
Scroll-triggered reveals

Avoid:

Constant movement
Excessive bouncing
Long delays
Unnecessary spinning
Distracting background animations 31. Scroll Animation

Sections may reveal progressively as the user scrolls.

Examples:

Heading fades in
Cards slide upward
Images scale subtly
Decorative elements move slightly

Animations should not prevent users from accessing content.

32. Parallax

Use parallax selectively.

Good locations:

Hero
Device mockups
Decorative background elements
Selected project visuals

Avoid heavy parallax on mobile.

Never allow parallax to cause:

Horizontal overflow
Content clipping
Excessive CPU usage
Poor scrolling performance 33. Reduced Motion

Respect:

@media (prefers-reduced-motion: reduce)

When reduced motion is enabled:

Disable unnecessary parallax.
Reduce transitions.
Remove decorative movement.
Keep functionality intact.
Avoid forced animation. 34. Accessibility

The visual system must support accessibility.

Ensure:

Sufficient text contrast
Visible keyboard focus
Meaningful button labels
Semantic HTML
Form labels
Error association
Keyboard navigation
Touch-friendly controls
Reduced-motion support

Never use animation as the only communication mechanism.

35. Mobile Design

Mobile should be treated as a first-class experience.

Priorities
Readability
Navigation
Touch interaction
Form usability
Performance
Content hierarchy
Avoid
Tiny buttons
Hover-only functionality
Desktop-sized cards
Fixed-width sections
Overly large decorative elements
Horizontal scrolling 36. Device Mockups

Use device mockups strategically.

Possible devices:

Smartphone
Tablet
Laptop
Desktop browser

They should be used to communicate actual product experiences.

Avoid filling the page with device frames simply for decoration.

37. Imagery

Use real project assets wherever available.

For generated or decorative imagery:

Keep it relevant.
Maintain brand consistency.
Optimize file sizes.
Avoid generic stock-photo-heavy design.

Business-facing sections should prioritize the product/interface over generic people imagery.

38. Iconography

Icons should use one consistent visual language.

Possible approaches:

Existing project icon library
Inline SVG
Existing framework-compatible icon package

Do not add multiple icon libraries for a handful of icons.

Reuse the existing project's icon system where appropriate.

39. Micro-interactions

Use small interactions to improve perceived quality.

Examples:

Button arrow movement
Card elevation
Border highlight
Selection checkmark
Input focus glow
Navigation underline
Social icon rotation
Image scale

Every interaction should have a purpose.

40. Error States

Error states should visually match the rest of the product.

Avoid browser-default-looking error screens.

Use:

Clear message
Helpful explanation
Retry action where applicable
Consistent typography
Appropriate icon/visual 41. Loading States

Loading interfaces should communicate that something is happening.

Use:

Skeletons
Progress indicators
Animated placeholders
Contextual loading messages

Do not leave users staring at an empty container.

42. Visual Consistency Rules

Across the entire site:

Border radius should feel consistent.
Spacing should follow a coherent scale.
Typography should follow hierarchy.
Buttons should behave consistently.
Focus states should be consistent.
Animation timing should be consistent.
Cards should share a visual language.
Accent colors should have defined purposes. 43. What the Design Must Avoid

Do not create:

Generic AI-generated landing-page aesthetics
Excessive gradients
Excessive glassmorphism
Random neon colors
Fake testimonials
Fake client logos
Fake statistics
Blank preview boxes
Placeholder project screenshots
Unrelated stock imagery
Excessive animation
Desktop-only interactions
Fixed-width layouts
Horizontal overflow
Visually identical cards everywhere 44. Premium Agency Test

Before approving a section, ask:

Would this look credible on a professional web-development agency's website?

If the answer is no, improve the visual hierarchy, spacing, imagery, interaction, or content.

The portfolio should feel like something that could convince a real business owner to contact Jiten Creative Co..

45. Final Design Principle

The website should not merely tell visitors that Jiten Creative Co. can build modern websites.

It should demonstrate that ability through the website itself.

Every major section should therefore answer at least one of these questions:

Does this demonstrate technical ability?
Does this demonstrate design ability?
Does this demonstrate business understanding?
Does this make the service easier to understand?
Does this make contacting Jiten Creative Co. easier?

If a visual element does none of these, it should be reconsidered.
