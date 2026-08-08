# ACPIA Docker Container Infrastructure

This directory contains standalone Dockerfile definitions for ACPIA microservices.

## Build Specs
- **`Dockerfile.backend`**: Python 3.11-slim container running FastAPI with Uvicorn.
- **`Dockerfile.frontend`**: Node 18 multi-stage build container outputting standalone Next.js 14 server bundle.

## Container Management
Use `docker-compose` at the monorepo root to build and orchestrate all 6 containerized services (`postgres`, `neo4j`, `ollama`, `n8n`, `backend`, `frontend`).
