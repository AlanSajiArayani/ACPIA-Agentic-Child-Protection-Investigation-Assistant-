# ACPIA — Agentic Child Protection Investigation Assistant

An investigation-support prototype for authorized investigators, powered by autonomous multi-agent orchestration, graph database correlation, vector similarity search, and local air-gapped AI inference.

> [!CAUTION]
> **CRITICAL SYNTHETIC DATA NOTICE**
> ACPIA is designed and tested exclusively using **synthetic / fictional data**. Under no circumstances should real-world, actual child protection evidence or real personal data be introduced into this software environment.

---

## Key Features & Product Vision

- **Genuinely Agentic Architecture (Not a Chatbot)**: ACPIA rejects conversational chatbot paradigms in favor of goal-driven, autonomous task execution.
- **8-Stage Control Loop**:
  $$\text{Observe} \longrightarrow \text{Plan} \longrightarrow \text{Delegate} \longrightarrow \text{Execute Tools} \longrightarrow \text{Observe Results} \longrightarrow \text{Correlate} \longrightarrow \text{Verify} \longrightarrow \text{Human Review}$$
- **Multi-Database Knowledge Engine**:
  - **PostgreSQL + pgvector**: Immutable audit logs, case metadata, and high-dimensional multi-modal vector search.
  - **Neo4j 5 Community Edition**: Graph analysis for entity linking, pseudonym tracking, and relationship visualization.
- **Air-Gapped Privacy**: Local LLM inference powered by containerized **Ollama** (Llama 3 / Mistral).
- **Human-in-the-Loop Safeguards**: Critical decision gates require explicit investigator sign-off before actions are executed or final reports generated.

---

## Target Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | Next.js 14, React 18, TypeScript, Tailwind CSS |
| **Backend** | Python 3.11, FastAPI, Pydantic v2 |
| **Agents** | Custom Autonomous Agent Loop (Planner, Re-planner, State Engine) |
| **Tool Registry** | Sandboxed Python Tools (Media, Text, Network analysis) |
| **Orchestration** | Self-hosted n8n (Docker) |
| **Local AI** | Ollama Engine |
| **Databases** | PostgreSQL 16 + pgvector, Neo4j 5 Community Edition |
| **Infrastructure** | Docker & Docker Compose |

---

## Directory Structure

```
ACPIA/
├── frontend/                  # Next.js UI dashboard & agent monitor
├── backend/                   # FastAPI gateway & WebSocket engine
├── agents/                    # Autonomous agent framework (Core & Specialized)
├── tools/                     # Sandboxed tool execution registry
├── data/
│   └── synthetic/             # Synthetic evidence datasets & schemas
├── database/                  # PostgreSQL init.sql & Neo4j init.cypher
├── n8n/                       # Workflow orchestration configs
├── docker/                    # Docker container definitions
├── docs/
│   └── ARCHITECTURE.md        # Comprehensive system architecture & data flows
├── docker-compose.yml         # 6-service local development stack
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # Project landing page
```

---

## Getting Started

### Prerequisites
- Docker Engine v24+ and Docker Compose v2+
- Git

### Launching the Stack
1. Clone the repository:
   ```bash
   git clone https://github.com/AlanSajiArayani/ACPIA-Agentic-Child-Protection-Investigation-Assistant-.git
   cd ACPIA-Agentic-Child-Protection-Investigation-Assistant-
   ```
2. Create your local environment file:
   ```bash
   cp .env.example .env
   ```
3. Start all services using Docker Compose:
   ```bash
   docker-compose up -d --build
   ```
4. Access the services:
   - **Frontend Dashboard**: `http://localhost:3000`
   - **FastAPI API Documentation**: `http://localhost:8000/docs`
   - **Neo4j Browser**: `http://localhost:7474`
   - **n8n Workflow Editor**: `http://localhost:5678`
   - **Ollama Engine**: `http://localhost:11434`

---

## Project Status & Implementation Roadmap

### Currently Created (Phase 1 Architecture Setup)
- [x] Initial Monorepo Structure (`frontend`, `backend`, `agents`, `tools`, `data/synthetic`, `database`, `n8n`, `docker`)
- [x] Global Configuration (`docker-compose.yml`, `.env.example`, `.gitignore`)
- [x] System Architecture Documentation (`docs/ARCHITECTURE.md`)
- [x] Frontend Next.js / TypeScript / Tailwind CSS skeleton files & manifest
- [x] Backend FastAPI skeleton, requirements, and Dockerfile
- [x] Database initializations (PostgreSQL + pgvector `init.sql`, Neo4j `init.cypher`)
- [x] Framework READMEs for `agents/`, `tools/`, `data/synthetic/`, `database/`, `n8n/`, and `docker/`

### Remaining to be Implemented (Future Tasks)
- [ ] Agent Core Execution Engine (Planner, Delegator, Re-planner loop implementation)
- [ ] Sandboxed Tool Implementations (`media/`, `text/`, `network/` functional tool scripts)
- [ ] FastAPI Endpoints & WebSocket streaming handlers
- [ ] Next.js Interactive Dashboard UI components (Agent Execution Tree, Entity Graph viewer, Human Gate Modal)
- [ ] Sample Synthetic Data Generators & Ingestion Scripts
- [ ] n8n Workflow Exports and Automation Templates

---

## License & Safety Policy
ACPIA is an experimental hackathon prototype intended for authorized research and demonstration purposes using synthetic data only.
