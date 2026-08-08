# ACPIA Dual Database Layer

ACPIA utilizes a complementary dual-database architecture:

## 1. PostgreSQL 16 + pgvector (`database/postgres/`)
- **Relational Data**: Case metadata, structured logs, immutable audit trail (`agent_audit_logs`).
- **Vector Search**: `pgvector` extension powering cosine similarity queries across synthetic evidence embeddings.
- **Initialization**: `init.sql` automatically runs when the PostgreSQL container initializes.

## 2. Neo4j 5 Community Edition (`database/neo4j/`)
- **Graph Database**: Represents synthetic entity nodes (`SyntheticAccount`, `SyntheticMedia`, `SyntheticIdentifier`) and relationship edges (`LINKED_TO`, `COMMUNICATED_WITH`).
- **Initialization**: `init.cypher` defines uniqueness constraints and performance indices.
