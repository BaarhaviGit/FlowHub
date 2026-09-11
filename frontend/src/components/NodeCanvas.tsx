import { motion } from "framer-motion"

interface NodeCanvasProps {
  theme?: "paper" | "ink"
  className?: string
}

// A decorative n8n-style node graph: trigger -> transform -> action,
// connected by SVG bezier edges with flowing dashed "data" lines.
export default function NodeCanvas({ theme = "paper", className = "" }: NodeCanvasProps) {
  const ink =
    theme === "ink"
      ? { edge: "rgba(255,255,255,0.22)", edgeActive: "#C8F24A", node: "#C8F24A", label: "rgba(255,255,255,0.75)" }
      : { edge: "rgba(20,25,15,0.16)", edgeActive: "#9DC93B", node: "#9DC93B", label: "rgba(20,25,15,0.75)" }

  return (
    <svg
      viewBox="0 0 900 420"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      {/* Edges */}
      <path d="M150 90 C 260 30, 300 150, 430 110" stroke={ink.edge} strokeWidth="1.5" />
      <path d="M150 90 C 260 30, 300 150, 430 110" stroke={ink.edgeActive} strokeWidth="2" className="animate-dash" />
      <path d="M120 330 C 240 240, 320 420, 440 320" stroke={ink.edge} strokeWidth="1.5" />
      <path d="M120 330 C 240 240, 320 420, 440 320" stroke={ink.edgeActive} strokeWidth="2" className="animate-dash-slow" />
      <path d="M440 110 C 560 60, 580 200, 700 140" stroke={ink.edge} strokeWidth="1.5" />
      <path d="M440 110 C 560 60, 580 200, 700 140" stroke={ink.edgeActive} strokeWidth="2" className="animate-dash" />
      <path d="M440 320 C 560 250, 600 380, 700 300" stroke={ink.edge} strokeWidth="1.5" />
      <path d="M460 215 C 580 200, 560 260, 690 220" stroke={ink.edge} strokeWidth="1.5" className="animate-dash-slow" />

      {/* Node: Webhook trigger */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
      >
        <motion.circle
          cx="150"
          cy="90"
          r="40"
          fill="none"
          stroke={ink.node}
          strokeOpacity="0.4"
          animate={{ r: [34, 48], opacity: [0.4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
        />
        <circle cx="150" cy="90" r="34" fill={theme === "ink" ? "#13190F" : "#FFFFFF"} stroke={ink.node} strokeWidth="2" />
        <circle cx="150" cy="90" r="26" stroke={ink.edgeActive} strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        <circle cx="150" cy="90" r="8" fill={ink.node} />
        <text x="150" y="146" textAnchor="middle" fill={ink.label} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="500">
          trigger
        </text>
        <text x="150" y="160" textAnchor="middle" fill={ink.edgeActive} fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.9">
          webhook
        </text>
      </motion.g>

      {/* Node: Transform */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.45 }}
      >
        <motion.circle
          cx="430"
          cy="110"
          r="40"
          fill="none"
          stroke={ink.node}
          strokeOpacity="0.4"
          animate={{ r: [34, 48], opacity: [0.4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.7 }}
        />
        <circle cx="430" cy="110" r="34" fill={theme === "ink" ? "#13190F" : "#FFFFFF"} stroke={ink.node} strokeWidth="2" />
        <circle cx="430" cy="110" r="26" stroke={ink.edgeActive} strokeWidth="1" strokeDasharray="3 4" opacity="0.7" />
        <path d="M421 106 l6 6 l10 -12" stroke={ink.node} strokeWidth="2" fill="none" />
        <text x="430" y="166" textAnchor="middle" fill={ink.label} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="500">
          transform
        </text>
        <text x="430" y="180" textAnchor="middle" fill={ink.edgeActive} fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.9">
          JSON map
        </text>
      </motion.g>

      {/* Node: Action */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.75 }}
      >
        <motion.circle
          cx="700"
          cy="140"
          r="40"
          fill="none"
          stroke={ink.edgeActive}
          strokeOpacity="0.5"
          animate={{ r: [34, 48], opacity: [0.5, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 1.4 }}
        />
        <circle cx="700" cy="140" r="34" fill={ink.node} stroke={ink.node} strokeWidth="2" />
        <circle cx="700" cy="140" r="26" stroke="rgba(255,255,255,0.6)" strokeWidth="1" strokeDasharray="3 4" opacity="0.6" />
        <path d="M691 136 h18 M700 127 v18" stroke={theme === "ink" ? "#0C100A" : "#FFFFFF"} strokeWidth="3" strokeLinecap="round" />
        <text x="700" y="196" textAnchor="middle" fill={theme === "ink" ? "#FFFFFF" : "#0C100A"} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          action
        </text>
        <text x="700" y="210" textAnchor="middle" fill={ink.edgeActive} fontSize="9" fontFamily="JetBrains Mono, monospace" opacity="0.9">
          deploy
        </text>
      </motion.g>

      {/* Filled node: lower row */}
      <motion.g
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <motion.circle
          cx="120"
          cy="330"
          r="40"
          fill="none"
          stroke={ink.node}
          strokeOpacity="0.4"
          animate={{ r: [34, 48], opacity: [0.4, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 2.1 }}
        />
        <circle cx="120" cy="330" r="34" fill={ink.node} stroke={ink.node} strokeWidth="2" />
        <circle cx="120" cy="330" r="8" fill={theme === "ink" ? "#0C100A" : "#FFFFFF"} />
        <text x="120" y="386" textAnchor="middle" fill={theme === "ink" ? "#FFFFFF" : "#0C100A"} fontSize="11" fontFamily="JetBrains Mono, monospace" fontWeight="600">
          source
        </text>
      </motion.g>

      {/* Small filler nodes */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.05 }}
      >
        <circle cx="440" cy="320" r="12" fill={theme === "ink" ? "#13190F" : "#FFFFFF"} stroke={ink.node} strokeWidth="2" />
        <circle cx="700" cy="300" r="12" fill="#13190F" stroke={ink.edge} strokeWidth="1.5" />
        <motion.circle
          cx="460"
          cy="215"
          r="8"
          fill={ink.edgeActive}
          opacity="0.8"
          animate={{ r: [6, 9, 6], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
        />
        <motion.circle
          cx="690"
          cy="220"
          r="6"
          fill={ink.edgeActive}
          animate={{ r: [4, 7, 4], opacity: [0.4, 0.9, 0.4] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
        />
      </motion.g>
    </svg>
  )
}