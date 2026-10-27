# Portfolio Application - Osama bin Adnan

Modern cyberpunk-styled full-stack portfolio website featuring an autonomous AI chatbot assistant (**OBIN**), dynamic headless content management via **Sanity CMS**, and a high-performance **FastAPI** backend with **Supabase** session management.

**Live Website**: [https://osamabinadnan.vercel.app/](https://osamabinadnan.vercel.app/)  
**Backend API (Hugging Face)**: [https://osamabinadnan-my-portfolio-backend.hf.space](https://osamabinadnan-my-portfolio-backend.hf.space)

---

## 🌟 Overview

A modern personal portfolio engineered with a cyberpunk HUD terminal aesthetic to showcase full-stack web applications, agentic AI systems, professional experience, verified certifications, and technical skills. 

### Key Highlights
- **Dynamic Content Management**: Powered by **Sanity CMS Studio** embedded at `/studio` for real-time updates to projects, certifications, work experiences, skills, and profile details without code changes.
- **OBIN (AI Assistant)**: Autonomous conversational agent powered by the **OpenAI Agents SDK** and **OpenRouter**, grounded in live portfolio data, backed by Supabase with persistent session storage and daily query limits.
- **Visual & Interactive Design**: 3D wireframe geometries with Three.js (`CyberTorusKnot`), micro-interactions with Framer Motion, GSAP entrance sequences, and cyber-grid HUD components.
- **Decoupled Architecture**: Next.js 16 frontend hosted on **Vercel** with a Python FastAPI backend deployed on **Hugging Face Spaces**.

---

## 🚀 Tech Stack

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router) + [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **CMS**: [Sanity.io](https://www.sanity.io/) (Headless CMS + Sanity Studio v3)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/) & [GSAP](https://gsap.com/)
- **3D Graphics**: [Three.js](https://threejs.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Hosting**: [Vercel](https://vercel.com/)

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.12+)
- **AI Agent**: [OpenAI Agents SDK](https://github.com/openai/openai-agents-python)
- **Model Routing**: [OpenRouter](https://openrouter.ai/) (NVIDIA Nemotron / Gemma / Claude / OpenAI models with automatic failover)
- **Database**: [Supabase](https://supabase.com/) (PostgreSQL with Row Level Security)
- **Package Manager**: [uv](https://astral.sh/uv)
- **Hosting**: [Hugging Face Spaces](https://huggingface.co/spaces) (Docker containerized)

---

## 📁 Complete Project Structure

```
My-Portfolio-App/
│
├── frontend/                               # Next.js Application
│   ├── app/                                # App Router Pages & Endpoints
│   │   ├── api/
│   │   │   └── portfolio-data/route.ts     # JSON endpoint supplying Sanity data to AI agent
│   │   ├── certifications/page.tsx         # Verified certifications showcase
│   │   ├── projects/page.tsx               # Filterable projects directory
│   │   ├── studio/[[...tool]]/page.tsx     # Embedded Sanity Studio CMS
│   │   ├── work/page.tsx                   # Redirect route to /projects
│   │   ├── globals.css                     # Cyberpunk styles, HUD utility classes & grid
│   │   ├── layout.tsx                      # Root layout, theme provider & metadata
│   │   ├── not-found.tsx                   # Cyberpunk 404 error terminal
│   │   └── page.tsx                        # Main landing page
│   │
│   ├── components/                         # Modular React Components
│   │   ├── layout/                         # Core Shell & Navigation
│   │   │   ├── Footer.tsx                  # System communication footer & coordinates
│   │   │   ├── Header.tsx                  # HUD top navigation bar & quick links
│   │   │   └── PortfolioShell.tsx          # Wrapper handling audio/sidebar/overlays
│   │   ├── sections/                       # Homepage Sections
│   │   │   ├── ExperienceTimeline.tsx      # Chronological career trajectory
│   │   │   ├── HeroSection.tsx             # Interactive 3D hero with dynamic rotating roles
│   │   │   └── WorkProjects.tsx            # Featured projects showcase
│   │   ├── ui/                             # Specialized UI Elements
│   │   │   ├── About.tsx                   # Developer bio, core mission & direct contact
│   │   │   ├── CertificateModal.tsx        # High-resolution certificate viewer
│   │   │   ├── ChatWidget.tsx              # OBIN AI terminal chat dialog & suggestions
│   │   │   ├── CyberTorusKnot.tsx          # Interactive 3D wireframe canvas
│   │   │   ├── LoadingScreen.tsx           # Cyberpunk boot simulation screen
│   │   │   ├── MobileMenu.tsx              # Fullscreen mobile navigation overlay
│   │   │   ├── ProjectCard.tsx             # HUD project card with hover telemetry
│   │   │   ├── ProjectModal.tsx            # In-depth project details modal
│   │   │   ├── ScrollProgressBar.tsx       # Top holographic scroll indicator
│   │   │   ├── StickySocialSidebar.tsx     # Floating collapsible social coordinates
│   │   │   ├── TechStackBanner.tsx         # Infinite scrolling tech marquee
│   │   │   ├── TechStackTabs.tsx           # Category-filtered skill matrices
│   │   │   └── WhatsAppFloat.tsx           # Quick WhatsApp direct connect
│   │   └── ThemeProvider.tsx               # Context theme provider
│   │
│   ├── lib/                                # Core Utilities & Integrations
│   │   ├── sanity/
│   │   │   ├── client.ts                   # Sanity client instance
│   │   │   ├── image.ts                    # Sanity image URL builder
│   │   │   └── queries.ts                  # GROQ queries for CMS content
│   │   ├── store/
│   │   │   ├── useChatStore.ts             # Zustand store for OBIN chatbot state
│   │   │   └── useThemeStore.ts            # Zustand store for theme toggles
│   │   └── types/
│   │       └── index.ts                    # Shared TypeScript definitions
│   │
│   ├── public/                             # Optimized Static Assets
│   │   ├── apple-icon.png                  # Apple touch icon
│   │   ├── favicon.ico                     # Favicon
│   │   ├── icon.png                        # App icon
│   │   ├── Neon Cyan Geometric O.webp      # Vector site branding logo
│   │   ├── osama-about.png                 # Developer portrait
│   │   └── OsamabinAdnan-Resume.pdf        # Verified downloadable resume
│   │
│   ├── schemas/
│   │   └── index.ts                        # Sanity document schemas (profile, project, etc.)
│   ├── sanity.config.ts                    # Sanity Studio configuration
│   ├── next.config.ts                      # Next.js build & image domain configuration
│   └── package.json                        # Frontend dependencies & scripts
│
├── backend/                                # FastAPI Application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── agent.py                        # OpenAI Agents SDK initialization & rules
│   │   ├── api.py                          # FastAPI endpoints, CORS & session routing
│   │   ├── config.py                       # Environment validation & failover models
│   │   └── db.py                           # Supabase queries & rate limit enforcement
│   ├── Dockerfile                          # Production container for Hugging Face Spaces
│   ├── main.py                             # API server entrypoint (Uvicorn)
│   ├── pyproject.toml                      # Python dependencies (managed via uv)
│   └── requirements.txt                    # Standard requirements for deployments
│
├── .gitignore                              # Git exclusion rules
└── README.md                               # Project documentation
```

---

## ✨ Key Features & Functionality

### 1. OBIN - Autonomous AI Portfolio Assistant
- **Name**: `OBIN` (Osama's Binary Intelligence Node)
- **Architecture**: Powered by the **OpenAI Agents SDK** with model failover via **OpenRouter** (`NVIDIA Nemotron`, `Google Gemma`, etc.).
- **Grounded Responses**: Fetches live portfolio data from `/api/portfolio-data` so the agent always knows the latest projects, tech stack, and experience without model retraining.
- **Lead Capture & Verification**: Requires visitor name and email to initialize a session.
- **Fair-Use Protection**: Enforces a strict daily limit (default 3–5 queries per email per day) tracked in Supabase.
- **Safe Answers**: Restricted to professional topics (projects, skills, credentials, contact) with guardrails against hallucinations or personal questions.

### 2. Headless Content Management (Sanity Studio)
- Direct access to manage content at `/studio` in development or production.
- **Profile**: Full name, title, bio, stats counters, and rotating hero titles.
- **Projects**: Title, description, categories, deployment URLs, GitHub repositories, and preview mockups.
- **Certifications**: Credential name, issuer, issue date, credential ID, badge graphics, and verification URLs.
- **Tech Stack**: Technologies organized by categories (AI Engineering, Frontend, Backend, DevOps, Digital Marketing).
- **Experiences**: Timeline nodes with year, company, role, and description.

### 3. Cyberpunk Visual Experience
- **Color Palette**:
  - Neon Cyan (`#00f0ff`) - Primary telemetry & active states
  - Neon Magenta (`#ff007f` / `#ff0055`) - Secondary accents & alert nodes
  - Matrix Green (`#00ff9f`) - System online status & verification indicators
  - Void Black (`#05060b` / `#07080f`) - High-contrast backdrop with cyber-grid overlays
- **3D Interactive Wireframe**: Canvas rendering an interactive mathematical Torus Knot that reacts to hover and viewport sizing.
- **Micro-interactions**: Corner notches, HUD bounding boxes, scanlines, and animated pulse glows.

---

## 🛠️ Local Development Setup

### Prerequisites
- **Node.js**: v18.17+ or v20+
- **Python**: v3.12+
- **uv** (recommended): `curl -LsSf https://astral.sh/uv/install.sh | sh` (or `pip`)
- **Sanity Account**: For CMS content management
- **Supabase Project**: For chat session storage
- **OpenRouter API Key**: For AI agent responses

---

### 1. Clone Repository
```bash
git clone https://github.com/OsamabinAdnan/My-Portfolio-App.git
cd My-Portfolio-App
```

---

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create your local environment file `.env.local`:
   ```env
   # Sanity CMS Configuration
   NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
   NEXT_PUBLIC_SANITY_DATASET=production
   NEXT_PUBLIC_SANITY_API_VERSION=2024-03-01
   SANITY_API_TOKEN=your_sanity_api_read_write_token

   # Backend API URL (for OBIN chatbot)
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.  
   Sanity Studio is accessible at [http://localhost:3000/studio](http://localhost:3000/studio).

---

### 3. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd ../backend
   ```
2. Install dependencies with `uv`:
   ```bash
   uv sync
   ```
3. Create your backend environment file `.env`:
   ```env
   # Supabase Database
   SUPABASE_URL=https://your-project.supabase.co
   SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
   SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
   SUPABASE_ANON_KEY=your-supabase-anon-key

   # OpenRouter LLM Provider
   OPENROUTER_API_KEY=sk-or-v1-your-openrouter-key
   BASE_URL=https://openrouter.ai/api/v1
   MODEL_NAME=nvidia/nemotron-3.5-lightning:free
   MODEL_FALLBACKS=google/gemma-4-26b-a4b-it:free,arcee-ai/trinity-large-thinking:free

   # Chat Rules
   CHAT_MAX_QUESTIONS_PER_EMAIL_PER_DAY=3

   # Portfolio data source (points to frontend API)
   PORTFOLIO_DATA_URL=http://localhost:3000/api/portfolio-data
   ```
4. Start the FastAPI server:
   ```bash
   uv run uvicorn main:app --reload --port 8000
   ```
   Backend API documentation will be available at:
   - Swagger UI: [http://localhost:8000/docs](http://localhost:8000/docs)
   - Health Check: [http://localhost:8000/health](http://localhost:8000/health)

---

### 4. Database Schema (Supabase)

Execute the following script in your **Supabase SQL Editor** to initialize the database:

```sql
-- Create chat sessions table
CREATE TABLE IF NOT EXISTS chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  questions_used INT NOT NULL DEFAULT 0,
  max_questions INT NOT NULL DEFAULT 3,
  status TEXT NOT NULL DEFAULT 'active'
);

-- Create chat messages table
CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id UUID REFERENCES chat_sessions(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL
);

-- Performance indexes
CREATE INDEX IF NOT EXISTS idx_chat_sessions_email ON chat_sessions(email);
CREATE INDEX IF NOT EXISTS idx_chat_messages_session_id ON chat_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_chat_messages_created_at ON chat_messages(created_at);

-- Increment counter function
CREATE OR REPLACE FUNCTION increment_questions_used(session_id_param UUID)
RETURNS void AS $$
BEGIN
  UPDATE chat_sessions
  SET questions_used = questions_used + 1
  WHERE id = session_id_param;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable Row Level Security (RLS)
ALTER TABLE chat_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE chat_messages ENABLE ROW LEVEL SECURITY;

-- Backend accesses tables via service role key; revoke anon access
REVOKE ALL ON chat_sessions FROM anon;
REVOKE ALL ON chat_messages FROM anon;
```

---

## 📡 API Endpoints

### Frontend Endpoints
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/api/portfolio-data` | Aggregates all Sanity documents (profile, projects, certifications, skills) into structured JSON consumed by the backend AI agent. |

### Backend Endpoints
| Method | Path | Description |
| :--- | :--- | :--- |
| `GET` | `/` | API status, version, and feature capabilities. |
| `GET` | `/health` | Healthcheck endpoint (`{"ok": true}`). |
| `POST` | `/chat/start` | Validates user lead info, initializes session in Supabase, and returns remaining question quota. |
| `POST` | `/chat/message` | Verifies rate limits, runs the AI agent using live Sanity context, records the message history, and returns the response. |

---

## 🚢 Production Deployment

### Frontend (Vercel)
1. Import repository into [Vercel](https://vercel.com).
2. Set Root Directory to `frontend`.
3. Configure Environment Variables in Vercel Project Settings:
   - `NEXT_PUBLIC_SANITY_PROJECT_ID`
   - `NEXT_PUBLIC_SANITY_DATASET`
   - `NEXT_PUBLIC_SANITY_API_VERSION`
   - `SANITY_API_TOKEN`
   - `NEXT_PUBLIC_API_URL` (Points to your Hugging Face Space URL, e.g., `https://osamabinadnan-my-portfolio-backend.hf.space`)
4. **Important**: Add your Vercel URL (e.g. `https://osamabinadnan.vercel.app`) to your Sanity Project -> **API** -> **CORS origins** with credentials enabled.

### Backend (Hugging Face Spaces)
1. Create a new **Docker Space** on Hugging Face.
2. Link the repository or push the `backend/` directory with the included `Dockerfile`.
3. Add Repository Secrets in Space Settings:
   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `SUPABASE_PUBLISHABLE_KEY`
   - `SUPABASE_ANON_KEY`
   - `OPENROUTER_API_KEY`
   - `BASE_URL`
   - `PORTFOLIO_DATA_URL` (`https://osamabinadnan.vercel.app/api/portfolio-data`)
   - `CHAT_MAX_QUESTIONS_PER_EMAIL_PER_DAY`

---

## 👤 Author

**Osama bin Adnan**  
*Agentic AI Developer | FullStack Web Developer | Digital Marketer*  
📍 Karachi, Pakistan  
- **Website**: [osamabinadnan.vercel.app](https://osamabinadnan.vercel.app/)  
- **LinkedIn**: [linkedin.com/in/osama-bin-adnan](https://www.linkedin.com/in/osama-bin-adnan/)  
- **GitHub**: [@OsamabinAdnan](https://github.com/OsamabinAdnan)  
- **X / Twitter**: [@osamabinadnan1](https://x.com/osamabinadnan1)  
- **Email**: [imosamabinadnan@gmail.com](mailto:imosamabinadnan@gmail.com)  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
