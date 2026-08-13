import { apiClient } from '../../shared/api/client'
import type { ClubSummary } from '../../shared/api/types'

export async function fetchSummary(): Promise<ClubSummary> {
  const { data } = await apiClient.get<ClubSummary>('/api/club/summary')
  return data
}
