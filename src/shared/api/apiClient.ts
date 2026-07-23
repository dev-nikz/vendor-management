import { ApiError } from './apiError'

export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url)

  if (!response.ok) {
    throw new ApiError(`Request to ${url} failed`, response.status)
  }

  return response.json() as Promise<T>
}
