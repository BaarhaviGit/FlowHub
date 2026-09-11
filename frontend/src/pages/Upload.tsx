import { useState } from "react"
import { motion } from "framer-motion"
import { Upload as UploadIcon, FileJson, X, Loader2, Braces } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import api from "../lib/api"
import { useNavigate } from "react-router-dom"

export default function Upload() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [category, setCategory] = useState("")
  const [tags, setTags] = useState("")

  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate()

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => setIsDragging(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile.name.endsWith('.json')) {
        setFile(droppedFile)
      } else {
        toast.error("Please upload a .json file")
      }
    }
  }

  const handleUpload = async () => {
    if (!file || !title || !description || !category || !tags) {
      toast.error("Please fill out all fields and select a file.")
      return
    }

    setIsLoading(true)

    try {
      const formData = new FormData()
      formData.append("title", title)
      formData.append("description", description)
      formData.append("category", category)
      formData.append("tags", tags)
      formData.append("file", file)

      await api.post("/workflows", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      toast.success("Workflow published successfully!")
      navigate("/")
    } catch (error: any) {
      console.error(error)
      toast.error("Failed to upload workflow. " + (error.response?.data?.message || ""))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl min-h-[calc(100vh-80px)]">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="relative"
      >
        <div className="absolute inset-0 -z-10 dot-grid opacity-40 pointer-events-none rounded-3xl" />

        <Card className="bg-card border-2 border-foreground shadow-[6px_6px_0_0_var(--foreground)] rounded-2xl backdrop-blur-xl">
          <CardHeader className="items-center text-center space-y-2">
            <span className="w-12 h-12 rounded-xl bg-ink border-2 border-foreground flex items-center justify-center shadow-[3px_3px_0_0_var(--foreground)] mb-2">
              <Braces className="w-6 h-6 text-[hsl(79,90%,55%)]" />
            </span>
            <CardTitle className="text-3xl font-extrabold tracking-tight">Upload workflow</CardTitle>
            <CardDescription className="font-mono text-[11px] uppercase tracking-[0.2em]">
              // publish an n8n automation to the marketplace
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">

            {/* File Upload Area */}
            <div
              className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center transition-colors ${
                isDragging
                  ? "border-foreground bg-[hsl(79,80%,50%)]/15 shadow-[inset_0_0_0_2px_hsl(79,90%,50%_/_30%)]"
                  : "border-border hover:border-foreground bg-ink/5"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="w-16 h-16 rounded-2xl bg-ink flex items-center justify-center mb-5 shadow-[4px_4px_0_0_var(--secondary-foreground)]">
                    <UploadIcon className="w-8 h-8 text-[hsl(79,90%,55%)]" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight mb-2">Drag & drop your JSON here</h3>
                  <p className="text-sm text-muted-foreground font-medium mb-5">or click to browse from your computer</p>
                  <Input
                    type="file"
                    accept=".json"
                    className="hidden"
                    id="file-upload"
                    onChange={(e: any) => {
                      if (e.target.files) setFile(e.target.files[0])
                    }}
                  />
                  <Label htmlFor="file-upload">
                    <span className="inline-flex items-center cursor-pointer bg-ink hover:bg-ink/90 text-ink-fore px-5 py-2.5 rounded-lg font-mono text-sm font-semibold border-2 border-foreground shadow-[3px_3px_0_0_var(--foreground)] transition-all hover:-translate-y-0.5">
                      $ browse files
                    </span>
                  </Label>
                </>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="w-16 h-16 rounded-2xl bg-[hsl(96,45%,30%)]/15 flex items-center justify-center mb-5 shadow-[4px_4px_0_0_hsl(96,45%,30%)]">
                    <FileJson className="w-8 h-8 text-[hsl(96,60%,35%)]" />
                  </div>
                  <h3 className="text-lg font-extrabold tracking-tight text-foreground mb-1 font-mono">{file.name}</h3>
                  <p className="text-sm text-muted-foreground font-mono mb-5">{(file.size / 1024).toFixed(2)} KB</p>
                  <Button variant="outline" size="sm" onClick={() => setFile(null)} className="border-2 border-destructive text-destructive hover:bg-destructive/10 font-mono">
                    <X className="w-4 h-4 mr-2" /> remove file
                  </Button>
                </div>
              )}
            </div>

            {/* Metadata Fields */}
            <div className="space-y-4 pt-4 border-t-2 border-dashed border-border">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">title</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Slack to Notion Sync"
                  className="border-2 border-border bg-card focus:ring-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">description</Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="flex min-h-[80px] w-full rounded-lg border-2 border-border bg-card px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(79,80%,50%)] placeholder:text-muted-foreground"
                  placeholder="Describe what this workflow does..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">category</Label>
                  <Input
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Productivity"
                    className="border-2 border-border bg-card focus:ring-0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">tags (csv)</Label>
                  <Input
                    id="tags"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., slack, notion"
                    className="border-2 border-border bg-card focus:ring-0"
                  />
                </div>
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end pt-6 gap-3 border-t-2 border-dashed border-border bg-ink/5 rounded-b-2xl">
            <Button variant="ghost" className="font-mono text-muted-foreground hover:text-foreground" onClick={() => navigate(-1)}>
              cancel
            </Button>
            <Button
              onClick={handleUpload}
              disabled={!file || !title || !description || !category || !tags || isLoading}
              className="btn-volt px-8 py-3"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? "publishing…" : "$ publish"}
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}