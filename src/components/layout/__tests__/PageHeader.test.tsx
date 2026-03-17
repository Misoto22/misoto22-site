import { render, screen } from '@testing-library/react'
import PageHeader from '../PageHeader'

describe('PageHeader', () => {
  it('should render title and description', () => {
    render(
      <PageHeader
        title="Test Title"
        description="Test description text"
      />
    )
    expect(screen.getByText('Test Title')).toBeInTheDocument()
    expect(screen.getByText('Test description text')).toBeInTheDocument()
  })

  it('should render title as h1 element', () => {
    render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const heading = screen.getByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Test Title')
  })

  it('should show divider by default', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const divider = container.querySelector('.w-12')
    expect(divider).toBeInTheDocument()
  })

  it('should hide divider when showDivider is false', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
        showDivider={false}
      />
    )
    const divider = container.querySelector('.w-12')
    expect(divider).not.toBeInTheDocument()
  })

  it('should apply proper styling classes to title', () => {
    render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('text-3xl')
    expect(title).toHaveClass('font-heading')
  })

  it('should apply proper styling to description', () => {
    render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const description = screen.getByText('Test description')
    expect(description.tagName).toBe('P')
    expect(description).toHaveClass('text-lg')
    expect(description).toHaveClass('max-w-2xl')
  })

  it('should be wrapped in animation container', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    expect(container.firstChild).toBeInTheDocument()
  })
})
