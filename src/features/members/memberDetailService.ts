import { apiClient } from '../../shared/api/client'
import type { MemberDetail, Paginated, Session } from '../../shared/api/types'

export async function fetchMemberDetail(id: number): Promise<MemberDetail> {
  const { data } = await apiClient.get<{ data: MemberDetail }>(`/api/club/members/${id}`)
  return data.data
}

export async function fetchMemberSessions(
  id: number,
  page: number = 1,
  perPage: number = 10,
): Promise<Paginated<Session>> {
  const { data } = await apiClient.get<Paginated<Session>>(
    `/api/club/members/${id}/sessions`,
    { params: { page, per_page: perPage } },
  )
  return data
}
