---
id: 020
title: Cyberpunk UI overhaul, multi-page architecture, Sanity CMS integration, and system hardening
stage: general
date: 2026-10-27
surface: agent
model: gemini-3.8-flash
feature: complete-ui-overhaul
branch: main
user: Osama bin Adnan
command: overhaul portfolio UI, add multi-page routing, integrate Sanity CMS, and harden production deployments
labels: ["cyberpunk-ui", "sanity-cms", "threejs", "projects-page", "certifications-page", "ai-chatbot", "code-cleanup", "cors-fix"]
links:
  spec: specs/001-portfolio-website/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - README.md
  - frontend/app/globals.css
  - frontend/app/layout.tsx
  - frontend/app/page.tsx
  - frontend/app/projects/page.tsx
  - frontend/app/certifications/page.tsx
  - frontend/app/studio/[[...tool]]/page.tsx
  - frontend/app/api/portfolio-data/route.ts
  - frontend/components/layout/Header.tsx
  - frontend/components/layout/Footer.tsx
  - frontend/components/layout/PortfolioShell.tsx
  - frontend/components/sections/HeroSection.tsx
  - frontend/components/sections/ExperienceTimeline.tsx
  - frontend/components/sections/WorkProjects.tsx
  - frontend/components/ui/About.tsx
  - frontend/components/ui/CertificateModal.tsx
  - frontend/components/ui/ChatWidget.tsx
  - frontend/components/ui/CyberTorusKnot.tsx
  - frontend/components/ui/LoadingScreen.tsx
  - frontend/components/ui/MobileMenu.tsx
  - frontend/components/ui/ProjectCard.tsx
  - frontend/components/ui/ProjectModal.tsx
  - frontend/components/ui/ScrollProgressBar.tsx
  - frontend/components/ui/StickySocialSidebar.tsx
  - frontend/components/ui/TechStackBanner.tsx
  - frontend/components/ui/TechStackTabs.tsx
  - frontend/components/ui/WhatsAppFloat.tsx
  - frontend/lib/sanity/client.ts
  - frontend/lib/sanity/image.ts
  - frontend/lib/sanity/queries.ts
  - frontend/lib/store/useChatStore.ts
  - frontend/lib/types/index.ts
  - frontend/schemas/index.ts
  - backend/app/agent.py
  - backend/app/api.py
  - backend/app/config.py
  - backend/app/db.py
tests:
  - npx tsc --noEmit
  - npm run build
  - Sanity CORS origin verification (HTTP 200)
  - Hugging Face backend health check (HTTP 200)
---

## Prompt

Execute a comprehensive UI overhaul and architectural upgrade transforming the portfolio from the previous purple design into a cutting-edge cyberpunk HUD interface. Integrate headless Sanity CMS for dynamic content, create dedicated multi-page routes for projects and certifications, integrate Three.js geometric wireframes, upgrade the autonomous AI assistant (OBIN) with live context injection and rate limits, prune unused legacy code, and resolve production deployment CORS configurations.

---

## Detailed Summary of Changes

### 1. Visual Overhaul: From Generic Purple to Cyberpunk HUD Aesthetics
- **Previous Interface**: Conventional single-page layout utilizing purple accent themes (`#a73dff`), rounded pill buttons, standard sans-serif typography (Inter / Space Grotesk), and static JSON data.
- **New Cyberpunk Theme**:
  - **Color Palette**: High-contrast cyberpunk palette strictly centered around **Neon Cyan** (`#00f0ff`), **Cyber Magenta/Red** (`#ff0055` / `#ff007f`), and **Matrix Green** (`#00ff9f`) on an obsidian cyber-grid backdrop (`#05060b` / `#07080f`).
  - **Typography**: Complete migration to technical monospace typography (`JetBrains Mono`) with uppercase telemetry tags, status badges (`[SYS: ACTIVE // v2.6]`, `ONLINE`), and prompt terminals.
  - **HUD Styling**: Angled corner cuts (`hud-corner-tl`, `hud-corner-br`), wireframe bounding boxes, scanline backgrounds, glowing ambient radial backlights, and telemetry indicators.

### 2. Interactive 3D Graphics
- Engineered a lightweight Three.js 3D Wireframe canvas ([CyberTorusKnot.tsx](file:///h:/giaic/My-Portfolio-App/frontend/components/ui/CyberTorusKnot.tsx)) rendering a quantum torus knot with an internal pulsing plasma core that smoothly rotates and tracks cursor movement.
- Integrated an in-frame photo toggle (`[VIEW PHOTO]`) allowing visitors to alternate between the mathematical 3D wireframe and the developer's high-resolution portrait.

### 3. Multi-Page Architecture & Route Expansion
- **Dedicated Projects Directory (`/projects`)**:
  - Full-page showcase with category tabs (AI Engineering, FullStack, Frontend, etc.).
  - Interactive project cards with live demo links, source code repositories, and telemetry specs.
  - Modal view ([ProjectModal.tsx](file:///h:/giaic/My-Portfolio-App/frontend/components/ui/ProjectModal.tsx)) displaying full descriptions, technology tags, and preview graphics.
- **Dedicated Certifications Page (`/certifications`)**:
  - Dedicated showcase presenting verified credentials (Anthropic, Google Digital Garage, IDM Pakistan, Panaversity).
  - High-resolution modal ([CertificateModal.tsx](file:///h:/giaic/My-Portfolio-App/frontend/components/ui/CertificateModal.tsx)) with credential IDs, verification links, and skill tags.
- **Embedded Sanity Studio (`/studio`)**:
  - Native embedded Sanity Studio v3 route allowing direct CMS administration.
- **Route Redirects**:
  - Maintained `/work` with an automated Next.js server-side redirect to `/projects`.

### 4. Dynamic Sanity CMS Integration
- Replaced static `data.json` files with live Sanity CMS schemas and GROQ queries:
  - `profile`: Bio, coordinates, stats counters, and customizable `rotatingTitles`.
  - `project`: Title, description, categories, tech stack, and media assets.
  - `certification`: Credential name, issuer, issue date, credential ID, and badge images.
  - `experience`: Chronological career timeline nodes.
  - `techItem`: Categorized technology matrices.
- Added dynamic `rotatingTitles` schema field enabling the hero section's rotating terminal roles (`AGENTIC AI DEVELOPER`, `WEB DEVELOPER`, `DIGITAL MARKETER`) to be configured directly within Sanity Studio without redeployment.
- Created `/api/portfolio-data` route to aggregate Sanity data into a cached JSON payload consumed by the backend AI agent.

### 5. OBIN AI Chatbot & Backend Upgrades
- Decoupled chatbot from client-side keyword fallbacks to a high-performance **FastAPI** backend running the **OpenAI Agents SDK** and **OpenRouter** model failover.
- Persistent session storage and daily fair-use rate limiting (3 questions/day per email) enforced via **Supabase**.
- Grounded prompt context: The agent dynamically receives live portfolio JSON from `/api/portfolio-data`.
- Removed legacy placeholder suggestions (e.g. outdated "CAARE" prompt button) and updated prebuilt queries to polite, professional questions (`"What certifications has Osama earned?"`).
- Added explicit keyword detection for `wants_certifications` in the backend so credential queries immediately return complete certification records.

### 6. Production Deployment & Sanity CORS Resolution
- **Frontend**: Hosted on **Vercel** (`https://osamabinadnan.vercel.app/`).
- **Backend**: Hosted on **Hugging Face Spaces** Docker container (`https://osamabinadnan-my-portfolio-backend.hf.space/`).
- **CORS Resolution**: Diagnosed and resolved client-side HTTP 403 Forbidden errors by programmatically registering `https://osamabinadnan.vercel.app` into Sanity's allowed CORS origins via the Sanity Management API.

### 7. Codebase Pruning & UI Polish
- Safely deleted 7 obsolete/unreferenced experimental files:
  - `frontend/components/ui/Avatar3D.tsx`
  - `frontend/components/ui/CelestialOrrery.tsx`
  - `frontend/components/ui/SplineAvatar.tsx`
  - `frontend/components/ui/ThreeDScene.tsx`
  - `frontend/components/ui/ExperienceBackground.tsx`
  - `frontend/components/ui/HoverLink.tsx`
  - `frontend/components/ui/ProjectTabs.tsx`
- Deleted unused serverless route `frontend/app/api/ai/chat/route.ts` and empty directories.
- Cleaned default Next.js starter assets from `public/`.
- Updated Threads icon in [StickySocialSidebar.tsx](file:///h:/giaic/My-Portfolio-App/frontend/components/ui/StickySocialSidebar.tsx) to match the official `@` spiral SVG icon in the footer.
- Removed hardcoded project ID strings (`5os8958v`) across all files, strictly enforcing environment variable loading.

---

## Outcome

- ✅ **Visual Excellence**: Successfully deployed a responsive cyberpunk HUD aesthetic with high visual hierarchy, fluid animations, and 3D wireframe visuals.
- ✅ **Dynamic Management**: 100% of portfolio content (projects, certifications, hero roles, timeline, bio) is dynamically managed via Sanity CMS.
- ✅ **Clean Codebase**: Removed all legacy dead code, hardcoded project IDs, and mock routes.
- 🧪 **Verification**: TypeScript compilation (`npx tsc --noEmit`) passes with 0 errors; live Vercel frontend and Hugging Face backend verify HTTP 200 with active CORS headers.
