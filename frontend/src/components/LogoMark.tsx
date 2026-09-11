import { motion } from "framer-motion"

// FlowHub mark — an automation feedback loop: two endpoint nodes wired
// into a central hub with a return path cycling data forever.
export default function LogoMark({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
      {/* forward spine: trigger -> hub -> action */}
      <line x1="9" y1="16" x2="13" y2="16" />
      <line x1="19" y1="16" x2="23" y2="16" />
      {/* return loop (the "automated" part) */}
      <path d="M23 12.5 C 23 5, 9 5, 9 12.5" strokeDasharray="3 3" opacity="0.9" />
      {/* endpoint nodes */}
      <circle cx="6" cy="16" r="3" />
      <circle cx="26" cy="16" r="3" />
      {/* central hub */}
      <path d="M16 5.5 L 24.5 16 L 16 26.5 L 7.5 16 Z" fill="currentColor" />

      {/* traveling data packet */}
      <motion.circle
        r="1.6"
        fill="currentColor"
        stroke="none"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: "100%" }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{ offsetPath: "path('M 6 16 L 16 16 L 26 16 C 26 9, 21 7, 16 7 C 11 7, 6 9, 6 16')" }}
      />
    </svg>
  )
}