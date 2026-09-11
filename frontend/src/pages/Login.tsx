import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Braces } from "lucide-react"
import { useAuth } from "../context/AuthContext"
import api from "../lib/api"

export default function Login() {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await api.post("/auth/login", { username, password })
      login(response.data.accessToken, username)
      navigate("/")
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed. Please check your credentials.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative"
      >
        <div className="absolute inset-0 -z-10 dot-grid opacity-40 pointer-events-none" />

        <Card className="bg-card border-2 border-foreground shadow-[6px_6px_0_0_var(--foreground)] rounded-2xl backdrop-blur-xl relative z-10">
          <CardHeader className="space-y-2 items-center text-center">
            <span className="w-12 h-12 rounded-xl bg-ink border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_0_var(--foreground)] mb-2">
              <Braces className="w-6 h-6 text-[hsl(79,90%,55%)]" />
            </span>
            <CardTitle className="text-3xl font-extrabold tracking-tight">Welcome back</CardTitle>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.2em]">
              // sign in to your workspace
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleLogin}>
            <CardContent className="space-y-4">
              {error && <div className="p-3 text-sm font-medium text-destructive bg-destructive/10 border border-destructive/30 rounded-lg">{error}</div>}

              <div className="space-y-2">
                <Label htmlFor="username" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">username</Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border-2 border-border bg-card focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">password</Label>
                  <Link to="#" className="text-xs font-mono text-[hsl(79,60%,35%)] hover:underline">
                    forgot?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border-2 border-border bg-card focus:ring-0"
                  required
                />
              </div>
              <Button type="submit" className="btn-volt w-full py-3 mt-4 text-base" disabled={isLoading}>
                {isLoading ? "authenticating…" : "$ sign in"}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm font-medium text-muted-foreground">
              New to FlowHub?{" "}
              <Link to="/register" className="text-[hsl(79,60%,35%)] font-semibold hover:underline">
                create an account
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}