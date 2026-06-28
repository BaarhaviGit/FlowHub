import { motion } from "framer-motion"
import { useParams, Link } from "react-router-dom"
import { Download, Copy, Share2, ArrowLeft, Tag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

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
    // could add a toast here
  }

  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <Link to="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-1" /> Back to Explore
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
            <h1 className="text-4xl font-bold mb-4">{workflow.title}</h1>
            <p className="text-lg text-muted-foreground">{workflow.description}</p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            {workflow.tags.map((tag, idx) => (
              <span key={idx} className="flex items-center text-sm bg-secondary/50 px-3 py-1 rounded-full text-foreground border border-white/5">
                <Tag className="w-3 h-3 mr-1.5 opacity-70" />
                {tag}
              </span>
            ))}
          </div>

          <Card className="bg-secondary/80 border-white/20 mt-8 shadow-md">
            <CardHeader>
              <CardTitle>JSON Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative group rounded-md overflow-hidden bg-black/60 border border-white/20 shadow-inner">
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-background/50 backdrop-blur-md hover:bg-background/80"
                  onClick={handleCopy}
                >
                  <Copy className="w-4 h-4" />
                </Button>
                <pre className="p-4 text-sm text-emerald-400 overflow-x-auto">
                  <code>{workflow.jsonPreview}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Actions & Meta */}
        <div className="space-y-6">
          <Card className="bg-primary/5 border-primary/20 shadow-[0_0_30px_rgba(124,58,237,0.1)]">
            <CardContent className="pt-6 space-y-4">
              <Button className="w-full h-12 text-md shadow-[0_0_15px_rgba(124,58,237,0.3)] hover:shadow-[0_0_25px_rgba(124,58,237,0.5)] transition-all">
                <Download className="w-5 h-5 mr-2" /> Download JSON
              </Button>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" className="w-full bg-background/50">
                  <Copy className="w-4 h-4 mr-2" /> Copy
                </Button>
                <Button variant="outline" className="w-full bg-background/50">
                  <Share2 className="w-4 h-4 mr-2" /> Share
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-secondary/80 border-white/20 shadow-md">
            <CardHeader>
              <CardTitle className="text-lg">About this workflow</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted-foreground">Author</span>
                <span className="font-medium text-primary">@{workflow.author}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-muted-foreground">Downloads</span>
                <span className="font-medium">{workflow.downloads}</span>
              </div>
              <div className="flex justify-between pb-2">
                <span className="text-muted-foreground">Version</span>
                <span className="font-medium">{workflow.version}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </div>
  )
}
