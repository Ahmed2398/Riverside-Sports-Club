import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { ConfidentialField } from './ConfidentialField'

describe('ConfidentialField', () => {
  it('renders with hatched overlay by default (not revealed)', () => {
    const { container } = render(
      <ConfidentialField label="Phone" value="+966 50 123 4567" />
    )
    
    const valueBox = container.querySelector('[class*="valueBox"]')
    expect(valueBox).toBeTruthy()
    expect(valueBox?.classList.contains('revealed')).toBe(false)
  })

  it('removes hatched overlay when revealed prop is true', () => {
    const { container } = render(
      <ConfidentialField label="Phone" value="+966 50 123 4567" revealed={true} />
    )
    
    const valueBox = container.querySelector('[class*="valueBox"]')
    expect(valueBox?.className).toMatch(/revealed/)
  })

  it('displays the label and value', () => {
    render(<ConfidentialField label="Phone" value="+966 50 123 4567" />)
    
    expect(screen.getByText('Phone')).toBeInTheDocument()
    expect(screen.getByText('+966 50 123 4567')).toBeInTheDocument()
  })

  it('transitions between revealed and hidden states', () => {
    const { container, rerender } = render(
      <ConfidentialField label="Phone" value="+966 50 123 4567" revealed={false} />
    )
    
    let valueBox = container.querySelector('[class*="valueBox"]')
    expect(valueBox?.className).not.toMatch(/revealed/)
    
    rerender(<ConfidentialField label="Phone" value="+966 50 123 4567" revealed={true} />)
    
    valueBox = container.querySelector('[class*="valueBox"]')
    expect(valueBox?.className).toMatch(/revealed/)
  })
})
