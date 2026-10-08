export class ApiError extends Error {
  readonly status: number

  constructor(status: number, message: string) {
    super(message)
    this.status = status
  }
}

export async function getJson<T>(url: string, params?: Record<string, string | number>): Promise<T> {
  const query = params
    ? '?' + new URLSearchParams(Object.entries(params).map(([k, v]) => [k, String(v)])).toString()
    : ''
  const res = await fetch(url + query)
  if (!res.ok) throw new ApiError(res.status, await res.text())
  return res.json() as Promise<T>
}
