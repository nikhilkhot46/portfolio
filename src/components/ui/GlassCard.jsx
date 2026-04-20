import { useRef, useState } from 'react'
import { cn } from '../../lib/cn'

export default function GlassCard({ className, children, interactive = true, ...props }) {
  const ref = useRef(null)
  const [pos, setPos] = useState({ x: -200, y: -200 })

  function handleMove(e) {
    if (!ref.current || !interactive) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: -200, y: -200 })}
      className={cn(
        'reveal-border group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl transition-colors',
        interactive && 'hover:bg-white/[0.05]',
        className,
      )}
      {...props}
    >
      {interactive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, rgba(139,92,246,0.15), transparent 40%)`,
          }}
        />
      )}
      <div className="relative">{children}</div>
    </div>
  )
}
