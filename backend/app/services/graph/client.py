from typing import Generator, Optional
from neo4j import GraphDatabase, Driver, Session
from app.config import settings

_driver: Optional[Driver] = None

def get_graph_driver() -> Driver:
    """Obtains or initializes the Neo4j driver instance using configured settings."""
    global _driver
    if _driver is None:
        _driver = GraphDatabase.driver(
            settings.NEO4J_URI,
            auth=(settings.NEO4J_USER, settings.NEO4J_PASSWORD)
        )
    return _driver

def get_graph_session() -> Generator[Session, None, None]:
    """Generator dependency for providing a Neo4j session."""
    driver = get_graph_driver()
    with driver.session() as session:
        yield session

def check_graph_connection() -> bool:
    """Executes a lightweight query against Neo4j to test connectivity."""
    try:
        driver = get_graph_driver()
        with driver.session() as session:
            result = session.run("RETURN 1 AS result")
            single = result.single()
            return single is not None and single["result"] == 1
    except Exception:
        return False

def close_graph_driver():
    """Closes the Neo4j driver connection pool."""
    global _driver
    if _driver is not None:
        _driver.close()
        _driver = None
