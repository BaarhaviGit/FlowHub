import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Filter, TrendingUp, Sparkles, Check } from "lucide-react"
import WorkflowCard from "../components/WorkflowCard"
import { Button } from "@/components/ui/button"
import axios from "axios"

const CATEGORIES = ["All", "AI", "Productivity", "Utility", "Sales", "Marketing"]
const INTEGRATIONS = ["slack", "notion", "openai", "gmail", "stripe", "discord", "github", "hubspot"]

export default function Explore() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([])
  
  useEffect(() => {
    // Fetch dynamic workflows from the Spring Boot backend
    axios.get("http://localhost:8080/api/workflows")
      .then(response => {
        setWorkflows(response.data)
      })
      .catch(error => {
        console.error("Error fetching workflows:", error)
      })
  }, [])

  // Filter Logic
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
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Trending Banner */}
      <section className="w-full border-b border-white/10 bg-card/30 backdrop-blur-md pt-8 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-bold tracking-tight text-foreground">Trending Automations</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {workflows.filter(wf => wf.downloadCount > 500).map((wf, idx) => (
              <motion.div
                key={`trending-${wf.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
              >
                <div className="relative border border-primary/20 bg-background/50 rounded-xl p-6 overflow-hidden group hover:border-primary/50 transition-colors">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-emerald-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg">{wf.title}</h3>
                    <Sparkles className="w-4 h-4 text-primary" />
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">{wf.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Explore Content */}
      <section className="flex-1 max-w-7xl mx-auto w-full px-4 py-12 flex flex-col md:flex-row gap-8 relative z-10">
        
        {/* Sidebar Filters */}
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2 font-semibold text-lg border-b border-white/10 pb-2">
              <Filter className="w-4 h-4" />
              <span>Categories</span>
            </div>
            <div className="flex flex-col gap-2">
              {CATEGORIES.map(category => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`text-left px-3 py-2 rounded-md text-sm transition-all ${
                    selectedCategory === category 
                      ? "bg-primary/20 text-primary font-medium" 
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="font-semibold text-lg border-b border-white/10 pb-2">
              Integrations
            </div>
            <div className="flex flex-wrap gap-2">
              {INTEGRATIONS.map(integration => {
                const isSelected = selectedIntegrations.includes(integration)
                return (
                  <button
                    key={integration}
                    onClick={() => toggleIntegration(integration)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all flex items-center gap-1 border ${
                      isSelected 
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_0_10px_rgba(0,229,255,0.3)]" 
                        : "bg-secondary text-muted-foreground border-white/10 hover:border-white/30"
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
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <input 
              type="text" 
              placeholder="Search workflows, authors, or tags..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 bg-card/50 hover:bg-card border border-white/10 rounded-xl pl-12 pr-4 text-base focus:outline-none focus:ring-1 focus:ring-primary/50 shadow-sm transition-all duration-300 placeholder:text-muted-foreground"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-muted-foreground">
            <span>Showing {filteredWorkflows.length} workflows</span>
            <select className="bg-transparent border-none focus:ring-0 outline-none cursor-pointer hover:text-foreground transition-colors">
              <option>Most Downloaded</option>
              <option>Newest</option>
              <option>Highest Rated</option>
            </select>
          </div>

          <motion.div layout className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-2">
            <AnimatePresence mode="popLayout">
              {filteredWorkflows.map((wf) => (
                <motion.div
                  layout
                  key={wf.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <WorkflowCard {...wf} />
                </motion.div>
              ))}
            </AnimatePresence>
            
            {filteredWorkflows.length === 0 && (
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="col-span-full py-20 text-center flex flex-col items-center justify-center border border-dashed border-white/10 rounded-xl"
              >
                <Search className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No workflows found</h3>
                <p className="text-muted-foreground max-w-md">
                  We couldn't find anything matching your filters. Try adjusting your search query or clearing the selected categories.
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
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
        
      </section>
    </div>
  )
}
