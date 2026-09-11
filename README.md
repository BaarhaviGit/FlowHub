# FlowHub — The GitHub for Automations

Discover, share, and 1-click deploy production-ready **n8n workflows**. Stop reinventing the wheel — FlowHub is the open-source marketplace where builders publish automation workflows, fork others, and push them to the cloud in a single click.

![FlowHub](frontend/public/favicon.svg)

## Why FlowHub?

n8n is the most flexible automation engine out there, but great workflows stay buried in private instances and unsearchable blog exports. FlowHub treats workflows the way GitHub treats code:

- 🚀 **1-click deploy** — push any workflow to autoscaling infrastructure, webhook live in under a minute
- 🔍 **Searchable marketplace** — browse by category and tags, find exactly the automation you need
- 🔄 **Fork & remix** — take a workflow, adapt it, and share your version back
- 🧩 **Integration-native** — built for the n8n ecosystem (200+ integrations and counting)
- ☁️ **Zero DevOps** — no VPS instances, no reverse proxies, no Docker drilling
- 🆓 **100% open source** — MIT-licensed, self-hostable stack

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 19, TypeScript, Vite 8, Tailwind CSS 3.4, Framer Motion 12, shadcn/ui, lucide-react |
| Backend | Spring Boot 4 (Java 17), Spring Security + JWT, Spring Data JPA, WebFlux |
| Database | PostgreSQL 15 (+ H2 for local dev), shared instance with a dedicated `n8n` schema |
| Automation | n8n (self-hosted via Docker Compose) |
| Deploy | Frontend on Vercel, Backend on Render |
| Auth | JWT (stateless) with bcrypt password hashing |

## Architecture

```
┌────────────────┐      ┌──────────────────┐      ┌─────────────┐
│   React SPA    │─────▶│  Spring Boot API │─────▶│  PostgreSQL │
│   (Vercel)     │ http │  (Render)        │ JPA  └──────┬──────┘
└────────────────┘      └───────┬──────────┘            │ n8n schema
                               │ n8n service            ▼
                          ┌─────▼─────────┐         ┌─────────┐
                          │  n8n runner   │───────▶│ webhook │
                          └───────────────┘        └─────────┘
```

- The **React SPA** talks to the Spring Boot REST API over HTTP.
- The **Spring Boot API** owns auth, workflow metadata, search, downloads, and deployment orchestration.
- **n8n** executes workflows and exposes webhook URLs; it lives in its **own Postgres schema** (`n8n`) so its tables never collide with the app's tables.

## Getting Started

### Prerequisites

- Node.js 20+
- Java 17+ (JDK)
- Docker + Docker Compose (for Postgres + n8n)
- Maven (or use the included `mvnw` wrapper)

### 1. Clone & install

```bash
git clone https://github.com/BaarhaviGit/FlowHub.git
cd FlowHub
```

### 2. Backend

```bash
cd backend
./mvnw spring-boot:run        # Linux/macOS
mvnw.cmd spring-boot:run      # Windows
```

The API boots at `http://localhost:8080/api`. A `DataSeeder` populates sample workflows on first start, so the marketplace isn't empty.

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

The app runs at `http://localhost:5173`. By default it points to `http://localhost:8080/api` — swapping in your own backend is a one-line change in `frontend/.env.development`.

### 4. Infrastructure (optional — needed for real deploys)

```bash
docker compose up -d
```

Boots **PostgreSQL 15** (`flowhub-db`, port 5432) and **n8n** (`flowhub-n8n`, port 5678). The `init-schemas.sql` script runs on first boot to create the dedicated `n8n` schema. n8n's UI is protected behind basic auth (`admin` / `changeme` — change it!).

> **Note:** The current deploy endpoint (`POST /api/workflows/{id}/deploy`) is a **mock implementation** for the MVP/portfolio stage — it simulates the delay and returns a canned success response. Wiring it to real n8n instance adoption is on the roadmap.

## API Reference

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| `POST` | `/api/auth/register` | — | Create account (username, email, password) |
| `POST` | `/api/auth/login` | — | Authenticate, receive JWT |
| `GET` | `/api/workflows` | — | List all workflows |
| `GET` | `/api/workflows/{id}` | — | Get workflow by ID |
| `GET` | `/api/workflows/search?q=` | — | Search workflows by title/description/tags |
| `POST` | `/api/workflows` | ✅ JWT | Upload a workflow (multipart: title, description, category, tags, file) |
| `GET` | `/api/workflows/download/{id}` | — | Download a workflow's JSON file |
| `POST` | `/api/workflows/{id}/deploy` | ✅ JWT | Deploy a workflow (currently mocked) |
| `GET` | `/api/workflows/{id}/status` | — | Get workflow deployment status |

All protected endpoints expect `Authorization: Bearer <jwt>`.

## Project Structure

```
FlowHub/
├── backend/                     # Spring Boot REST API
│   ├── src/main/java/com/flowhub/backend/
│   │   ├── controller/          # AuthController, WorkflowController
│   │   ├── service/             # AuthService, WorkflowService, N8nService
│   │   ├── repository/          # JPA repositories
│   │   ├── entity/              # User, Workflow
│   │   ├── security/            # JWT filter, token provider, user details
│   │   ├── config/              # SecurityConfig, DataSeeder
│   │   └── dto/                 # LoginRequest, RegisterRequest, JwtAuthResponse
│   └── pom.xml
├── frontend/                    # React SPA
│   └── src/
│       ├── pages/               # Home, Explore, WorkflowDetails, Upload, Login, Register
│       ├── components/          # Navbar, WorkflowCard, NodeCanvas, LogoMark, Layout, ...
│       ├── api/                 # axios client + workflow API
│       ├── context/             # AuthContext
│       └── lib/                 # api helpers, utils
├── supabase/migrations/         # SQL migrations
├── docker-compose.yml           # Postgres 15 + n8n
├── init-schemas.sql             # Creates the dedicated `n8n` schema
└── test-deploy.js               # Deploy smoke-test script
```

## Design

FlowHub's identity is a **"Blueprint"** aesthetic built for automation natives:

- **Warm bone paper** base with **ink** (deep green-black) sections — reads like a technical blueprint
- **Volt-lime** (`hsl(79, 90%, 55%)`) accent for actions, nodes, and live signals
- **Instrument Serif italic** for expressive headlines, **JetBrains Mono** for anything technical
- Animated **node-graph hero**, marquee integration ticker, count-up stats, and a custom **feedback-loop logo mark** — the site *feels* like the automation it sells

## Roadmap

- [ ] Real n8n deployment orchestration (replace mock deploy endpoint)
- [ ] Forking & versioning workflows (GitHub-style history)
- [ ] GitHub OAuth sign-in
- [ ] Deploy logs / webhook testing UI
- [ ] Rating & review system
- [ ] React Compiler enablement + route-level code splitting

## Contributing

Contributions are what make the open-source community amazing. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

## Built With ♥ by baarhavi

- GitHub: [BaarhaviGit](https://github.com/BaarhaviGit)
- Project: [BaarhaviGit/FlowHub](https://github.com/BaarhaviGit/FlowHub)