interface DividerProps {
  className?: string
  accent?: boolean
}

export default function Divider({ className = '', accent = false }: DividerProps) {
  return (
    <hr
      className={`border-0 h-px ${accent ? 'bg-(--accent)' : 'bg-(--border-color)'} ${className}`}
    />
  )
}
