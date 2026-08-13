import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemberRow } from './MemberRow'

const mockMember = {
  id: 1,
  memberNumber: 'RSC-00102',
  name: { ar: 'عبدالله الغانم', en: 'Abdullah Alghanem' },
  tier: 'premium' as const,
  status: 'active' as const,
}

describe('MemberRow', () => {
  it('renders the correct locale name and member number', () => {
    render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={vi.fn()}
        onOpen={vi.fn()}
        locale="en"
      />
    )

    expect(screen.getByText('Abdullah Alghanem')).toBeInTheDocument()
    expect(screen.getByText('RSC-00102')).toBeInTheDocument()
  })

  it('renders Arabic name when locale is ar', () => {
    render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={vi.fn()}
        onOpen={vi.fn()}
        locale="ar"
      />
    )

    expect(screen.getByText('عبدالله الغانم')).toBeInTheDocument()
  })

  it('calls onOpen with correct id when row is clicked', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()

    render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={vi.fn()}
        onOpen={onOpen}
      />
    )

    const row = screen.getByRole('button', { name: /open details for/i })
    await user.click(row)

    expect(onOpen).toHaveBeenCalledWith(1)
    expect(onOpen).toHaveBeenCalledTimes(1)
  })

  it('calls onSelectChange but NOT onOpen when checkbox is clicked', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()
    const onSelectChange = vi.fn()

    render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={onSelectChange}
        onOpen={onOpen}
      />
    )

    const checkbox = screen.getByRole('checkbox', { name: /select abdullah alghanem/i })
    await user.click(checkbox)

    expect(onSelectChange).toHaveBeenCalledWith(1, true)
    expect(onOpen).not.toHaveBeenCalled()
  })

  it('is keyboard accessible via Tab and Enter', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()

    render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={vi.fn()}
        onOpen={onOpen}
      />
    )

    const row = screen.getByRole('button', { name: /open details for/i })
    
    // Tab to focus the row
    await user.tab()
    expect(row).toHaveFocus()

    // Press Enter to activate
    await user.keyboard('{Enter}')
    expect(onOpen).toHaveBeenCalledWith(1)
  })

  it('is keyboard accessible via Space key', async () => {
    const user = userEvent.setup()
    const onOpen = vi.fn()

    render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={vi.fn()}
        onOpen={onOpen}
      />
    )

    const row = screen.getByRole('button', { name: /open details for/i })
    row.focus()

    await user.keyboard(' ')
    expect(onOpen).toHaveBeenCalledWith(1)
  })

  it('reflects checkbox checked state', () => {
    const { rerender } = render(
      <MemberRow
        member={mockMember}
        selected={false}
        onSelectChange={vi.fn()}
        onOpen={vi.fn()}
      />
    )

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement
    expect(checkbox.checked).toBe(false)

    rerender(
      <MemberRow
        member={mockMember}
        selected={true}
        onSelectChange={vi.fn()}
        onOpen={vi.fn()}
      />
    )

    expect(checkbox.checked).toBe(true)
  })
})
