from pydantic_settings import BaseSettings, SettingsConfigDict
import os

class Settings(BaseSettings):
    PROJECT_NAME: str = "acpia-backend"
    ENV: str = os.getenv("ENVIRONMENT", "development")
    HOST: str = "0.0.0.0"
    PORT: int = 8000
    DEBUG: bool = True

    # Database Configuration (PostgreSQL + pgvector)
    POSTGRES_USER: str = os.getenv("POSTGRES_USER", "acpia_admin")
    POSTGRES_PASSWORD: str = os.getenv("POSTGRES_PASSWORD", "acpia_secure_pass_2026")
    POSTGRES_HOST: str = os.getenv("POSTGRES_HOST", "postgres")
    POSTGRES_PORT: int = int(os.getenv("POSTGRES_PORT", 5432))
    POSTGRES_DB: str = os.getenv("POSTGRES_DB", "acpia_db")
    
    DATABASE_URL: str = os.getenv(
        "DATABASE_URL",
        "postgresql+psycopg://acpia_admin:acpia_secure_pass_2026@postgres:5432/acpia_db"
    ).replace("postgresql+asyncpg://", "postgresql+psycopg://")
    
    VECTOR_DIMENSION: int = 1536

    # Neo4j Graph Database Configuration
    NEO4J_HOST: str = os.getenv("NEO4J_HOST", "neo4j")
    NEO4J_PORT: int = int(os.getenv("NEO4J_PORT", 7687))
    NEO4J_USER: str = os.getenv("NEO4J_USER", os.getenv("NEO4J_USERNAME", "neo4j"))
    NEO4J_PASSWORD: str = os.getenv("NEO4J_PASSWORD", "acpia_graph_pass_2026")
    NEO4J_URI: str = os.getenv("NEO4J_URI", f"bolt://{os.getenv('NEO4J_HOST', 'neo4j')}:7687")

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()
