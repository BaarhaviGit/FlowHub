import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import { Heart, Star, Mail, Braces, ArrowUpRight } from "lucide-react"

const GitHubIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.75 2.69 1.25 3.34.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.25.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.83 1.19 3.08 0 4.41-2.69 5.38-5.25 5.67.41.35.77 1.04.77 2.1 0 1.52-.01 2.74-.01 3.11 0 .31.21.67.8.56A11.51 11.51 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5Z" />
  </svg>
)

const GITHUB_URL = "https://github.com/BaarhaviGit/FlowHub"

export default function Layout() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-[hsl(79,90%,55%)] selection:text-[#0C100A] relative">
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>

      {/* Ink footer */}
      <footer className="w-full ink-section relative mt-auto overflow-hidden">
        <div className="absolute inset-0 dot-grid-ink opacity-40 pointer-events-none" />
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[hsl(79,90%,55%)]/60 to-transparent" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[hsl(79,90%,50%)]/8 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 relative">
          {/* Community CTA */}
          <div className="border-b border-white/10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 py-16">
              <div>
                <p className="eyebrow text-[hsl(79,60%,45%)] mb-4">// open source</p>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight text-ink-fore mb-3">
                  Built for builders,{" "}
                  <span className="serif-accent">by builders.</span>
                </h3>
                <p className="text-ink-muted max-w-lg leading-relaxed">
                  FlowHub is 100% open source. Fork the repo, submit a workflow,
                  fix a bug, or add a feature — every contribution keeps the
                  automation community moving forward.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-volt px-6 py-4 text-base rounded-xl"
                >
                  <Star className="w-5 h-5" /> star the repo
                </a>
                <a
                  href={`${GITHUB_URL}/fork`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-ink px-6 py-4 text-base rounded-xl hover:border-[hsl(79,90%,55%)] border-white/20"
                >
                  <ArrowUpRight className="w-5 h-5" /> contribute now
                </a>
              </div>
            </div>
          </div>

          {/* Main grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 py-16">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex w-10 h-10 rounded-xl bg-ink border-2 border-[hsl(79,90%,55%)] items-center justify-center shadow-[3px_3px_0_0_hsl(79,90%,55%)]">
                  <Braces className="w-5 h-5 text-[hsl(79,90%,55%)]" />
                </span>
                <span className="text-2xl font-extrabold tracking-tight text-ink-fore">
                  Flow<span className="text-[hsl(79,90%,55%)]">Hub</span>
                </span>
              </div>
              <p className="text-ink-muted mb-8 max-w-sm leading-relaxed">
                The GitHub for Automations. Discover, share, and deploy powerful
                n8n workflows instantly — zero configuration required.
              </p>

              {/* GitHub card */}
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 max-w-sm rounded-2xl border border-white/15 bg-white/[0.04] p-4 hover:border-[hsl(79,90%,55%)] hover:bg-white/[0.06] transition-all duration-300"
              >
                <span className="w-11 h-11 rounded-xl bg-white/[0.06] border border-white/15 flex items-center justify-center shrink-0">
                  <GitHubIcon className="w-5 h-5 text-ink-fore" />
                </span>
                <span className="flex-1 min-w-0">
                  <span className="block font-mono text-xs text-ink-muted mb-0.5">github.com/</span>
                  <span className="block text-sm font-semibold text-ink-fore truncate">
                    BaarhaviGit/FlowHub
                  </span>
                </span>
                <ArrowUpRight className="w-4 h-4 text-ink-muted group-hover:text-[hsl(79,90%,55%)] transition-colors shrink-0" />
              </a>
            </div>

            {/* Links */}
            {[
              {
                title: "product",
                links: [
                  { label: "explore marketplace", href: "/explore" },
                  { label: "upload workflow", href: "/upload" },
                  { label: "flowhub cloud", href: "#" },
                  { label: "pricing", href: "#" },
                  { label: "changelog", href: "#" }
                ]
              },
              {
                title: "resources",
                links: [
                  { label: "documentation", href: "#" },
                  { label: "n8n tutorials", href: "#" },
                  { label: "api reference", href: "#" },
                  { label: "community forum", href: "#" },
                  { label: "contribute on github", href: GITHUB_URL }
                ]
              }
            ].map(col => (
              <div key={col.title}>
                <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(79,60%,45%)] mb-6 font-semibold">
                  {col.title}
                </h4>
                <ul className="space-y-3 text-sm text-ink-muted">
                  {col.links.map(link => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="hover:text-ink-fore transition-colors font-medium"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Subscribe */}
            <div>
              <h4 className="font-mono text-xs uppercase tracking-[0.2em] text-[hsl(79,60%,45%)] mb-6 font-semibold">
                subscribe
              </h4>
              <p className="text-sm text-ink-muted mb-4 leading-relaxed">
                Get the latest automation workflows in your inbox, weekly.
              </p>
              <div className="flex flex-col gap-2">
                <input
                  type="email"
                  placeholder="you@company.com"
                  className="w-full bg-black/30 border border-white/15 rounded-lg px-4 py-2.5 text-sm text-ink-fore focus:outline-none focus:ring-0 focus:border-[hsl(79,90%,55%)] placeholder:text-ink-muted"
                />
                <button className="btn-volt w-full py-2.5 text-sm">
                  <Mail className="w-4 h-4" /> subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-8 pb-10 border-t border-white/10">
            <div className="flex items-center gap-4 text-sm text-ink-muted">
              <span className="font-mono">© {new Date().getFullYear()} FlowHub</span>
              <span className="w-1 h-1 rounded-full bg-white/20" />
              <span className="flex items-center gap-1.5 font-medium">
                Built with <Heart className="w-4 h-4 text-[#FEBC2E] fill-[#FEBC2E]" /> by
                <a
                  href="https://github.com/BaarhaviGit"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-ink-fore hover:text-[hsl(79,90%,55%)] transition-colors flex items-center gap-1"
                >
                  baarhavi
                  <GitHubIcon className="w-4 h-4" />
                </a>
              </span>
            </div>
            <div className="flex gap-6 font-mono text-xs text-ink-muted">
              <a href="#" className="hover:text-[hsl(79,90%,55%)] transition-colors">privacy policy</a>
              <a href="#" className="hover:text-[hsl(79,90%,55%)] transition-colors">terms of service</a>
              <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[hsl(79,90%,55%)] transition-colors flex items-center gap-1">
                github <ArrowUpRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}