# ACPIA Sandboxed Tool Registry

The `tools/` directory contains deterministic, strictly-typed tool execution modules invoked exclusively by ACPIA's autonomous agents.

## Tool Categories

### 1. Media Tools (`tools/media/`)
- **`hash_matcher.py`**: Performs perceptual hash (pHash) comparisons across synthetic evidence media records.

### 2. Text Tools (`tools/text/`)
- **`vector_search.py`**: Executes cosine similarity queries against `pgvector` synthetic embedding tables.

### 3. Network Tools (`tools/network/`)
- **`entity_lookup.py`**: Queries Neo4j Cypher graph indexes to discover multi-hop relationship paths between synthetic accounts and identifiers.

## Safety & Audit Interface
All tools implement standard logging, error handling, and parameter validation interfaces to ensure complete auditability in PostgreSQL logs.
