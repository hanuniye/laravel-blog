import { useState, useEffect } from "react";
import { mockPosts, mockComments } from "@/data/mockup";
import { BlogPost as BlogPostType, Comment } from "@/types/index";
import { CommentCard } from "@/components/comment-card";
import { CommentForm } from "@/components/comment-form";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Heart, MessageCircle, Share2, Clock } from "lucide-react";
import { Link } from "@inertiajs/react";

export default function BlogPost() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundPost = mockPosts.find(p => p.id === id);
      setPost(foundPost || null);
      setComments(mockComments[id] || []);
    }
  }, [id]);

  const handleLike = () => {
    if (!post) return;
    
    setPost(prev => prev ? {
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1
    } : null);
    
    toast({
      description: post.isLiked ? "Removed from favorites" : "Added to favorites",
    });
  };

  const handleCommentLike = (commentId: string) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? {
            ...comment,
            isLiked: !comment.isLiked,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1
          }
        : comment
    ));
  };

  const handleAddComment = async (content: string) => {
    setIsSubmittingComment(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newComment: Comment = {
      id: `c${Date.now()}`,
      content,
      author: {
        id: "current",
        name: "You",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face"
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      likes: 0,
      isLiked: false,
      postId: id!
    };
    
    setComments(prev => [newComment, ...prev]);
    setPost(prev => prev ? { ...prev, commentsCount: prev.commentsCount + 1 } : null);
    setIsSubmittingComment(false);
    
    toast({
      description: "Comment posted successfully!",
    });
  };

  const handleEditComment = (commentId: string, newContent: string) => {
    setComments(prev => prev.map(comment =>
      comment.id === commentId
        ? { ...comment, content: newContent, updatedAt: new Date().toISOString() }
        : comment
    ));
    
    toast({
      description: "Comment updated successfully!",
    });
  };

  const handleDeleteComment = (commentId: string) => {
    setComments(prev => prev.filter(comment => comment.id !== commentId));
    setPost(prev => prev ? { ...prev, commentsCount: prev.commentsCount - 1 } : null);
    
    toast({
      description: "Comment deleted successfully!",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      description: "Link copied to clipboard!",
    });
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post not found</h1>
          <Link href="/">
            <Button>Return to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-background/80">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="hover:bg-primary/10">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <article className="bg-gradient-to-br from-card to-card/50 backdrop-blur-sm rounded-lg border-0 shadow-[var(--blog-shadow-lg)] p-8 mb-8">
          <div className="mb-6">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge 
                  key={tag} 
                  variant="secondary" 
                  className="bg-gradient-to-r from-primary/10 to-accent/10"
                >
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6 leading-tight">
              {post.title}
            </h1>
            
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12 ring-2 ring-primary/20">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{post.author.name}</p>
                  <div className="flex items-center gap-4 text-muted-foreground text-sm">
                    <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} min read</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className="hover:bg-like-heart/10 transition-all"
                >
                  <Heart 
                    className={`h-4 w-4 mr-2 ${
                      post.isLiked ? 'fill-like-heart text-like-heart' : ''
                    }`} 
                  />
                  {post.likes}
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleShare}
                  className="hover:bg-primary/10 transition-all"
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Article Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown
              components={{
                h1: ({children}) => <h1 className="text-3xl font-bold text-foreground mb-6 mt-8">{children}</h1>,
                h2: ({children}) => <h2 className="text-2xl font-semibold text-foreground mb-4 mt-6">{children}</h2>,
                h3: ({children}) => <h3 className="text-xl font-semibold text-foreground mb-3 mt-5">{children}</h3>,
                p: ({children}) => <p className="text-foreground mb-4 leading-relaxed">{children}</p>,
                ul: ({children}) => <ul className="list-disc pl-6 mb-4 space-y-2 text-foreground">{children}</ul>,
                ol: ({children}) => <ol className="list-decimal pl-6 mb-4 space-y-2 text-foreground">{children}</ol>,
                li: ({children}) => <li className="text-foreground">{children}</li>,
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-primary pl-4 py-2 my-4 bg-primary/5 rounded-r-md">
                    {children}
                  </blockquote>
                ),
                code: ({children}) => (
                  <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{children}</code>
                ),
                pre: ({children}) => (
                  <pre className="bg-muted p-4 rounded-lg overflow-x-auto my-4">{children}</pre>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Comments Section */}
        <div id="comments" className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <MessageCircle className="h-6 w-6" />
              Comments ({comments.length})
            </h2>
          </div>

          <CommentForm 
            onSubmit={handleAddComment} 
            isSubmitting={isSubmittingComment}
          />

          <div className="space-y-4">
            {comments.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                onLike={handleCommentLike}
                onEdit={handleEditComment}
                onDelete={handleDeleteComment}
                isOwner={comment.author.id === "current"}
              />
            ))}
          </div>

          {comments.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">Be the first to comment!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}