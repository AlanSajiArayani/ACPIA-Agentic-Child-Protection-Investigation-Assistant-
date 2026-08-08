-- PostgreSQL Initialization Script for ACPIA DB
-- Enables pgvector extension and creates initial tables

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Cases Table
CREATE TABLE IF NOT EXISTS cases (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active',
    synthetic_mode BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Evidence Vector Embeddings Table (pgvector)
CREATE TABLE IF NOT EXISTS evidence_vectors (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    synthetic_file_id VARCHAR(100) NOT NULL,
    content_summary TEXT,
    embedding vector(1536), -- Vector dimensions for LLM/multi-modal embeddings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Immutable Agent Audit Log Table
CREATE TABLE IF NOT EXISTS agent_audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    case_id UUID REFERENCES cases(id) ON DELETE CASCADE,
    agent_name VARCHAR(100) NOT NULL,
    loop_stage VARCHAR(50) NOT NULL, -- Observe, Plan, Delegate, Execute, Correlate, Verify, HumanReview
    action_details JSONB NOT NULL,
    timestamp TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices
CREATE INDEX IF NOT EXISTS idx_audit_logs_case ON agent_audit_logs(case_id);
