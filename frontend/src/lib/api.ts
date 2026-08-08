const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export async function fetchCases() {
  const res = await fetch(`${API_BASE_URL}/cases`);
  if (!res.ok) {
    throw new Error('Failed to fetch cases');
  }
  return res.json();
}

export async function triggerAgentLoop(caseId: string, goal: string) {
  const res = await fetch(`${API_BASE_URL}/cases/${caseId}/agent-jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ goal }),
  });
  if (!res.ok) {
    throw new Error('Failed to trigger agent job');
  }
  return res.json();
}
