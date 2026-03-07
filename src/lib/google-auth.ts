export function parseCallbackHash(): string | null {
  const hash = window.location.hash.substring(1)
  const params = new URLSearchParams(hash)
  return params.get('id_token')
}

export function decodeIdToken(token: string): { email: string; name: string; sub: string } {
  const payload = token.split('.')[1]
  const decoded = JSON.parse(atob(payload))
  return { email: decoded.email ?? '', name: decoded.name ?? '', sub: decoded.sub ?? '' }
}
