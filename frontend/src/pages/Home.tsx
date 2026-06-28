import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Terminal, Loader2, CheckCircle2, Server, Rocket } from "lucide-react"
import WorkflowCard from "../components/WorkflowCard"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "../lib/api"

export default function Home() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [showDeployModal, setShowDeployModal] = useState(false)
  const [deployStep, setDeployStep] = useState(0)

  useEffect(() => {
    // Fetch dynamic workflows from the Spring Boot backend
    api.get("/workflows")
      .then(response => {
        setWorkflows(response.data)
      })
      .catch(error => {
        console.error("Error fetching workflows:", error)
      })
  }, [])

  const startDeployment = async () => {
    if (workflows.length === 0) {
      toast.error("No workflows found! Please go to Upload and upload a workflow first.");
      return;
    }
    
    // Sort workflows by ID descending to reliably grab the newest one
    const sortedWorkflows = [...workflows].sort((a, b) => b.id - a.id);
    const targetWorkflowId = sortedWorkflows[0].id;

    setShowDeployModal(true)
    setDeployStep(0)
    
    // Step 1: Provisioning UI
    setTimeout(() => setDeployStep(1), 300) 
    
    // Step 2: Core dependencies
    setTimeout(() => setDeployStep(2), 800)
    
    try {
      // Step 3: Injecting
      const deployRes = await api.post(`/workflows/${targetWorkflowId}/deploy`)
      setDeployStep(3)
      
      // Step 4: Exposing Webhook
      setTimeout(() => setDeployStep(4), 1000)
      
      // Step 5: Complete
      setTimeout(() => {
        setDeployStep(5)
          toast.success("Deployment Successful!", {
            description: deployRes.data.n8nResponse.warning
          })
      }, 1500)

    } catch (error: any) {
      console.error("Deployment failed:", error)
      let msg = error.response?.data?.message || "Is n8n running?";
      // Parse double-encoded JSON if present
      if (msg.startsWith("{")) {
        try { msg = JSON.parse(msg).message; } catch(e) {}
      }
      toast.error("Deployment failed: " + msg);
      setShowDeployModal(false);
    }
  }

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-20 lg:py-32 flex flex-col items-center justify-center text-center px-4 relative overflow-hidden bg-background">
        {/* Abstract 3D Hero Background Glow/Image */}
        <div className="absolute top-0 right-0 -mr-48 -mt-24 opacity-30 pointer-events-none hidden lg:block">
          <img src="/hero-image.png" alt="Abstract Workflow" className="w-[800px] h-auto object-cover mask-image-linear" style={{ maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }} />
        </div>
        <div className="absolute bottom-0 left-0 -ml-48 -mb-24 opacity-30 pointer-events-none hidden lg:block">
          <img src="/hero-image.png" alt="Abstract Workflow" className="w-[800px] h-auto object-cover transform -scale-x-100" style={{ maskImage: 'radial-gradient(circle, black 30%, transparent 70%)', WebkitMaskImage: 'radial-gradient(circle, black 30%, transparent 70%)' }} />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="z-10 max-w-4xl w-full flex flex-col items-center relative"
        >
          <span className="px-3 py-1 text-xs font-semibold tracking-wider uppercase bg-primary/10 text-primary border border-primary/20 rounded-full mb-8 inline-block shadow-[0_0_15px_rgba(0,229,255,0.15)]">
            FlowHub V1 MVP is Live
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-foreground leading-[1.1]">
            The <span className="text-primary">GitHub</span> for<br />Automations
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 max-w-2xl mx-auto font-medium">
            Discover, share, and collaborate on powerful n8n workflows. Stop reinventing the wheel and join the community of automation builders.
          </p>
          
          <div className="flex flex-col items-center justify-center w-full max-w-xl mx-auto relative group mb-16">
            <div className="relative w-full transition-all duration-300 group-focus-within:-translate-y-1">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-primary" />
              </div>
              <input 
                type="text" 
                placeholder="Search workflows, tags, or categories..." 
                className="w-full h-14 bg-card/80 hover:bg-card border border-white/10 rounded-full pl-14 pr-16 text-base focus:outline-none focus:ring-1 focus:ring-primary/50 shadow-lg backdrop-blur-md transition-all duration-300 placeholder:text-muted-foreground"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <kbd className="hidden sm:inline-flex h-7 items-center gap-1 rounded-md border border-white/10 bg-background/50 px-2 text-[11px] font-medium text-muted-foreground shadow-sm backdrop-blur-sm">
                  <span className="text-xs">⌘</span>K
                </kbd>
              </div>
            </div>
          </div>

          {/* Innovative Stats & Trust Section */}
          <div className="flex flex-wrap items-center justify-center gap-8 md:gap-16 pt-8 border-t border-white/5 w-full max-w-3xl">
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">10k+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Workflows</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">500+</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Integrations</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-foreground">1-Click</span>
              <span className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Deployment</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Interactive Stack Builder */}
      <section className="w-full max-w-5xl px-4 py-16 text-center border-t border-white/5 mt-12 relative z-10">
        <h2 className="text-3xl font-bold mb-4">Interactive Stack Builder</h2>
        <p className="text-muted-foreground mb-8">Select the tools you use, and we'll instantly find the perfect automation workflows for your stack.</p>
        
        <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
          {["Slack", "Stripe", "OpenAI", "Notion", "Discord", "GitHub"].map((tool) => (
            <button 
              key={tool}
              onClick={() => {}} // Placeholder for interactivity
              className="px-6 py-3 rounded-xl bg-card border border-white/10 hover:border-primary/50 hover:bg-primary/10 transition-all font-medium text-foreground flex items-center gap-2"
            >
              <div className="w-4 h-4 rounded-full bg-primary/20" />
              {tool}
            </button>
          ))}
        </div>
        <div className="h-px w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent my-12" />
      </section>

      {/* 1-Click FlowHub Cloud Deployment */}
      <section className="w-full max-w-7xl px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
        <div>
          <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-2 block">Zero Config Hosting</span>
          <h2 className="text-4xl font-bold mb-6 leading-tight">1-Click Deploy to <br/>FlowHub Cloud</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Why worry about managing VPS instances, reverse proxies, and Docker containers? With FlowHub Cloud, you can deploy any workflow to our secure, autoscaling infrastructure with a single click.
          </p>
          <ul className="space-y-4 mb-8">
            <li className="flex items-center gap-3 text-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">✓</div>
              Instant provisioning and auto-scaling
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">✓</div>
              Automated backups and zero-downtime updates
            </li>
            <li className="flex items-center gap-3 text-foreground">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm">✓</div>
              Dedicated webhook URLs instantly available
            </li>
          </ul>
          <Button onClick={startDeployment} className="rounded-full px-8 py-6 text-lg shadow-[0_0_20px_rgba(0,229,255,0.4)] hover:shadow-[0_0_30px_rgba(0,229,255,0.6)] transition-all">
            <Rocket className="mr-2 h-5 w-5" /> Try FlowHub Cloud
          </Button>
        </div>
        <div className="relative">
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full"></div>
          <div className="relative bg-[#0d1117] border border-white/10 rounded-2xl p-8 shadow-2xl overflow-hidden">
            <div className="flex items-center justify-between mb-6 border-b border-white/10 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <span className="text-xs text-muted-foreground font-mono flex items-center gap-2">
                <Terminal className="w-3 h-3" /> flowhub-cli
              </span>
            </div>
            <div className="space-y-4 font-mono text-sm text-emerald-400">
              <p>➜ Initiating deployment sequence...</p>
              <p>➜ Provisioning secure container...</p>
              <p>➜ Installing n8n v1.15.2...</p>
              <p>➜ Injecting workflow JSON...</p>
              <p className="text-primary font-bold mt-4 animate-pulse">✓ Deployment Successful! Webhook active.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Deployment Modal Overlay */}
      <AnimatePresence>
        {showDeployModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-card border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-6 border-b border-white/10 bg-muted/50">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Server className="w-5 h-5 text-primary" />
                  Deploying to FlowHub Cloud
                </h3>
                <p className="text-sm text-muted-foreground mt-1">Spinning up a dedicated n8n instance for you.</p>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { step: 1, text: "Provisioning secure container infrastructure..." },
                  { step: 2, text: "Installing core n8n dependencies..." },
                  { step: 3, text: "Injecting workflow logic and compiling nodes..." },
                  { step: 4, text: "Exposing public webhook endpoint..." }
                ].map((item) => (
                  <div key={item.step} className="flex items-start gap-4">
                    <div className="mt-0.5">
                      {deployStep < item.step ? (
                        <div className="w-5 h-5 rounded-full border-2 border-muted-foreground" />
                      ) : deployStep === item.step ? (
                        <Loader2 className="w-5 h-5 text-primary animate-spin" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                      )}
                    </div>
                    <div>
                      <p className={`font-medium ${deployStep >= item.step ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.text}
                      </p>
                      {deployStep === item.step && (
                        <p className="text-xs text-primary animate-pulse mt-1">Processing...</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-6 border-t border-white/10 bg-muted/50 flex justify-end gap-4">
                {deployStep < 4 ? (
                  <Button variant="outline" onClick={() => setShowDeployModal(false)}>Cancel</Button>
                ) : (
                  <Button onClick={() => setShowDeployModal(false)} className="w-full font-bold">
                    Go to Dashboard
                  </Button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* For Developers & For Business */}
      <section className="w-full bg-card/30 border-y border-white/5 py-24 mt-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          <div className="bg-background border border-white/10 rounded-3xl p-10 hover:border-primary/30 transition-all group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">For Developers</h3>
            <p className="text-muted-foreground mb-6">Stop rewriting the same boilerplate API connections. Fork community workflows, modify the node JSON, and submit PRs back to the creator. Version control your entire automation stack natively.</p>
            <Button variant="outline" className="rounded-full">Read Developer Docs</Button>
          </div>
          <div className="bg-background border border-white/10 rounded-3xl p-10 hover:border-primary/30 transition-all group">
            <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">For Business</h3>
            <p className="text-muted-foreground mb-6">Empower your RevOps and marketing teams. Deploy enterprise-grade, secure automations without hiring dedicated integration engineers. Managed SLAs and 24/7 dedicated support available.</p>
            <Button variant="outline" className="rounded-full">View Enterprise Plans</Button>
          </div>
        </div>
      </section>

      {/* Latest Uploads Section */}
      <section className="w-full max-w-7xl px-4 py-24">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Latest Uploads</h2>
            <p className="text-muted-foreground">Explore the newest workflows shared by the community.</p>
          </div>
          <Button variant="outline" className="hidden sm:flex rounded-full">View All Workflows</Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {workflows.map((wf: any, idx) => (
            <motion.div
              key={wf.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <WorkflowCard {...wf} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="w-full max-w-4xl px-4 py-24 mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12">Frequently Asked Questions</h2>
        <div className="space-y-4 text-left">
          {[
            { q: "What makes FlowHub different from standard n8n hosting?", a: "FlowHub is a marketplace first. You don't just get hosting; you get instant access to thousands of pre-built, community-verified workflows that you can deploy with a single click without touching the n8n UI." },
            { q: "Can I host these workflows on my own VPS?", a: "Absolutely. We provide the raw workflow JSON so you can self-host on Bluehost, DigitalOcean, or your local machine for free. The FlowHub Cloud is just an optional, frictionless deployment target." },
            { q: "Are the workflows verified for security?", a: "Yes. Our automated CI pipeline checks all uploaded workflows for malicious arbitrary code execution patterns before they are published to the marketplace." },
            { q: "Is FlowHub really open source?", a: "Yes! The core FlowHub marketplace platform is open source. You can host your own private internal FlowHub instance for your company." }
          ].map((faq, i) => (
            <div key={i} className="bg-card border border-white/10 rounded-2xl p-6">
              <h4 className="text-xl font-semibold mb-2">{faq.q}</h4>
              <p className="text-muted-foreground">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
