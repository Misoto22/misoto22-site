import { render, screen } from '@testing-library/react'
import Card from '../Card'

describe('Card', () => {
  it('should render children correctly', () => {
    render(
      <Card>
        <h2>Card Title</h2>
        <p>Card content</p>
      </Card>
    )
    expect(screen.getByText('Card Title')).toBeInTheDocument()
    expect(screen.getByText('Card content')).toBeInTheDocument()
  })

  it('should render with custom className', () => {
    render(
      <Card className="custom-class">
        <p>Test content</p>
      </Card>
    )
    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should render with different width options', () => {
    const { rerender } = render(
      <Card width="full">
        <p>Full width</p>
      </Card>
    )
    expect(screen.getByText('Full width')).toBeInTheDocument()

    rerender(
      <Card width="1/2">
        <p>Half width</p>
      </Card>
    )
    expect(screen.getByText('Half width')).toBeInTheDocument()
  })

  it('should render with responsive width configuration', () => {
    render(
      <Card width={{ sm: '1/2', md: 'full', lg: '1/3' }}>
        <p>Responsive width</p>
      </Card>
    )
    expect(screen.getByText('Responsive width')).toBeInTheDocument()
  })

  it('should render with 2xl breakpoint', () => {
    render(
      <Card width={{ '2xl': 'full' }}>
        <p>2xl width</p>
      </Card>
    )
    expect(screen.getByText('2xl width')).toBeInTheDocument()
  })

  it('should accept delay prop without errors', () => {
    expect(() => {
      render(
        <Card delay={0.2}>
          <p>Delayed card</p>
        </Card>
      )
    }).not.toThrow()
  })

  it('should render multiple children', () => {
    render(
      <Card>
        <h2>Title</h2>
        <p>Description</p>
        <button>Click me</button>
      </Card>
    )
    expect(screen.getByText('Title')).toBeInTheDocument()
    expect(screen.getByText('Description')).toBeInTheDocument()
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
