# ACPIA Backend (FastAPI Gateway Skeleton)

Phase 6.1 implementation establishing the foundational API gateway layer for **ACPIA (Agentic Child Protection Investigation Assistant)**.

The backend functions strictly as the application control and API interface layer. It does not contain AI reasoning or chatbot logic.

---

## Directory Hierarchy

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py             # FastAPI entrypoint application & GET /health
│   ├── config.py           # Configuration management via pydantic-settings
│   ├── api/
│   │   └── __init__.py     # API Router package
│   ├── models/
│   │   └── __init__.py     # Data models package
│   ├── schemas/
│   │   └── __init__.py     # Pydantic schemas package
│   ├── services/
│   │   └── __init__.py     # Service layer package
│   └── database/
│       └── __init__.py     # Database persistence package
├── tests/
│   └── test_health.py      # Pytest automated health check test
├── requirements.txt        # Minimal backend dependencies
├── .env.example            # Environment variables template
└── README.md               # Backend documentation
```

---

## Configuration & Environment

Configuration is managed dynamically via `pydantic-settings` in `app/config.py`.

Default environment variables (see `.env.example`):
- `PROJECT_NAME`: `"acpia-backend"`
- `ENV`: `"development"`
- `HOST`: `"0.0.0.0"`
- `PORT`: `8000`

---

## Quickstart & Execution

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Run the Development Server
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

### 3. Access API Documentation
- Interactive OpenAPI Docs: [http://localhost:8000/docs](http://localhost:8000/docs)
- ReDoc Docs: [http://localhost:8000/redoc](http://localhost:8000/redoc)

### 4. Run Automated Tests
```bash
pytest
```

---

## Endpoints

### `GET /health`
Returns service health status.

**Response**:
```json
{
  "status": "ok",
  "service": "acpia-backend"
}
```
