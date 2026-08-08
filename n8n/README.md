# ACPIA Workflow Orchestration (n8n)

Self-hosted n8n instance containerized in Docker Compose for event-driven asynchronous task orchestration.

## Responsibilities
- Event-driven background task scheduling (e.g. periodic synthetic evidence batch processing).
- Webhook trigger integration between external event sources and the ACPIA FastAPI backend.
- Multi-step workflow automation without polluting core agent reasoning loops.

## Exported Workflows Directory
Future n8n JSON workflow exports should be placed in `n8n/workflows/`.
