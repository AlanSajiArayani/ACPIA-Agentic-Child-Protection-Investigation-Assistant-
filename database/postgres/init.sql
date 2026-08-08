-- PostgreSQL Initialization Script for ACPIA DB
-- Enables extensions for vector operations and UUID generation.
-- Schema tables are managed exclusively by Alembic migrations.

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
