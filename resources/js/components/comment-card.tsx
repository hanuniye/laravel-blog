import { useState } from "react";
import { Comment } from "@/types/index";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Heart, Edit, Trash2, Check, X } from "lucide-react";

interface CommentCardProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  onEdit: (commentId: string, content: string) => void;
  onDelete: (commentId: string) => void;
  isOwner?: boolean;
}

export function CommentCard({ comment, onLike, onEdit, onDelete, isOwner = false }: CommentCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editContent, setEditContent] = useState(comment.content);

  const handleSaveEdit = () => {
    onEdit(comment.id, editContent);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditContent(comment.content);
    setIsEditing(false);
  };

  return (
    <Card className="transition-all duration-200 hover:shadow-md bg-comment-bg/50 backdrop-blur-sm border-border/50">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="h-8 w-8 ring-1 ring-border">
            <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
            <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-primary-foreground text-sm">
              {comment.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm">{comment.author.name}</span>
                <span className="text-muted-foreground text-xs">
                  {new Date(comment.createdAt).toLocaleDateString()}
                  {comment.updatedAt !== comment.createdAt && " (edited)"}
                </span>
              </div>
              
              {isOwner && !isEditing && (
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsEditing(true)}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <Edit className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(comment.id)}
                    className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              )}
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="min-h-20 resize-none"
                  placeholder="Edit your comment..."
                />
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleSaveEdit}
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Check className="h-3 w-3 mr-1" />
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCancelEdit}
                  >
                    <X className="h-3 w-3 mr-1" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed">{comment.content}</p>
            )}

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onLike(comment.id)}
                className="group/like hover:bg-like-heart/10 transition-all h-8 px-2"
              >
                <Heart 
                  className={`h-3 w-3 mr-1 transition-all group-hover/like:scale-110 ${
                    comment.isLiked ? 'fill-like-heart text-like-heart' : 'text-muted-foreground'
                  }`} 
                />
                <span className={`text-xs ${comment.isLiked ? 'text-like-heart' : 'text-muted-foreground'}`}>
                  {comment.likes}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}