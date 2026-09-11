import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Terminal, Loader2, CheckCircle2, Server, Rocket, ArrowRight, Braces, Zap, Globe } from "lucide-react"
import WorkflowCard from "../components/WorkflowCard"
import NodeCanvas from "../components/NodeCanvas"
import CountUp from "../components/CountUp"
import Marquee from "../components/Marquee"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import api from "../lib/api"

const DEPLOY_STEPS = [
  "Provisioning secure container infrastructure...",
  "Installing core n8n dependencies...",
  "Injecting workflow logic and compiling nodes...",
  "Exposing public webhook endpoint..."
]

const FAQS = [
  { q: "What makes FlowHub different from standard n8n hosting?", a: "FlowHub is a marketplace first. You don't just get hosting; you get instant access to thousands of pre-built, community-verified workflows that you can deploy with a single click without touching the n8n UI." },
  { q: "Can I host these workflows on my own VPS?", a: "Absolutely. We provide the raw workflow JSON so you can self-host on Bluehost, DigitalOcean, or your local machine for free. The FlowHub Cloud is just an optional, frictionless deployment target." },
  { q: "Are the workflows verified for security?", a: "Yes. Our automated CI pipeline checks all uploaded workflows for malicious arbitrary code execution patterns before they are published to the marketplace." },
  { q: "Is FlowHub really open source?", a: "Yes! The core FlowHub marketplace platform is open source. You can host your own private internal FlowHub instance for your company." }
]

export default function Home() {
  const [workflows, setWorkflows] = useState<any[]>([])
  const [showDeployModal, setShowDeployModal] = useState(false)
  const [deployStep, setDeployStep] = useState(0)
  const [openFaq, setOpenFaq] = useState<number | null>(0)

  useEffect(() => {
    api.get("/workflows")
      .then(response => setWorkflows(response.data))
      .catch(error => console.error("Error fetching workflows:", error))
  }, [])

  const startDeployment = async () => {
    if (workflows.length === 0) {
      toast.error("No workflows found! Please go to Upload and upload a workflow first.");
      return;
    }

    const sortedWorkflows = [...workflows].sort((a, b) => b.id - a.id);
    const targetWorkflowId = sortedWorkflows[0].id;

    setShowDeployModal(true)
    setDeployStep(0)
    setTimeout(() => setDeployStep(1), 300)
    setTimeout(() => setDeployStep(2), 800)

    try {
      const deployRes = await api.post(`/workflows/${targetWorkflowId}/deploy`)
      setDeployStep(3)
      setTimeout(() => setDeployStep(4), 1000)
      setTimeout(() => {
        setDeployStep(5)
        toast.success("Deployment Successful!", {
          description: deployRes.data.n8nResponse.warning
        })
      }, 1500)
    } catch (error: any) {
      console.error("Deployment failed:", error)
      let msg = error.response?.data?.message || "Is n8n running?";
      if (msg.startsWith("{")) {
        try { msg = JSON.parse(msg).message; } catch (e) {}
      }
      toast.error("Deployment failed: " + msg);
      setShowDeployModal(false);
    }
  }

  return (
    <div className="flex flex-col items-center overflow-x-clip">
      {/* ================= HERO ================= */}
      <section className="w-full relative overflow-hidden">
        <div className="absolute inset-0 dot-grid opacity-60 pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[hsl(79,90%,50%)]/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 pt-16 lg:pt-24 pb-20 grid lg:grid-cols-2 gap-14 items-center">
          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative z-10"
          >
            <div className="flex flex-wrap items-center gap-3 mb-8">
              <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border-2 border-foreground bg-card font-mono text-xs font-semibold tracking-wide shadow-[3px_3px_0_0_var(--foreground)]">
                <span className="ping-dot" />
                POST /webhook/flowhub-live
              </span>
              <span className="inline-flex items-center gap-2 px-3 py-2 rounded-full bg-ink text-ink-fore font-mono text-xs">
                <Zap className="w-3.5 h-3.5 text-[hsl(79,90%,55%)]" />
                V1 MVP is LIVE
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[0.98] text-foreground mb-8">
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                The <span className="serif-accent">GitHub</span> for
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="block relative inline-block"
              >
                <span className="serif-accent text-transparent bg-clip-text bg-gradient-to-r from-[hsl(79,70%,30%)] to-[hsl(90,60%,20%)]">Automations</span>
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-2 left-0 right-0 h-[6px] bg-[hsl(79,90%,50%)] origin-left -rotate-1"
                />
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-xl font-medium leading-relaxed"
            >
              Discover, share, and collaborate on powerful n8n workflows.
              Stop reinventing the wheel — deploy production-ready automations
              in a single click.
            </motion.p>

            <div className="relative group w-full max-w-lg mb-14">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-muted-foreground transition-colors group-focus-within:text-[hsl(79,60%,35%)]" />
              </div>
              <input
                type="text"
                placeholder="Search workflows, tags, or categories..."
                className="w-full h-14 bg-card border-2 border-foreground rounded-2xl pl-14 pr-24 text-base font-medium focus:outline-none focus:ring-0 shadow-[4px_4px_0_0_var(--foreground)] transition-all duration-300 placeholder:text-muted-foreground"
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <kbd className="inline-flex h-8 items-center gap-1 rounded-lg border-2 border-foreground bg-card px-2.5 text-[11px] font-mono font-semibold text-muted-foreground">
                  <span>⌘</span>K
                </kbd>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-8 md:gap-12 pt-8 border-t-2 border-dashed border-border w-full max-w-lg">
              {([
                { to: 10000, suffix: "+", l: "workflows" },
                { to: 500, suffix: "+", l: "integrations" },
                { v: "1-click", l: "deploy" }
              ] as { to?: number; suffix?: string; v?: string; l: string }[]).map((stat) => (
                <div key={stat.l}>
                  <span className="block text-3xl font-extrabold tracking-tight text-foreground">
                    {stat.to !== undefined ? <CountUp to={stat.to!} suffix={stat.suffix} /> : stat.v}
                  </span>
                  <span className="block text-[11px] text-muted-foreground uppercase tracking-[0.2em] font-mono mt-0.5">{stat.l}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Node canvas visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="relative z-10 hidden lg:block"
          >
            <div className="relative animate-float">
              <div className="absolute inset-0 bg-[hsl(79,90%,50%)]/10 blur-[80px] rounded-full" />

              <div className="relative ink-section rounded-3xl p-8 border border-ink shadow-[8px_8px_0_0_var(--foreground)] overflow-hidden">
                <div className="absolute inset-0 dot-grid-ink" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(79,90%,55%)]/60 to-transparent" />

                <div className="relative flex items-center justify-between mb-6">
                  <span className="flex items-center gap-2 font-mono text-xs text-[hsl(79,90%,55%)]">
                    <Braces className="w-3.5 h-3.5" /> flowhub/n8n-workflow.json
                  </span>
                  <span className="flex gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                  </span>
                </div>

                <pre className="relative json-ln text-ink-fore mb-8 overflow-hidden">
                  <code>
                    <span className="js-punc">{"{"}</span>
                    {"\n  "}<span className="js-key">"trigger"</span><span className="js-punc">: </span><span className="js-str">"webhook"</span><span className="js-punc">,</span>
                    {"\n  "}<span className="js-key">"nodes"</span><span className="js-punc">: </span><span className="js-punc">[</span><span className="js-str">"slack"</span><span className="js-punc">, </span><span className="js-str">"openai"</span><span className="js-punc">, </span><span className="js-str">"notion"</span><span className="js-punc">]</span><span className="js-punc">,</span>
                    {"\n  "}<span className="js-key">"active"</span><span className="js-punc">: </span><span className="js-bool">true</span>
                    {"\n"}
                    <span className="js-punc">{"}"}</span>
                  </code>
                </pre>

                <div className="relative -mx-4">
                  <NodeCanvas theme="ink" className="w-full h-auto" />
                </div>

                <div className="relative mt-4 flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-xs text-ink-muted">
                  <Globe className="w-3.5 h-3.5 text-[hsl(79,90%,55%)]" />
                  <span className="text-ink-fore">https://flowhub.cloud/r/</span>
                  <span className="text-[hsl(79,90%,55%)]">wh_9f2c…</span>
                  <span className="ml-auto flex items-center gap-1.5 text-emerald-400">
                    <span className="ping-dot" /> deployed
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ================= INTEGRATION TICKER ================= */}
      <section className="w-full border-y-2 border-border/70 bg-[hsl(46,22%,92%)] py-5 relative overflow-hidden">
        <Marquee items={["slack", "stripe", "openai", "notion", "discord", "github", "gmail", "hubspot", "linear", "supabase", "n8n", "postgres"]} />
      </section>

      {/* ================= STACK BUILDER ================= */}
      <section id="stack-builder" className="w-full py-16 relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-10">
            <div>
              <p className="eyebrow text-muted-foreground mb-3">// 01 · stack builder</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
                What's in your <span className="serif-accent">stack?</span>
              </h2>
            </div>
            <p className="text-muted-foreground max-w-sm text-sm font-medium">
              Select the tools you use and we'll instantly find the perfect
              automation workflows for your setup.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 mb-4">
            {["slack", "stripe", "openai", "notion", "discord", "github"].map((tool, i) => (
              <motion.button
                key={tool}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
                onClick={() => {}}
                className="group inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-card border-2 border-border font-mono text-sm font-semibold text-foreground transition-all duration-200 hover:border-foreground hover:shadow-[3px_3px_0_0_var(--foreground)] hover:-translate-y-0.5"
              >
                <span className="w-2.5 h-2.5 rounded-full bg-[hsl(79,70%,45%)] group-hover:animate-pulse" />
                {tool}
                <span className="font-sans opacity-0 group-hover:opacity-100 transition-opacity">→</span>
              </motion.button>
            ))}
            <motion.button
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border-2 border-dashed border-border font-mono text-sm font-semibold text-muted-foreground hover:border-foreground hover:text-foreground transition-colors"
            >
              + more
            </motion.button>
          </div>
        </div>
      </section>

      {/* ================= CLOUD DEPLOY ================= */}
      <section id="cloud" className="w-full ink-section relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-ink opacity-50 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(79,90%,55%)]/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 py-24 grid lg:grid-cols-2 gap-16 items-center relative">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="eyebrow text-[hsl(79,60%,45%)] mb-4">// 02 · flowhub cloud</p>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-ink-fore leading-[1.05] mb-6">
              1-click deploy to{" "}
              <span className="serif-accent">FlowHub Cloud</span>
            </h2>
            <p className="text-lg text-ink-muted mb-10 leading-relaxed">
              No VPS instances, no reverse proxies, no Docker drilling. Push any
              workflow to our secure, autoscaling infrastructure — with a webhook
              live in under a minute.
            </p>
            <ul className="space-y-4 mb-10">
              {[
                "Instant provisioning and auto-scaling",
                "Automated backups and zero-downtime updates",
                "Dedicated webhook URLs instantly available"
              ].map((item, i) => (
                <li key={item} className="flex items-center gap-3 text-ink-fore">
                  <span className="w-6 h-6 rounded-md bg-[hsl(79,90%,55%)] flex items-center justify-center text-ink text-[13px] font-bold">
                    {i + 1}
                  </span>
                  <span className="font-medium">{item}</span>
                </li>
              ))}
            </ul>
            <Button onClick={startDeployment} className="btn-volt px-8 py-5 text-base rounded-xl">
              <Rocket className="w-5 h-5" /> Deploy a Workflow
            </Button>
          </motion.div>

          <div className="relative">
            <div className="absolute -inset-6 bg-[hsl(79,90%,50%)]/15 blur-[80px] rounded-full" />
            <div className="relative bg-[#0C100A] border border-white/15 rounded-2xl shadow-2xl overflow-hidden">
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="flex items-center gap-2 font-mono text-xs text-ink-muted">
                  <Terminal className="w-3.5 h-3.5 text-[hsl(79,90%,55%)]" /> flowhub-cli
                </span>
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </span>
              </div>
              <div className="px-6 py-5 space-y-3 font-mono text-[13px]">
                <p className="text-ink-muted">$ flowhub deploy latest --cloud</p>
                <p className="text-[hsl(79,90%,55%)]">➜ provisioning container… <span className="inline-block w-2 h-4 bg-[hsl(79,90%,55%)] animate-pulse align-middle" /></p>
                <p className="text-ink-muted">➜ installing n8n v1.15.2…</p>
                <p className="text-emerald-400">✓ workflow.json injected</p>
                <p className="text-emerald-400">✓ webhook exposed: /wh_9f2c8a</p>
                <div className="pt-2 mt-2 border-t border-white/10 flex items-center gap-2 text-emerald-400">
                  <span className="ping-dot" />
                  <span className="text-[hsl(79,90%,55%)] font-semibold">READY · 0:42s</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DEV & BUSINESS ================= */}
      <section id="who" className="w-full py-20 relative">
        <div className="max-w-7xl mx-auto px-4">
          <p className="eyebrow text-muted-foreground mb-10 text-center">// 03 · who it's for</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                num: "01",
                title: "For Developers",
                body: "Stop rewriting boilerplate API connections. Fork community workflows, edit node JSON, and PR back to the creator. Version-control your entire automation stack natively.",
                cta: "Read the docs"
              },
              {
                num: "02",
                title: "For Business",
                body: "Empower your RevOps and marketing teams. Deploy enterprise-grade, secure automations without hiring dedicated integration engineers.",
                cta: "View enterprise plans"
              }
            ].map((card, i) => (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.12 }}
                viewport={{ once: true }}
                className="paper-card p-10 group relative"
              >
                <span className="absolute top-8 right-8 font-mono text-sm text-muted-foreground opacity-50">{card.num}</span>
                <h3 className="text-2xl font-extrabold tracking-tight mb-5">
                  {card.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-8">{card.body}</p>
                <span className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-foreground">
                  {card.cta} <ArrowRight className="w-4 h-4 text-[hsl(79,60%,35%)] group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= LATEST UPLOADS ================= */}
      <section id="latest" className="w-full ink-section relative overflow-hidden">
        <div className="absolute inset-0 dot-grid-ink opacity-40 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(79,90%,55%)]/60 to-transparent" />

        <div className="max-w-7xl mx-auto px-4 py-24 relative">
          <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
            <div>
              <p className="eyebrow text-[hsl(79,60%,45%)] mb-3">// 04 · marketplace feed</p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink-fore">
                Latest <span className="serif-accent">uploads</span>
              </h2>
            </div>
            <Link
              to="/explore"
              className="inline-flex items-center gap-2 font-mono text-sm font-semibold text-ink-fore border-2 border-ink-fore/40 rounded-lg px-4 py-2 hover:border-[hsl(79,90%,55%)] hover:text-[hsl(79,90%,55%)] transition-colors"
            >
              View all workflows <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflows.map((wf: any, idx) => (
              <motion.div
                key={wf.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: idx * 0.1 }}
              >
                <WorkflowCard {...wf} />
              </motion.div>
            ))}
            {workflows.length === 0 && (
              <p className="text-ink-muted font-mono text-sm col-span-full py-12 border border-dashed border-white/15 rounded-2xl text-center">
                // waiting for your first workflow to flow through…
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ================= FAQ ================= */}
      <section id="faq" className="w-full py-20">
        <div className="max-w-3xl mx-auto px-4">
          <p className="eyebrow text-muted-foreground mb-4 text-center">// 05 · faq</p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-center mb-12">
            Frequently asked <span className="serif-accent">questions</span>
          </h2>
          <div className="space-y-3">
            {FAQS.map((faq, i) => {
              const open = openFaq === i
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.08 }}
                  className={`paper-card group overflow-hidden cursor-pointer transition-colors ${open ? "border-[hsl(79,60%,45%)]" : ""}`}
                  onClick={() => setOpenFaq(open ? null : i)}
                >
                  <h4 className="text-lg font-bold tracking-tight flex items-center gap-4 px-6 py-5 select-none">
                    <span className="font-mono text-xs text-muted-foreground mt-0.5">0{i + 1}</span>
                    <span className="flex-1">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: open ? 45 : 0 }}
                      transition={{ duration: 0.25 }}
                      className="text-2xl font-light text-[hsl(79,60%,40%)] leading-none"
                    >
                      +
                    </motion.span>
                  </h4>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="text-muted-foreground leading-relaxed text-[15px] px-6 pb-5 pl-[52px]">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ================= DEPLOY MODAL ================= */}
      <AnimatePresence>
        {showDeployModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="w-full max-w-lg ink-card overflow-hidden"
            >
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-lg font-bold flex items-center gap-2.5 text-ink-fore">
                  <Server className="w-5 h-5 text-[hsl(79,90%,55%)]" />
                  Deploying to FlowHub Cloud
                </h3>
                <span className="flex gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]" />
                </span>
              </div>
              <div className="px-6 py-6 space-y-5">
                {DEPLOY_STEPS.map((text, i) => {
                  const step = i + 1
                  return (
                    <div key={step} className="flex items-start gap-4">
                      <span className="mt-0.5 flex items-center justify-center">
                        {deployStep < step ? (
                          <span className="w-6 h-6 rounded-md border-2 border-white/25 flex items-center justify-center font-mono text-[10px] text-white/40">{step}</span>
                        ) : deployStep === step ? (
                          <Loader2 className="w-6 h-6 text-[hsl(79,90%,55%)] animate-spin" />
                        ) : (
                          <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                        )}
                      </span>
                      <div>
                        <p className={`font-mono text-sm ${deployStep >= step ? "text-ink-fore" : "text-ink-muted"}`}>{text}</p>
                        {deployStep === step && (
                          <p className="text-xs text-[hsl(79,90%,55%)] animate-pulse mt-1 font-mono">processing…</p>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
              <div className="px-6 py-4 border-t border-white/10 flex justify-end gap-3 bg-white/[0.02]">
                {deployStep < 4 ? (
                  <button onClick={() => setShowDeployModal(false)} className="btn-ink px-6 py-2.5 text-sm">
                    cancel
                  </button>
                ) : (
                  <button onClick={() => setShowDeployModal(false)} className="btn-volt px-8 py-2.5 text-sm">
                    go to dashboard →
                  </button>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}