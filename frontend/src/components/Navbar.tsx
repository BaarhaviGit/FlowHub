import { Link, useLocation } from "react-router-dom"
import { Search, Braces } from "lucide-react"
import { useAuth } from "../context/AuthContext"

export default function Navbar() {
  const { isAuthenticated, username, logout } = useAuth()
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <nav className="sticky top-0 z-50 w-full bg-[hsl(46,26%,95%)]/85 backdrop-blur-xl border-b-2 border-border/70">
      <div className="mx-auto max-w-7xl px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2.5 group">
            <span className="relative w-8 h-8 rounded-lg bg-ink border-2 border-foreground flex items-center justify-center shadow-[2px_2px_0_0_var(--foreground)] group-hover:shadow-[2px_2px_0_0_var(--foreground)] transition-transform group-hover:-rotate-3">
              <Braces className="w-4 h-4 text-[hsl(79,90%,55%)]" />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-foreground">
              Flow<span className="text-[hsl(79,50%,30%)]">Hub</span>
            </span>
          </Link>

          <Link
            to="/explore"
            className={`hidden md:inline-flex items-center gap-2 font-mono text-sm transition-colors ${
              isActive("/explore") ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <span className="text-xs text-[hsl(79,60%,35%)]">~/</span>
            explore
          </Link>
        </div>

        <div className="flex-1 max-w-lg hidden lg:block relative group">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-foreground" />
          <input
            type="text"
            placeholder="search workflows…"
            className="w-full h-10 bg-card hover:bg-white border-2 border-border rounded-lg pl-10 pr-12 text-sm font-medium focus:outline-none focus:ring-0 transition-all duration-200 placeholder:text-muted-foreground"
          />
          <div className="absolute inset-y-0 right-2 flex items-center pointer-events-none">
            <kbd className="inline-flex h-6 items-center rounded border-2 border-border bg-card px-1.5 font-mono text-[10px] font-semibold text-muted-foreground">
              ⌘K
            </kbd>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/upload"
            className={`hidden sm:inline-flex font-mono text-sm transition-colors ${
              isActive("/upload") ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            upload
          </Link>

          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs text-muted-foreground hidden sm:block">
                ~ <span className="text-[hsl(79,50%,35%)]">{username}</span>
              </span>
              <button
                onClick={logout}
                className="font-mono text-sm text-destructive hover:underline cursor-pointer"
              >
                logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className={`font-mono text-sm transition-colors ${
                  isActive("/login") ? "text-foreground font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                login
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center h-10 px-4 rounded-lg bg-ink border-2 border-foreground text-ink-fore font-mono text-sm font-semibold shadow-[3px_3px_0_0_var(--foreground)] transition-all duration-200 hover:shadow-[1px_1px_0_0_var(--foreground)] hover:-translate-y-0.5"
              >
                <span className="text-[hsl(79,90%,55%)] mr-1.5">$</span>sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}