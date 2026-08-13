import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge, type MemberStatus } from './StatusBadge'

describe('StatusBadge', () => {
  const statuses: MemberStatus[] = ['active', 'paused', 'expired']

  const labelFor = (s: MemberStatus) =>
    s === 'active'
      ? 'members.statusActive'
      : s === 'paused'
        ? 'members.statusPaused'
        : 'members.statusExpired'

  statuses.forEach((status) => {
    it(`renders a visible text label for "${status}"`, () => {
      render(<StatusBadge status={status} />)
      expect(screen.getByText(labelFor(status))).toBeVisible()
    })
  })

  it('renders an accessible aria-label for each status', () => {
    statuses.forEach((status) => {
      const { unmount } = render(<StatusBadge status={status} />)
      expect(screen.getByRole('status', { name: labelFor(status) })).toBeInTheDocument()
      unmount()
    })
  })
})
