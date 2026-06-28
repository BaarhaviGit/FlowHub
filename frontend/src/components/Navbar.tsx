import { Link } from "react-router-dom"
import { Search } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2 text-xl font-bold text-foreground tracking-tight hover:opacity-90 transition-opacity">
            <img src="/logo.png" alt="FlowHub Logo" className="w-8 h-8 rounded-lg shadow-[0_0_10px_rgba(0,229,255,0.3)]" />
            FlowHub
          </Link>
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/explore" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors px-3 py-2 rounded-md">
              Explore
            </Link>
          </div>
        </div>

        <div className="flex-1 max-w-md mx-6 hidden md:block relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input 
            type="text" 
            placeholder="Search workflows..." 
            className="w-full h-9 bg-card hover:bg-secondary/80 border border-white/10 rounded-full pl-9 pr-12 text-sm focus:outline-none focus:ring-1 focus:ring-white/30 transition-all duration-200"
          />
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-white/10 bg-background px-1.5 text-[10px] font-medium text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/upload" className="text-sm font-medium hover:text-foreground transition-colors">
            Upload
          </Link>
          
          {isAuthenticated ? (
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-muted-foreground">
                Hi, {username}
              </span>
              <button 
                onClick={logout}
                className="text-sm font-medium text-red-400 hover:text-red-300 transition-colors cursor-pointer"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
                Login
              </Link>
              <Link to="/register" className="h-9 px-4 py-2 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all shadow-sm">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
