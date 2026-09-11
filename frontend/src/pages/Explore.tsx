import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, TrendingUp, Sparkles, Check, Braces } from "lucide-react"
import WorkflowCard from "../components/WorkflowCard"
import { Button } from "@/components/ui/button"
import api from "../lib/api"

const CATEGORIES = ["All", "AI", "Productivity", "Utility", "Sales", "Marketing"]
const INTEGRATIONS = ["slack", "notion", "openai", "gmail", "stripe", "discord", "github", "hubspot"]

export default function Explore() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])

  useEffect(() => {
    api.get("/workflows")
      .then(response => setWorkflows(response.data))
      .catch(error => console.error("Error fetching workflows:", error))
  }, [])

  const filteredWorkflows = workflows.filter(wf => {
    const matchesSearch = wf.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          wf.description?.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || wf.category === selectedCategory
    const matchesIntegrations = selectedIntegrations.length === 0 ||
                                selectedIntegrations.some(i => wf.tags?.includes(i))
    return matchesSearch && matchesCategory && matchesIntegrations
  })

  const toggleIntegration = (integration: string) => {
    if (selectedIntegrations.includes(integration)) {
      setSelectedIntegrations(selectedIntegrations.filter(i => i !== integration))
    } else {
      setSelectedIntegrations([...selectedIntegrations, integration])
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      {/* Trending Banner */}
      <section className="w-full border-b-2 border-border/70 bg-[hsl(46,26%,95%)]/70 backdrop-blur-md pt-10 pb-14 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-end justify-between gap-6 mb-8">
            <div>
              <p className="eyebrow text-muted-foreground mb-3">// trending now</p>
              <h2 className="text-3xl font-extrabold tracking-tight flex items-center gap-3">
                <TrendingUp className="w-6 h-6 text-[hsl(79,60%,35%)]" />
                Trending <span className="serif-accent">automations</span>
              </h2>
            </div>
            <span className="hidden md:inline-flex items-center gap-2 font-mono text-xs text-muted-foreground border-2 border-border px-3 py-1.5 rounded-lg">
              <Braces className="w-3.5 h-3.5 text-[hsl(79,60%,35%)]" />
              {workflows.length} workflows in feed
            </span>
          </div>

          {workflows.filter(wf => wf.downloadCount > 500).length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {workflows.filter(wf => wf.downloadCount > 500).map((wf, idx) => (
                <motion.div
                  key={`trending-${wf.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                >
                  <div className="paper-card p-6 group relative overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-[hsl(79,90%,50%)] opacity-60 group-hover:opacity-100 transition-opacity" />
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                        #{idx + 1} trending
                      </span>
                      <Sparkles className="w-4 h-4 text-[hsl(79,60%,40%)]" />
                    </div>
                    <h3 className="font-bold text-lg tracking-tight mb-2">{wf.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">{wf.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <p className="font-mono text-sm text-muted-foreground border-2 border-dashed border-border rounded-2xl py-10 text-center">
              // no trending workflows yet — upload the first hot one
            </p>
          )}
        </div>
      </section>

      {/* Main Explore Content */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-10 relative z-10">
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-10">
          <div className="space-y-4">
            <p className="eyebrow text-muted-foreground">categories</p>
            <div className="flex flex-col gap-1.5">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left px-4 py-2.5 rounded-lg font-mono text-sm transition-all border-2 ${
                    selectedCategory === category
                      ? "bg-ink text-ink-fore border-ink shadow-[3px_3px_0_0_var(--foreground)]"
                      : "text-muted-foreground border-transparent hover:bg-card hover:border-border hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="eyebrow text-muted-foreground">integrations</p>
            <div className="flex flex-wrap gap-2">
              {INTEGRATIONS.map(integration => {
                const isSelected = selectedIntegrations.includes(integration)
                return (
                  <button
                    key={integration}
                    onClick={() => toggleIntegration(integration)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all flex items-center gap-1.5 border-2 ${
                      isSelected
                        ? "bg-primary text-primary-foreground border-foreground shadow-[2px_2px_0_0_var(--foreground)]"
                        : "bg-card text-muted-foreground border-border hover:border-foreground hover:text-foreground"
                    }`}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    {integration}
                  </button>
                )
              })}
            </div>
          </div>
        </aside>

        {/* Grid & Search */}
        <div className="flex-1 flex flex-col gap-6">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-foreground" />
            <input
              type="text"
              placeholder="search workflows, authors, or tags…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-card hover:bg-white border-2 border-foreground rounded-xl pl-12 pr-4 text-base font-medium focus:outline-none focus:ring-0 shadow-[3px_3px_0_0_var(--foreground)] transition-all duration-300 placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex justify-between items-center font-mono text-xs text-muted-foreground">
            <span>// showing {filteredWorkflows.length} workflow{filteredWorkflows.length === 1 ? "" : "s"}</span>
            <select className="bg-card border-2 border-border rounded-lg px-3 py-2 cursor-pointer hover:text-foreground transition-colors font-medium">
              <option>most downloaded</option>
              <option>newest</option>
              <option>highest rated</option>
            </select>
          </div>

          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
            <AnimatePresence mode="popLayout">
              {filteredWorkflows.map((wf) => (
                <motion.div
                  layout
                  key={wf.id}
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkflowCard {...wf} />
                </motion.div>
              ))}
            </AnimatePresence>

            {filteredWorkflows.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center border-2 border-dashed border-border rounded-2xl"
              >
                <Braces className="w-12 h-12 text-muted-foreground mb-4 opacity-40" />
                <h3 className="text-xl font-extrabold tracking-tight mb-2">no workflows found</h3>
                <p className="text-muted-foreground max-w-md font-medium">
                  We couldn't find anything matching your filters. Try adjusting
                  your search query or clearing the selected categories.
                </p>
                <Button
                  variant="outline"
                  className="mt-6"
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("All")
                    setSelectedIntegrations([])
                  }}
                >
                  clear filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}