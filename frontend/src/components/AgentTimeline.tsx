import React from 'react';

export interface AgentStep {
  id: string;
  agentName: string;
  action: string;
  status: 'pending' | 'executing' | 'completed' | 'failed';
  timestamp: string;
}

export function AgentTimeline() {
  return (
    <div className="space-y-4">
      <div className="text-xs text-slate-400">
        Agent execution timeline tracking real-time tool invocations and state changes.
      </div>
    </div>
  );
}
