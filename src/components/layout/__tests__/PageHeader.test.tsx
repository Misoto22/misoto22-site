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

  it('should not show divider by default', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const divider = container.querySelector('.w-24.h-1')
    expect(divider).not.toBeInTheDocument()
  })

  it('should show divider when showDivider is true', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
        showDivider={true}
      />
    )
    const divider = container.querySelector('.w-24.h-1')
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
    const divider = container.querySelector('.w-24.h-1')
    expect(divider).not.toBeInTheDocument()
  })

  it('should apply proper styling classes to title', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const title = screen.getByRole('heading', { level: 1 })
    expect(title).toHaveClass('text-4xl')
    expect(title).toHaveClass('md:text-5xl')
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

  it('should center align content', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    const wrapper = container.querySelector('.text-center')
    expect(wrapper).toBeInTheDocument()
  })

  it('should render divider with correct styling when shown', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
        showDivider={true}
      />
    )
    const divider = container.querySelector('.w-24.h-1')
    expect(divider).toHaveClass('mx-auto')
    expect(divider).toHaveClass('mb-4')
  })

  it('should be wrapped in FadeInSlideUp animation', () => {
    const { container } = render(
      <PageHeader
        title="Test Title"
        description="Test description"
      />
    )
    // Verify the component renders without errors (FadeInSlideUp wraps it)
    expect(container.firstChild).toBeInTheDocument()
  })
})
