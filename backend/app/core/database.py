from typing import AsyncGenerator
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from neo4j import AsyncGraphDatabase, AsyncDriver
from app.core.config import settings

# PostgreSQL Async Engine & Sessionmaker
engine = create_async_engine(settings.DATABASE_URL, echo=(settings.ENVIRONMENT == "development"))
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def get_db_session() -> AsyncGenerator[AsyncSession, None]:
    """Dependency for obtaining an async PostgreSQL database session."""
    async with AsyncSessionLocal() as session:
        try:
            yield session
        finally:
            await session.close()

# Neo4j Async Driver Management
neo4j_driver: AsyncDriver | None = None

def get_neo4j_driver() -> AsyncDriver:
    """Obtains or initializes the Neo4j async driver instance."""
    global neo4j_driver
    if neo4j_driver is None:
        neo4j_driver = AsyncGraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )
    return neo4j_driver

async def close_db_connections():
    """Closes database connection pools on application shutdown."""
    global neo4j_driver
    await engine.dispose()
    if neo4j_driver is not None:
        await neo4j_driver.close()
        neo4j_driver = None
