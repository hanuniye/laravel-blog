import { BlogPost } from "@/types/index";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, MessageCircle, Clock } from "lucide-react";
import { Link } from "@inertiajs/react";

interface BlogCardProps {
  post: BlogPost;
  onLike: (postId: string) => void;
}

export function BlogCard({ post, onLike }: BlogCardProps) {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-[var(--blog-shadow-lg)] hover:-translate-y-1 bg-gradient-to-br from-card to-card/50 backdrop-blur-sm border-0 shadow-[var(--blog-shadow)]">
      <CardHeader className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 ring-2 ring-primary/20">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium text-sm">{post.author.name}</p>
              <p className="text-muted-foreground text-xs">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <div>
          <Link href={`/blog/${post.id}`}>
            <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors cursor-pointer line-clamp-2">
              {post.title}
            </h3>
          </Link>
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge 
              key={tag} 
              variant="secondary" 
              className="text-xs bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary/20 hover:to-accent/20 transition-all"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onLike(post.id)}
              className="group/like hover:bg-like-heart/10 transition-all"
            >
              <Heart 
                className={`h-4 w-4 mr-2 transition-all group-hover/like:scale-110 ${
                  post.isLiked ? 'fill-like-heart text-like-heart' : 'text-muted-foreground'
                }`} 
              />
              <span className={post.isLiked ? 'text-like-heart' : 'text-muted-foreground'}>
                {post.likes}
              </span>
            </Button>
            
            <Link href={`/blog/${post.id}#comments`}>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 transition-all">
                <MessageCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                <span className="text-muted-foreground">{post.commentsCount}</span>
              </Button>
            </Link>
          </div>

          <Link href={`/blog/${post.id}`}>
            <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground shadow-lg hover:shadow-xl transition-all">
              Read More
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}