import { useState } from "react"
import { motion } from "framer-motion"
import { Upload as UploadIcon, FileJson, X, Loader2 } from "lucide-react"
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

      // Use the api interceptor to automatically pass the JWT token
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
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="bg-secondary border-white/20 backdrop-blur-xl shadow-xl">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center">Upload Workflow</CardTitle>
            <CardDescription className="text-center text-lg mt-2">
              Share your n8n automation with the FlowHub community.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            
            {/* File Upload Area */}
            <div 
              className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center transition-colors ${
                isDragging ? "border-primary bg-primary/10" : "border-white/20 hover:border-white/40 bg-black/20"
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {!file ? (
                <>
                  <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4 text-primary">
                    <UploadIcon className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Drag & drop your JSON file here</h3>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse from your computer</p>
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
                    <span className="cursor-pointer bg-secondary hover:bg-secondary/80 text-foreground px-4 py-2 rounded-md font-medium transition-colors">
                      Browse Files
                    </span>
                  </Label>
                </>
              ) : (
                <div className="flex flex-col items-center w-full">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4 text-emerald-400">
                    <FileJson className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-semibold text-emerald-400 mb-1">{file.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{(file.size / 1024).toFixed(2)} KB</p>
                  <Button variant="outline" size="sm" onClick={() => setFile(null)} className="text-destructive hover:text-destructive hover:bg-destructive/10">
                    <X className="w-4 h-4 mr-2" /> Remove File
                  </Button>
                </div>
              )}
            </div>

            {/* Metadata Fields */}
            <div className="space-y-4 pt-4 border-t border-white/10">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input 
                  id="title" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Slack to Notion Sync" 
                  className="bg-background border-white/20 shadow-inner" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3} 
                  className="flex min-h-[80px] w-full rounded-md border border-white/20 bg-background px-3 py-2 text-sm shadow-inner placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:cursor-not-allowed disabled:opacity-50" 
                  placeholder="Describe what this workflow does..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input 
                    id="category" 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="e.g., Productivity" 
                    className="bg-background border-white/20 shadow-inner" 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tags">Tags (comma separated)</Label>
                  <Input 
                    id="tags" 
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder="e.g., slack, notion" 
                    className="bg-background border-white/20 shadow-inner" 
                  />
                </div>
              </div>
            </div>

          </CardContent>
          <CardFooter className="flex justify-end pt-6 border-t border-white/10 bg-black/10 rounded-b-xl">
            <Button variant="ghost" className="mr-2" onClick={() => navigate(-1)}>Cancel</Button>
            <Button 
              onClick={handleUpload} 
              disabled={!file || !title || !description || !category || !tags || isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Publish Workflow
            </Button>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  )
}
