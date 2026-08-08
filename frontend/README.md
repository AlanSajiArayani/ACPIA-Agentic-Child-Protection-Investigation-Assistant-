# ACPIA Frontend (Next.js Dashboard)

The frontend module provides a real-time investigation workspace and agent monitoring interface.

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Language**: TypeScript

## Architectural Guardrails
- **No Chatbot UI**: The interface intentionally avoids conversational chat bubbles or LLM chat prompts.
- **Agent Monitor Dashboard**: Displays the 8-stage agent execution tree, tool call parameters, Neo4j correlation graph, and human-in-the-loop sign-off dialogs.

## Directory Structure
```
frontend/
├── src/
│   ├── app/           # App router pages (Home dashboard, Cases)
│   ├── components/    # AgentTimeline, CorrelationGraph, HumanGateModal
│   └── lib/           # REST API & WebSocket client utilities
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```
