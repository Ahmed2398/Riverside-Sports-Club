import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { StatCard } from './StatCard'

describe('StatCard', () => {
  it('renders a label in default variant', () => {
    render(<StatCard label="Members" />)
    expect(screen.getByText('Members')).toBeInTheDocument()
  })

  it('renders "Failed" text in error variant', () => {
    render(<StatCard label="Sessions" variant="error" />)
    expect(screen.getByText('stats.failed')).toBeInTheDocument()
  })

  it('renders a retry button in error variant when onRetry is provided', () => {
    const onRetry = vi.fn()
    render(<StatCard label="Sessions" variant="error" onRetry={onRetry} />)
    const retry = screen.getByText(/stats\.retry/)
    expect(retry).toBeInTheDocument()
  })

  it('calls onRetry when retry is clicked', async () => {
    const onRetry = vi.fn()
    const user = (await import('@testing-library/user-event')).default.setup()
    render(<StatCard label="Sessions" variant="error" onRetry={onRetry} />)
    await user.click(screen.getByText(/stats\.retry/))
    expect(onRetry).toHaveBeenCalledOnce()
  })
})
