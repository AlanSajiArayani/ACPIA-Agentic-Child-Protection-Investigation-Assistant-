# ACPIA Backend (FastAPI Gateway)

The backend module serves as the central REST / WebSocket API gateway, connecting the Next.js frontend with the Agent Framework, Tool Registry, PostgreSQL/pgvector, Neo4j graph database, and Ollama local AI engine.

## Tech Stack
- **Framework**: Python 3.11, FastAPI
- **Validation**: Pydantic v2
- **Database Drivers**: AsyncPG (PostgreSQL), Neo4j Python Async Driver
- **Async HTTP**: HTTPX

## Module Structure
```
backend/
├── app/
│   ├── main.py          # FastAPI application entrypoint
│   ├── api/             # API Routers (cases, agents, tools)
│   ├── core/            # Configuration & Database connection session setup
│   ├── models/          # Pydantic schemas & ORM models
│   └── services/        # Service layer logic
├── requirements.txt
├── Dockerfile
└── README.md
```
