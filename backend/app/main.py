from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os

from app.api import cases, agents, tools
from app.core.database import close_db_connections

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup tasks
    yield
    # Shutdown tasks: close connection pools
    await close_db_connections()

app = FastAPI(
    title="ACPIA Backend API",
    description="Agentic Child Protection Investigation Assistant API Gateway & Agent Controller",
    version="0.1.0",
    lifespan=lifespan,
)

# CORS setup
cors_origins = os.getenv("CORS_ORIGINS", "http://localhost:3000,http://127.0.0.1:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register API Routers under /api/v1
app.include_router(cases.router, prefix="/api/v1")
app.include_router(agents.router, prefix="/api/v1")
app.include_router(tools.router, prefix="/api/v1")

@app.get("/health", tags=["System"])
async def health_check():
    return {
        "status": "healthy",
        "system": "ACPIA Backend",
        "synthetic_data_mode": True
    }

@app.get("/api/v1/status", tags=["System"])
async def api_status():
    return {
        "status": "online",
        "services": {
            "postgres": "configured",
            "neo4j": "configured",
            "ollama": "configured",
            "n8n": "configured"
        }
    }
