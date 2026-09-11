import { useState } from "react"
import { motion } from "framer-motion"
import { Link, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Braces } from "lucide-react"
import { toast } from "sonner"
import api from "../lib/api"

export default function Register() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    try {
      const response = await api.post("/auth/register", { username, email, password })
      console.log("Account created successfully. Details:", response.data)
      toast.success("Account created successfully!")
      navigate("/login")
    } catch (err: any) {
      let errorMessage = "Registration failed. Please try again.";
      if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (typeof err.response?.data === 'string') {
        errorMessage = err.response.data;
      } else if (err.response?.data) {
        errorMessage = JSON.stringify(err.response.data);
      }
      setError(errorMessage);
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
            <CardTitle className="text-3xl font-extrabold tracking-tight">Create an account</CardTitle>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.2em]">
              // join the automation community
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleRegister}>
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
                <Label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border-2 border-border bg-card focus:ring-0"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">password</Label>
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
                {isLoading ? "creating account…" : "$ create account"}
              </Button>
            </CardContent>
          </form>
          <CardFooter className="flex flex-col">
            <div className="mt-2 text-center text-sm font-medium text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-[hsl(79,60%,35%)] font-semibold hover:underline">
                sign in
              </Link>
            </div>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}