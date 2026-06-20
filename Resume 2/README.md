# ResumePro — AI-Powered Resume Builder

A full-stack resume builder with 3D animations, domain-specific content, AI assistant, and real-time PDF preview.

## Features

- 🤖 **AI Resume Assistant** — smart suggestions for every domain
- 🎨 **6 Professional Templates** — with realistic SVG previews
- 🌐 **20+ Career Domains** — tailored placeholders, skills & certifications per domain
- 📄 **13-Step Guided Builder** — with live A4 preview
- ⚡ **ATS Optimisation** — keyword hints and score tracking
- 📊 **Dashboard** — manage resumes, track downloads, browse templates by domain
- 🔐 **Auth** — sign up / sign in (works offline with localStorage fallback)
- 🗄️ **Neon PostgreSQL** — cloud database (optional, falls back to localStorage)
- 🚀 **3D Animations** — Three.js / React Three Fiber scenes

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion
- **3D**: Three.js, @react-three/fiber, @react-three/drei
- **Backend**: Express.js, Drizzle ORM
- **Database**: Neon PostgreSQL (serverless)
- **Auth**: JWT sessions

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/YOUR_USERNAME/resume-pro.git
cd resume-pro
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Edit `.env` and add your Neon database URL (get a free one at [neon.tech](https://neon.tech)).

### 4. Run database migrations

```bash
npm run db:migrate
```

### 5. Start the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

> **Note:** The app works fully without a database — it falls back to localStorage for auth and resume storage automatically.

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run db:migrate` | Run database migrations |
| `npm run db:generate` | Generate new migrations |
| `npm run typecheck` | TypeScript type checking |

## Project Structure

```
client/          # React frontend
  pages/         # Page components
  components/    # Shared components
  lib/           # API client, domain config
server/          # Express backend
  routes/        # API routes (auth, resumes, users)
drizzle/         # Database schema & migrations
shared/          # Shared TypeScript types
```

## License

MIT
