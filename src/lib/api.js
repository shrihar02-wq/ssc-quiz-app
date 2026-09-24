// API base URL for the self-hosted auth/progress backend.
//
//   Web / dev:           http://localhost:4000
//   Android emulator:    http://10.0.2.2:4000
//   Real phone (same Wi-Fi): http://<your-PC-LAN-IP>:4000
//   Hosted (Render/Railway): https://<your-app>.onrender.com  (change here)
export const API_BASE = 'http://localhost:4000'

export async function api(path, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`

  let res
  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    })
  } catch {
    throw new Error('Cannot reach the server. Check your internet / server address.')
  }

  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`)
  return data
}