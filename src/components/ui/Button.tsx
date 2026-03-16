import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link'

interface BaseButtonProps {
  children: ReactNode
  variant?: ButtonVariant
  className?: string
}

type ButtonAsButton = BaseButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

type ButtonAsLink = BaseButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsLink

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-(--accent) text-white hover:bg-(--accent-hover) rounded-lg px-6 py-3 font-medium transition-colors duration-200',
  secondary:
    'border border-(--border-color) text-(--foreground) hover:border-(--accent) rounded-lg px-6 py-3 font-medium transition-colors duration-200',
  ghost:
    'text-(--foreground-muted) hover:text-(--foreground) px-4 py-2 transition-colors duration-200',
  link:
    'text-(--accent) hover:text-(--accent-hover) underline underline-offset-4 decoration-(--accent-muted) hover:decoration-(--accent) transition-colors duration-200',
}

export default function Button({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) {
  const classes = `${variantClasses[variant]} ${className}`

  if ('href' in props && props.href) {
    const { href, ...rest } = props as ButtonAsLink
    return (
      <a href={href} className={classes} {...rest}>
        {children}
      </a>
    )
  }

  return (
    <button className={classes} {...(props as ButtonAsButton)}>
      {children}
    </button>
  )
}
