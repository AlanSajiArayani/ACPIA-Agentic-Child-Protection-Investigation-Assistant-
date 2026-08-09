from fastapi import FastAPI, HTTPException, status
from contextlib import asynccontextmanager
from app.config import settings
from app.database.connection import check_database_connection
from app.services.graph.client import close_graph_driver
from app.api import graph, cases, agents, tools

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Application startup
    yield
    # Application shutdown: close database and graph drivers
    close_graph_driver()

app = FastAPI(
    title="ACPIA Backend API",
    description="Agentic Child Protection Investigation Assistant Gateway API",
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
    lifespan=lifespan,
)

# Register Routers (both root and /api/v1 prefix for compatibility)
app.include_router(graph.router)
app.include_router(graph.router, prefix="/api/v1")
app.include_router(cases.router)
app.include_router(cases.router, prefix="/api/v1")
app.include_router(agents.router)
app.include_router(agents.router, prefix="/api/v1")
app.include_router(tools.router)
app.include_router(tools.router, prefix="/api/v1")

@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "ok",
        "service": settings.PROJECT_NAME
    }

@app.get("/health/db", tags=["Health"])
async def database_health_check():
    is_connected = check_database_connection()
    if not is_connected:
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={
                "status": "error",
                "database": "unavailable",
                "message": "Failed to connect to PostgreSQL database."
            }
        )
    return {
        "status": "ok",
        "database": "postgresql"
    }
