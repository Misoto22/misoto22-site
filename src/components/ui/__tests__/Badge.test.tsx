import { render, screen } from '@testing-library/react'
import Badge from '../Badge'

describe('Badge', () => {
  it('should render children correctly', () => {
    render(<Badge>Test Badge</Badge>)
    expect(screen.getByText('Test Badge')).toBeInTheDocument()
  })

  it('should apply custom className', () => {
    const { container } = render(
      <Badge className="custom-class">Test</Badge>
    )
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('custom-class')
  })

  it('should apply default styling classes', () => {
    const { container } = render(<Badge>Test</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toHaveClass('rounded-full')
    expect(badge).toHaveClass('text-sm')
    expect(badge).toHaveClass('font-medium')
  })

  it('should render as a span element', () => {
    const { container } = render(<Badge>Test</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toBeInTheDocument()
  })

  it('should render with multiple children', () => {
    render(
      <Badge>
        <span>Icon</span>
        <span>Text</span>
      </Badge>
    )
    expect(screen.getByText('Icon')).toBeInTheDocument()
    expect(screen.getByText('Text')).toBeInTheDocument()
  })

  it('should work without custom className', () => {
    const { container } = render(<Badge>Test</Badge>)
    const badge = container.querySelector('span')
    expect(badge).toBeInTheDocument()
  })
})
