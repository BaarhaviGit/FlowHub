import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Tag } from "lucide-react"
import { Link } from "react-router-dom"

interface WorkflowProps {
  id: number
  title: string
  description: string
  category: string
  tags: string
  downloadCount: number
  author: string
}

export default function WorkflowCard({ id, title, description, category, tags, downloadCount, author }: WorkflowProps) {
  const tagList = tags ? tags.split(",").map(t => t.trim()) : []

  return (
    <Card className="bg-secondary/80 border-white/20 shadow-md hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all duration-300 group overflow-hidden">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{title}</CardTitle>
          <span className="text-xs px-2 py-1 bg-primary/20 text-primary-foreground rounded-full border border-primary/30">
            {category}
          </span>
        </div>
        <CardDescription className="text-sm line-clamp-2 mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-xs text-muted-foreground">
          <span className="font-medium mr-1 text-white/80">By {author}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          {tagList.map((tag, idx) => (
            <span key={idx} className="flex items-center text-[10px] bg-white/10 border border-white/10 px-2 py-1 rounded-md text-foreground">
              <Tag className="w-3 h-3 mr-1" />
              {tag}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="pt-2 border-t border-white/10 flex justify-between items-center bg-black/40">
        <div className="flex items-center text-xs text-muted-foreground">
          <Download className="w-4 h-4 mr-1 text-primary/80" />
          {downloadCount}
        </div>
        <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/20 hover:text-primary" asChild>
          <Link to={`/workflow/${id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
