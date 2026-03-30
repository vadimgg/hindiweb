// Responsible for: AnkiConnect HTTP API wrapper and connection status check

export async function ankiRequest(action, params) {
  const resp = await fetch('http://localhost:8765', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action, version: 6, params }),
  });
  if (!resp.ok) throw new Error(`AnkiConnect HTTP ${resp.status}`);
  const json = await resp.json();
  if (json.error) throw new Error(json.error);
  return json.result;
}

export async function checkAnkiConnect() {
  try { await ankiRequest('version', {}); return true; } catch { return false; }
}
