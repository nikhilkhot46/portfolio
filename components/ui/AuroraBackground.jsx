export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute -top-40 left-1/2 h-[520px] w-[900px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(139,92,246,0.45), rgba(139,92,246,0) 70%)',
          animation: 'aurora-drift-1 12s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute top-20 -left-40 h-[420px] w-[700px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(34,211,238,0.35), rgba(34,211,238,0) 70%)',
          animation: 'aurora-drift-2 14s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div
        className="absolute top-40 -right-40 h-[420px] w-[700px] rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(closest-side, rgba(251,113,133,0.25), rgba(251,113,133,0) 70%)',
          animation: 'aurora-drift-3 16s ease-in-out infinite',
          willChange: 'transform',
        }}
      />
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
    </div>
  )
}
