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
- **Air-Gapped Privacy**: Local LLM inference powered by host **Ollama** (`qwen3:4b`).
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
| **Local AI** | Ollama Engine on Host (`qwen3:4b`) |
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
├── n8n/                       # Workflow orchestration configs & JSON workflows
│   └── workflows/             # Exported n8n test & pipeline workflows
├── docker/                    # Docker container definitions
├── docs/
│   └── ARCHITECTURE.md        # Comprehensive system architecture & data flows
├── docker-compose.yml         # 6-service local development stack
├── .env.example               # Environment variables template
├── .gitignore                 # Git ignore rules
└── README.md                  # Project landing page
```

---

## Ollama & Dockerized n8n Local AI Integration (Phase 8.2)

### 1. Host Ollama Installation Requirement
- Download and install Ollama on Windows from [https://ollama.com](https://ollama.com).
- Download the required local model:
  ```powershell
  ollama pull qwen3:4b
  ```
- Verify Ollama is responding on the Windows host:
  - Base URL: `http://localhost:11434`
  - Model Endpoint: `http://localhost:11434/api/generate`

### 2. Windows + Docker Desktop Networking Explanation
- Containers inside Docker on Windows cannot use `localhost` to reach services running on the host OS (`localhost` inside a container targets the container itself).
- ACPIA uses **`host.docker.internal`** configured in `docker-compose.yml` via:
  ```yaml
  extra_hosts:
    - "host.docker.internal:host-gateway"
  ```
- n8n communicates with Ollama via environment variable:
  ```env
  OLLAMA_BASE_URL=http://host.docker.internal:11434
  ```

### 3. Executing the n8n Connectivity Test Workflow
1. Start the Docker stack including n8n:
   ```powershell
   docker-compose up -d n8n
   ```
2. Open n8n in your browser at `http://localhost:5679` (or port `5678`).
3. Import the workflow JSON located at:
   `n8n/workflows/acpia_ollama_test_workflow.json`
4. Click **Test workflow** on the manual trigger.
5. The HTTP Request node sends a prompt to `qwen3:4b` via `http://host.docker.internal:11434/api/generate` and receives a live response from local hardware.

---

## Getting Started

### Prerequisites
- Docker Engine v24+ and Docker Compose v2+
- Ollama installed on Windows Host with `qwen3:4b` model
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
   - **n8n Workflow Editor**: `http://localhost:5679`
   - **Host Ollama API**: `http://localhost:11434`

---

## License & Safety Policy
ACPIA is an experimental hackathon prototype intended for authorized research and demonstration purposes using synthetic data only.
