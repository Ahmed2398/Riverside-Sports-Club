import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatusBadge, type MemberStatus } from './StatusBadge'

describe('StatusBadge', () => {
  const statuses: MemberStatus[] = ['active', 'paused', 'expired']

  statuses.forEach((status) => {
    it(`renders a visible text label for "${status}"`, () => {
      render(<StatusBadge status={status} />)
      const label =
        status === 'active'
          ? 'Active'
          : status === 'paused'
            ? 'Paused'
            : 'Expired'
      expect(screen.getByText(label)).toBeVisible()
    })
  })

  it('renders an accessible aria-label for each status', () => {
    statuses.forEach((status) => {
      const { unmount } = render(<StatusBadge status={status} />)
      const label =
        status === 'active'
          ? 'Active'
          : status === 'paused'
            ? 'Paused'
            : 'Expired'
      expect(screen.getByRole('status', { name: label })).toBeInTheDocument()
      unmount()
    })
  })
})
