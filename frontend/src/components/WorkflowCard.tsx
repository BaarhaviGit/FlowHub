import { useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { Download, Tag, Braces, ArrowUpRight } from "lucide-react"
import { Link } from "react-router-dom"

interface WorkflowProps {
  id: number
  title: string
  description: string
  category: string
  tags: string
  downloadCount: number
  author: string
}

export default function WorkflowCard({ id, title, description, category, tags, downloadCount, author }: WorkflowProps) {
  const tagList = tags ? tags.split(",").map(t => t.trim()) : []
  const ref = useRef<HTMLAnchorElement>(null)

  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rotateX = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 20 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }

  const handleMouseLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      style={{ perspective: 900 }}
      className="h-full"
    >
      <Link
        ref={ref}
        to={`/workflow/${id}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative block h-full bg-[#0E130C] border border-white/15 rounded-2xl overflow-hidden transition-colors duration-300 hover:border-[hsl(79,90%,55%)] hover:shadow-[0_0_0_1px_hsl(79,90%,55%_/_40%),10px_10px_0_0_rgba(200,242,74,0.25)]"
      >
        <motion.div
          style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
          className="relative h-full"
        >
          {/* Shine sweep */}
          <motion.div
            initial={false}
            className="pointer-events-none absolute -inset-y-4 -left-1/2 w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-x-[-120%] group-hover:translate-x-[300%] transition-transform duration-1000"
          />

          {/* Header strip */}
          <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/[0.03]">
            <span className="flex items-center gap-2 font-mono text-[11px] text-ink-muted">
              <Braces className="w-3.5 h-3.5 text-[hsl(79,90%,55%)]" />
              <span className="text-[hsl(79,90%,55%)]">/</span>workflow_{id}.json
            </span>
            <span className="flex items-center gap-3">
              <span className="flex items-center gap-1.5 font-mono text-[11px] text-ink-muted">
                <Download className="w-3.5 h-3.5" />
                {downloadCount}
              </span>
              <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-[hsl(79,90%,55%)] transition-colors" />
            </span>
          </div>

          {/* Body */}
          <div className="px-5 py-5">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-lg font-bold tracking-tight text-ink-fore group-hover:text-[hsl(79,90%,65%)] transition-colors leading-snug">
                {title}
              </h3>
              <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider bg-[hsl(79,90%,55%)] text-[#0C100A] font-semibold px-2 py-1 rounded-md">
                {category}
              </span>
            </div>

            <p className="text-sm text-ink-muted leading-relaxed mb-4 line-clamp-2">{description}</p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {tagList.slice(0, 4).map((tag, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1 font-mono text-[10px] text-ink-muted border border-white/10 px-2 py-1 rounded-md"
                >
                  <Tag className="w-2.5 h-2.5 text-[hsl(79,90%,55%)]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* JSON footer */}
          <div className="px-5 py-3 border-t border-white/10 bg-[#0A0D08]">
            <p className="font-mono text-[11px] text-ink-muted">
              <span className="text-[hsl(90,8%,42%)]">{"{"}</span>
              <span className="text-[hsl(6,60%,55%)] mx-1.5">"author"</span>
              <span className="text-[hsl(90,8%,42%)]">:</span>
              <span className="text-[hsl(96,45%,50%)] mx-1.5">"{author}"</span>
              <span className="text-[hsl(90,8%,42%)]">{"}"}</span>
            </p>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}