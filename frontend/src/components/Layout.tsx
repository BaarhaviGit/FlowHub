import { Outlet } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./Navbar"
import { Button } from "@/components/ui/button"
import { Globe, MessageCircle, Link as LinkIcon, Mail } from "lucide-react"

export default function Layout() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 relative">
      {/* Innovative Magic Cursor Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0, 229, 255, 0.08), transparent 40%)`
        }}
      />
      
      <Navbar />
      <main className="flex-1 relative z-10">
        <Outlet />
      </main>
      
      {/* Advanced SaaS Mega Footer */}
      <footer className="w-full border-t border-white/10 bg-card/50 relative z-10 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
            
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <img src="/logo.png" alt="FlowHub Logo" className="w-10 h-10 rounded-xl shadow-[0_0_15px_rgba(0,229,255,0.4)]" />
                <span className="text-2xl font-bold tracking-tight">FlowHub</span>
              </div>
              <p className="text-muted-foreground mb-8 max-w-sm">
                The GitHub for Automations. Discover, share, and deploy powerful n8n workflows instantly with zero configuration required.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center hover:text-primary hover:border-primary transition-colors">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center hover:text-primary hover:border-primary transition-colors">
                  <Globe className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-background border border-white/10 flex items-center justify-center hover:text-primary hover:border-primary transition-colors">
                  <LinkIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h4 className="font-semibold mb-6">Product</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Explore Marketplace</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">FlowHub Cloud</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Enterprise</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-6">Resources</h4>
              <ul className="space-y-4 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">n8n Tutorials</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Reference</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Community Forum</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            
            {/* Newsletter Column */}
            <div>
              <h4 className="font-semibold mb-6">Subscribe</h4>
              <p className="text-sm text-muted-foreground mb-4">Get the latest automation workflows delivered to your inbox weekly.</p>
              <div className="flex flex-col gap-2">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full bg-background border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <Button className="w-full gap-2">
                  <Mail className="w-4 h-4" /> Subscribe
                </Button>
              </div>
            </div>

          </div>

          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-white/10 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} FlowHub, Inc. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-foreground transition-colors">Cookie Settings</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
