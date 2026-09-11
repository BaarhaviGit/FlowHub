import { useEffect, useRef } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Subtle volt-tinted glow that follows the cursor across the page.
export default function CursorGlow() {
  const mx = useMotionValue(-400)
  const my = useMotionValue(-400)
  const x = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 })
  const y = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 })
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return
    const handle = (e: MouseEvent) => {
      mx.set(e.clientX - 250)
      my.set(e.clientY - 250)
    }
    window.addEventListener("mousemove", handle)
    return () => window.removeEventListener("mousemove", handle)
  }, [mx, my])

  return (
    <motion.div
      ref={ref}
      style={{ x, y }}
      className="pointer-events-none fixed left-0 top-0 z-[55] hidden md:block opacity-70"
      aria-hidden="true"
    >
      <div className="h-[500px] w-[500px] rounded-full bg-[hsl(79,90%,50%)]/12 blur-[100px]" />
    </motion.div>
  )
}