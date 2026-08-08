# ACPIA Autonomous Agent Framework

The `agents/` module implements ACPIA's **genuinely agentic** autonomous control loop:

$$\text{Observe} \longrightarrow \text{Plan} \longrightarrow \text{Delegate} \longrightarrow \text{Execute tools} \longrightarrow \text{Observe results} \longrightarrow \text{Correlate} \longrightarrow \text{Verify} \longrightarrow \text{Re-plan} \longrightarrow \text{Human review}$$

## Framework Components

### Core Orchestrator (`agents/core/`)
- **`orchestrator.py`**: Manages case goal state, execution loop cycles, and state persistence.
- **`planner.py`**: Interacts with Ollama local LLM to generate structured investigation plans and evaluate re-planning triggers.

### Specialized Domain Agents (`agents/specialized/`)
- **`media_agent.py`**: Specializes in synthetic media perceptual hash analysis and metadata correlation.
- **`graph_agent.py`**: Specializes in multi-hop network queries against Neo4j synthetic graph nodes.

## Design Rules
1. **Zero Conversational Chatbot Logic**: Agents process structured JSON action schemas and goal trees.
2. **Deterministic Tool Execution**: Agents do not directly perform file or DB operations; they invoke sandboxed tools registered in `tools/`.
3. **Synthetic Data Guard**: Agents operate strictly on synthetic evidence schemas.
