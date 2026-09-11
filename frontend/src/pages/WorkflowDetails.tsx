import { motion } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { Download, Copy, Share2, ArrowLeft, Tag, Braces } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function WorkflowDetails() {
  const { id } = useParams()
  // Mock data for V1 MVP UI
  const workflow = {
    id,
    title: "Slack to Notion Sync",
    description: "Automatically syncs saved Slack messages to a Notion database. Extremely useful for keeping track of action items discussed in channels without leaving your workflow.",
    author: "johndoe",
    downloads: 142,
    version: "1.0.0",
    tags: ["slack", "notion", "productivity"],
    jsonPreview: `{\n  "name": "Slack to Notion Sync",\n  "nodes": [\n    {\n      "parameters": {},\n      "name": "Start",\n      "type": "n8n-nodes-base.start",\n      "typeVersion": 1,\n      "position": [\n        250,\n        300\n      ]\n    }\n  ]\n}`
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(workflow.jsonPreview)
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Link to="/explore" className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> cd ../explore
      </Link>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* Left Column: Details */}
        <div className="lg:col-span-2 space-y-6">
          <div>
            <p className="eyebrow text-muted-foreground mb-3">// workflow_{id}.json</p>
            <h1 className="text-4xl font-extrabold tracking-tight mb-4">
              {workflow.title}
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">{workflow.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {workflow.tags.map((tag, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5 font-mono text-xs bg-card border-2 border-border px-3 py-1.5 rounded-lg text-foreground">
                <Tag className="w-3 h-3 opacity-60" />
                {tag}
              </span>
            ))}
          </div>

          <div className="relative mt-8 paper-card overflow-hidden">
            <div className="flex items-center justify-between px-5 py-3 border-b border-border bg-muted/50">
              <span className="flex items-center gap-2 font-mono text-xs font-semibold text-foreground uppercase tracking-wider">
                <Braces className="w-4 h-4 text-[hsl(79,60%,35%)]" /> JSON preview
              </span>
              <Button
                size="icon"
                variant="ghost"
                className="hover:bg-ink hover:text-[hsl(79,90%,55%)]"
                onClick={handleCopy}
              >
                <Copy className="w-4 h-4" />
              </Button>
            </div>
            <pre className="p-6 text-[13px] leading-relaxed font-mono text-foreground bg-ink text-emerald-300 overflow-x-auto">
              <code>{workflow.jsonPreview}</code>
            </pre>
          </div>
        </div>

        {/* Right Column: Actions & Meta */}
        <div className="space-y-6">
          <div className="paper-card p-6 border-2 border-foreground shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="space-y-4 pt-2">
              <Button className="btn-volt w-full h-12 text-base rounded-xl">
                <Download className="w-5 h-5 mr-2" /> $ download .json
              </Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full border-2 border-border bg-card font-mono hover:bg-muted">
                  <Copy className="w-4 h-4 mr-2" /> copy
                </Button>
                <Button variant="outline" className="w-full border-2 border-border bg-card font-mono hover:bg-muted">
                  <Share2 className="w-4 h-4 mr-2" /> share
                </Button>
              </div>
            </div>
          </div>

          <div className="paper-card">
            <div className="px-6 py-4 border-b border-border bg-muted/50">
              <p className="eyebrow text-muted-foreground">// about this workflow</p>
            </div>
            <div className="px-6 py-5 space-y-4 text-sm font-medium">
              <div className="flex justify-between pb-3 border-b border-dashed border-border">
                <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">author</span>
                <span className="font-semibold text-[hsl(79,50%,30%)] font-mono">@{workflow.author}</span>
              </div>
              <div className="flex justify-between pb-3 border-b border-dashed border-border">
                <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">downloads</span>
                <span className="font-bold">{workflow.downloads}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground font-mono text-xs uppercase tracking-wider">version</span>
                <span className="font-bold font-mono">v{workflow.version}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}