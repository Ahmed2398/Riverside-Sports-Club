import { apiClient } from '../../shared/api/client'
import type { Paginated, MemberListItem, MemberListParams } from '../../shared/api/types'

export async function fetchMembers(
  params: MemberListParams,
  signal?: AbortSignal,
): Promise<Paginated<MemberListItem>> {
  const { data } = await apiClient.get<Paginated<MemberListItem>>(
    '/api/club/members',
    { params, signal },
  )
  return data
}
