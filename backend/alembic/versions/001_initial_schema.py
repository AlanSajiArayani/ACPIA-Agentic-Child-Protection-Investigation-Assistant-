"""001_initial_schema

Revision ID: 001_initial_schema
Revises: 
Create Date: 2026-03-01 00:00:00.000000

"""
from typing import Sequence, Union
from alembic import op
import sqlalchemy as sa
from pgvector.sqlalchemy import Vector

revision: str = '001_initial_schema'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None

def upgrade() -> None:
    # 1. Enable pgvector extension
    op.execute("CREATE EXTENSION IF NOT EXISTS vector;")

    # 2. Create users table
    op.create_table(
        'users',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('username', sa.String(length=100), nullable=False),
        sa.Column('display_name', sa.String(length=255), nullable=False),
        sa.Column('role', sa.String(length=50), nullable=False, server_default='investigator'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_users_username', 'users', ['username'], unique=True)

    # 3. Create cases table
    op.create_table(
        'cases',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('case_number', sa.String(length=100), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='draft'),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_cases_case_number', 'cases', ['case_number'], unique=True)

    # 4. Create evidence table (with pgvector support)
    op.create_table(
        'evidence',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('case_id', sa.UUID(), sa.ForeignKey('cases.id', ondelete='CASCADE'), nullable=False),
        sa.Column('evidence_id', sa.String(length=100), nullable=False),
        sa.Column('evidence_type', sa.String(length=50), nullable=False),
        sa.Column('title', sa.String(length=255), nullable=False),
        sa.Column('description', sa.Text(), nullable=True),
        sa.Column('source', sa.String(length=255), nullable=False),
        sa.Column('metadata_json', sa.JSON(), nullable=False),
        sa.Column('content_text', sa.Text(), nullable=True),
        sa.Column('embedding', Vector(1536), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_evidence_case_id', 'evidence', ['case_id'], unique=False)
    op.create_index('ix_evidence_evidence_id', 'evidence', ['evidence_id'], unique=True)

    # 5. Create investigations table
    op.create_table(
        'investigations',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('case_id', sa.UUID(), sa.ForeignKey('cases.id', ondelete='CASCADE'), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='draft'),
        sa.Column('objective', sa.Text(), nullable=False),
        sa.Column('current_stage', sa.String(length=50), nullable=False, server_default='Observe'),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_investigations_case_id', 'investigations', ['case_id'], unique=False)

    # 6. Create agent_runs table
    op.create_table(
        'agent_runs',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('investigation_id', sa.UUID(), sa.ForeignKey('investigations.id', ondelete='CASCADE'), nullable=False),
        sa.Column('agent_name', sa.String(length=100), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='queued'),
        sa.Column('task', sa.Text(), nullable=False),
        sa.Column('input_data', sa.JSON(), nullable=False),
        sa.Column('output_data', sa.JSON(), nullable=False),
        sa.Column('started_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('completed_at', sa.DateTime(timezone=True), nullable=True),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_agent_runs_investigation_id', 'agent_runs', ['investigation_id'], unique=False)

    # 7. Create findings table
    op.create_table(
        'findings',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('investigation_id', sa.UUID(), sa.ForeignKey('investigations.id', ondelete='CASCADE'), nullable=False),
        sa.Column('finding_text', sa.Text(), nullable=False),
        sa.Column('status', sa.String(length=50), nullable=False, server_default='candidate'),
        sa.Column('confidence', sa.Float(), nullable=False, server_default='0.0'),
        sa.Column('supporting_evidence_ids', sa.JSON(), nullable=False),
        sa.Column('contradicting_evidence_ids', sa.JSON(), nullable=False),
        sa.Column('generated_by', sa.String(length=100), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.Column('updated_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_findings_investigation_id', 'findings', ['investigation_id'], unique=False)

    # 8. Create audit_events table
    op.create_table(
        'audit_events',
        sa.Column('id', sa.UUID(), nullable=False, primary_key=True),
        sa.Column('case_id', sa.UUID(), sa.ForeignKey('cases.id', ondelete='SET NULL'), nullable=True),
        sa.Column('actor_type', sa.String(length=50), nullable=False),
        sa.Column('actor_id', sa.String(length=100), nullable=False),
        sa.Column('event_type', sa.String(length=100), nullable=False),
        sa.Column('event_data', sa.JSON(), nullable=False),
        sa.Column('created_at', sa.DateTime(timezone=True), nullable=False),
        sa.PrimaryKeyConstraint('id')
    )
    op.create_index('ix_audit_events_case_id', 'audit_events', ['case_id'], unique=False)

def downgrade() -> None:
    op.drop_table('audit_events')
    op.drop_table('findings')
    op.drop_table('agent_runs')
    op.drop_table('investigations')
    op.drop_table('evidence')
    op.drop_table('cases')
    op.drop_table('users')
    op.execute("DROP EXTENSION IF EXISTS vector;")
