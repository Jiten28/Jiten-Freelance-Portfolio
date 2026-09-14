They are not completed projects.

The style selector must visually demonstrate each style.

Never use:

- empty boxes
- blank colored rectangles
- meaningless gradients

as the only style preview.

Each miniature should visually communicate the design style.

---

# 11. No Generic Template Look

Do not allow the portfolio to become visually generic.

Avoid:

- default browser styling
- random template sections
- unrelated visual styles
- excessive gradients
- excessive glassmorphism
- excessive rounded cards
- excessive neon effects
- generic stock illustrations

Follow Design.md for the visual direction.

---

# 12. Brand Consistency

Maintain the Jiten Creative Co. visual identity.

Primary visual language:

- deep navy
- near-black
- off-white
- muted gold
- blue
- purple

Use blue and purple selectively.

Use gold as an accent rather than making the entire website gold.

Do not introduce random colors without a design reason.

---

# 13. Dependency Rule

Before installing a new dependency:

1. Check whether an existing dependency already provides the functionality.
2. Check whether the functionality can reasonably be implemented with native code.
3. Consider bundle size and maintenance.
4. Add the dependency only when it provides meaningful value.

Do not install libraries simply because they are popular.

Do not add multiple libraries that perform the same task.

---

# 14. Framework Rule

Do not migrate the project to another framework unless there is a strong technical reason.

If the current project already uses React/Vite appropriately, continue using it.

If the project uses another suitable technology, preserve it unless migration is genuinely necessary.

---

# 15. Code Organization Rule

Keep responsibilities separated.

Avoid:

- giant components
- giant CSS files containing unrelated logic
- duplicated validation
- duplicated project data
- duplicated pricing data
- duplicated style definitions
- duplicated business logic

At the same time, do not over-split the project into hundreds of tiny files without a reason.

Use practical organization.

---

# 16. Data-Driven Rule

Use structured data for repeated content.

This includes:

- projects
- services
- pricing
- design styles
- hosting options
- planner options
- menu experiences

The same information should not be manually copied into multiple unrelated components.

There should preferably be one source of truth for each major data category.

---

# 17. Planner Rule

The planner must preserve user input while navigating between steps.

When the user presses Back:

- previous information must remain
- selected options must remain
- entered form data must remain

Do not reset the entire planner unnecessarily.

---

# 18. Form Validation Rule

Required fields must be validated before the user can continue.

Required information includes:

- Business Name
- Owner Name
- Phone
- Email

Validate at the appropriate step.

Show errors close to the relevant input.

Do not rely only on browser-native validation.

---

# 19. Phone Validation

Phone input should use:

```text
type="tel"

Support valid Indian mobile formats such as:

9876543210
+919876543210

Reject:

letters
obviously invalid lengths
empty required values
malformed values

Trim unnecessary whitespace.

20. Email Validation

Email input should use:

type="email"

Application-level validation should also be used.

Reject examples such as:

jiten
jiten@
jiten@gmail
@gmail.com

A valid email should contain a sensible local part, @ symbol, domain, and domain extension.

21. Validation UX

Invalid fields should have:

visible error state
clear error message
red/error border where appropriate
accessible association between field and error

Use:

aria-invalid
aria-describedby

where appropriate.

Do not make errors appear only after the entire form is submitted if the user can reasonably be informed earlier.

22. Accessibility Rule

Accessibility is required.

Use:

semantic HTML
proper heading hierarchy
labels for inputs
keyboard navigation
visible focus states
accessible buttons
meaningful link text
alt text for meaningful images
ARIA attributes where necessary

Do not make functionality dependent exclusively on mouse hover.

23. Mobile Interaction Rule

Every hover interaction must have a mobile-friendly alternative.

Desktop may use:

hover
pointer movement

Mobile should use:

tap
focus
expandable interaction

Do not hide important information behind hover-only interactions.

24. Responsive Rule

The website must work across:

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

Do not design only for a single screen size.

Never intentionally introduce horizontal page scrolling.

25. Fixed Dimension Rule

Avoid unnecessary fixed:

widths
heights
viewport-sized containers

Use responsive techniques such as:

Grid
Flexbox
clamp()
min()
max()
responsive spacing

Major sections should not break because of viewport height.

26. Animation Rule

Animations must improve the experience.

Prefer:

opacity
transform
subtle movement
controlled transitions
scroll-triggered effects

Avoid:

excessive bouncing
constant movement
excessive scaling
distracting parallax
animations that block interaction
27. Reduced Motion

Respect:

@media (prefers-reduced-motion: reduce)

When reduced motion is enabled:

reduce transitions
disable unnecessary movement
remove excessive parallax
keep the interface fully functional
28. Social Icon Animation

The supplied social-media animation reference is part of the visual requirement.

The implementation should reproduce the intended behavior:

circular icon
color fill rising from the bottom
icon rotating around the Y axis
smooth transition
network-specific branding

Required networks:

GitHub
LinkedIn
Instagram
WhatsApp

Selectors must be scoped.

Do not use generic selectors that accidentally style unrelated:

ul
li
a

throughout the application.

29. Performance Rule

Do not sacrifice performance for visual effects.

Avoid:

loading every live project simultaneously
loading multiple unnecessary iframes
huge images
unnecessary video backgrounds
unnecessary animation libraries
unnecessary API requests

Use optimized local images.

Use lazy loading where appropriate.

30. Project Preview Rule

Featured project previews should primarily use local screenshots.

Do not automatically load all live websites.

Do not use multiple live iframes simply to create previews.

Live websites should open when the user intentionally chooses:

"Open Live Project"

31. Image Rule

Use real project screenshots where available.

Known project assets include:

assets/perfume-shop.png
assets/voyage-ai.png
assets/wonderful-crown-desktop.png
assets/wonderful-crown-mobile.png
assets/cindrix-desktop.png
assets/cindrix-mobile.png

Do not replace real project visuals with unrelated images.

Use appropriate alt text.

32. AI Security Rule

Never expose AI provider credentials in frontend code.

Do not write API keys directly into:

React components
JavaScript files
HTML
client-side environment variables that are publicly exposed
Git repositories

Use a secure server-side route when an external AI API is required.

33. AI Preview Rule

The concept preview must respond to the user's selected:

business type
project type
design style
features

If real AI generation is available, it may be used.

If not, create a deterministic HTML/CSS concept preview.

Do not call a deterministic preview "AI-generated."

Use wording such as:

"Interactive concept preview"

when it is generated locally.

34. AI Failure Rule

AI services can fail.

If AI generation fails:

show a clear error state
keep the planner working
provide a fallback preview when possible
allow the user to continue

The entire application must not crash because an AI request failed.

35. PDF Rule

The project proposal must be a real A4 PDF.

Do not make browser printing the primary PDF system.

The PDF should use the same planner data as the project summary.

The PDF must not contain hard-coded client information.

36. Proposal Pricing Rule

Keep these separate:

Jiten Creative Co. project/setup fee
+
hosting/platform cost
+
domain cost
+
third-party/API costs

Do not merge third-party charges into Jiten Creative Co. pricing without explanation.

Provider pricing can change.

Use appropriate disclaimers.

37. WhatsApp Rule

WhatsApp requirements must be generated dynamically.

The message should contain the user's actual:

business
project
design
features
budget
contact information
requirements
hosting preference

Do not use a single static message for every client.

38. Clipboard Rule

If a Copy Requirements feature exists:

attempt clipboard API
provide success feedback
provide fallback if clipboard access is unavailable

Do not silently fail.

39. Hosting Rule

Hosting options should be informational and selectable.

Supported options include:

Netlify
Vercel
Render
Cloudflare Pages
Firebase
Supabase
Google Cloud / Cloud Run
Existing hosting
Recommendation

Do not lock the user into one provider.

40. Hosting Pricing Rule

Never state that third-party platform pricing is permanently fixed.

Use wording similar to:

"Provider pricing, free tiers, usage limits, and billing policies are subject to change."

Jiten Creative Co. setup/deployment pricing is separate.

41. Error Handling

Any feature that depends on an external system must have an error state.

Examples:

AI:

AI unavailable
→ use fallback preview

PDF:

Generation failed
→ show error
→ allow retry

Clipboard:

Clipboard unavailable
→ provide selectable text

Live project:

Could not open project
→ provide clear feedback

Do not allow one failed feature to break the entire page.

42. Loading States

Actions that may take noticeable time should have appropriate loading feedback.

Examples:

Generate Concept
Generate PDF
external requests

Do not allow users to repeatedly trigger the same expensive operation without feedback.

Where appropriate, disable the action while processing.

43. No Silent Omissions

If a requested feature cannot be implemented in the current environment:

Do not silently remove it.

Instead:

identify the limitation
implement the best safe fallback
document the limitation
keep the architecture ready for future implementation
44. Privacy Rule

Do not collect unnecessary personal information.

Only request information needed for the project planning workflow.

If information is sent through WhatsApp, make it clear to the user that they are choosing to send their requirements to Jiten Creative Co..

If persistent lead storage is introduced later, privacy requirements must be reviewed again.

45. Local Storage Rule

Local storage may be used for temporary planner persistence.

It must not be presented as secure permanent lead storage.

Do not store sensitive information unnecessarily.

46. No Unnecessary Backend

Do not build a complete backend just because the project may need one in the future.

A backend is justified when required for features such as:

secure AI API calls
database storage
authentication
future admin functionality

Do not overengineer the first version.

47. No Premature CRM

Do not implement:

full CRM
admin dashboard
authentication
database
lead pipeline

unless explicitly requested.

The architecture should be ready for these features later.

48. Testing Rule

After meaningful changes, check:

application startup
build
console errors
broken imports
broken links
responsive layout
keyboard navigation
planner navigation
validation
WhatsApp generation
PDF generation
AI fallback
social links

Do not declare a feature complete simply because the code compiles.

49. Build Rule

Before considering a major phase complete:

run the appropriate build
resolve build errors
check runtime errors
inspect affected UI
test important interactions

Never intentionally leave known build errors.

50. Documentation Rule

When implementation begins, create:

Memory.md

Memory.md should record:

current phase
completed work
current work
known issues
important technical decisions
files changed
next recommended task

Update Memory.md after meaningful phases.

Do not create Memory.md merely to duplicate PRD.md.

51. Documentation Precedence

If project documentation appears to conflict:

Latest explicit user instruction
Rules.md
Architecture.md
PRD.md
Design.md
Phases.md as the implementation sequence

If something is unclear, inspect the existing codebase before making destructive assumptions.

52. Change Discipline

When implementing a feature:

understand the requirement
inspect relevant code
identify reusable components
make the smallest sensible architectural change
implement
test
fix
document important decisions

Avoid unrelated refactoring while implementing a feature.

53. No "Looks Done" Rule

A feature is not complete because:

the button exists
the animation exists
the card exists
the section exists
the code compiles

It is complete when the intended user interaction actually works.

54. Final Principle

The AI is building a real Jiten Creative Co. business website.

Every implementation decision should be evaluated using this question:

"Would this be acceptable if a real client saw and used this website?"

If the answer is no, improve it before considering the work complete.
```
