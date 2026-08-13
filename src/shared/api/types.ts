// API response types — mirrors the mock API at localhost:4000

export interface LocalizedName {
  ar: string
  en: string
}

export interface AuthUser {
  id: number
  name: LocalizedName
  email: string
  role: 'admin' | 'member'
}

export interface LoginResponse {
  token: string
  user: AuthUser
}

export interface ClubSummary {
  totalMembers: number
  activeMembers: number
  sessionsThisMonth: number
  averageSessionsPerMember: number
  changeVsLastMonth: number
}

export interface MemberListItem {
  id: number
  memberNumber: string
  name: LocalizedName
  tier: 'basic' | 'standard' | 'premium'
  status: 'active' | 'paused' | 'expired'
  sessionsThisMonth: number
  monthlyGoal: number
  totalSessions: number
}

export interface MemberDetail {
  id: number
  memberNumber: string
  name: LocalizedName
  email: string
  tier: 'basic' | 'standard' | 'premium'
  status: 'active' | 'paused' | 'expired'
  joinedAt: string
  sessionsThisMonth: number
  monthlyGoal: number
  totalSessions: number
  phone: string
  emergencyContact: { name: string; phone: string }
  medicalNotes: string
}

export interface Session {
  id: string
  date: string
  className: LocalizedName
  durationMinutes: number
  coach: string
  status: 'upcoming' | 'attended'
}

export interface Paginated<T> {
  data: T[]
  meta: {
    page: number
    per_page: number
    total: number
    last_page: number
  }
}

export interface MemberListParams {
  page?: number
  per_page?: number
  search?: string
  tier?: 'basic' | 'standard' | 'premium'
  status?: 'active' | 'paused' | 'expired'
  sort?: 'name' | 'memberNumber' | 'sessionsThisMonth' | 'totalSessions'
  dir?: 'asc' | 'desc'
}
