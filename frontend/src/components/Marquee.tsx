interface MarqueeProps {
  items: string[]
  className?: string
}

// Infinite horizontal ticker; content duplicated so the loop is seamless.
export default function Marquee({ items, className = "" }: MarqueeProps) {
  const row = [...items, ...items]
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[hsl(46,26%,95%)] to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[hsl(46,26%,95%)] to-transparent z-10" />
      <div className="flex w-max items-center gap-6 animate-marquee">
        {row.map((item, i) => (
          <span key={i} className="flex items-center gap-6 shrink-0">
            <span className="flex items-center gap-3 font-mono text-sm font-semibold text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-[hsl(79,60%,40%)]" />
              {item}
            </span>
            <span className="text-xl text-[hsl(79,60%,35%)]">→</span>
          </span>
        ))}
      </div>
    </div>
  )
}