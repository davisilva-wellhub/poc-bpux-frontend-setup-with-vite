import { render, screen } from '@testing-library/react'

import { ScreenReaderOnlyText } from './index'

describe('ScreenReaderOnlyText', () => {
  it('should render children text', () => {
    render(<ScreenReaderOnlyText>Hidden text</ScreenReaderOnlyText>)

    const element = screen.getByText('Hidden text')
    expect(element).toBeInTheDocument()
  })

  it('should apply screen reader only styles', () => {
    render(<ScreenReaderOnlyText>Hidden text</ScreenReaderOnlyText>)

    const element = screen.getByText('Hidden text')
    expect(element).toBeInTheDocument()
  })

  it('should pass through additional props', () => {
    render(
      <ScreenReaderOnlyText role="region" aria-live="polite">
        Announcement
      </ScreenReaderOnlyText>
    )

    const element = screen.getByText('Announcement')
    expect(element).toHaveAttribute('role', 'region')
    expect(element).toHaveAttribute('aria-live', 'polite')
  })
})
