import { useState } from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle, Tag } from 'lucide-react';
import type { Post } from '../pages/types';

interface PostProps {
  post: Post;
}

export function Post({ post }: PostProps) {
  const [showComments, setShowComments] = useState(false);
  const [reactions, setReactions] = useState({ 
    likes: post.reactions.likes, 
    dislikes: post.reactions.dislikes 
  });
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisliked, setHasDisliked] = useState(false);

  const handleLike = () => {
    setReactions((prev) => ({
      likes: hasLiked ? prev.likes - 1 : prev.likes + 1,
      dislikes: hasDisliked ? prev.dislikes - 1 : prev.dislikes
    }));
    setHasLiked(!hasLiked);
    setHasDisliked(false);
  };

  const handleDislike = () => {
    setReactions((prev) => ({
      likes: hasLiked ? prev.likes - 1 : prev.likes,
      dislikes: hasDisliked ? prev.dislikes - 1 : prev.dislikes + 1
    }));
    setHasDisliked(!hasDisliked);
    setHasLiked(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      <div className="p-6">
        {/* User Info */}
        <div className="flex items-center mb-4">
          <img
            className="h-12 w-12 rounded-full object-cover"
            src={post.user.image}
            alt={post.user.username}
          />
          <div className="ml-4">
            <h2 className="text-lg font-semibold">{post.user.username}</h2>
          </div>
        </div>

        {/* Post Content */}
        <h3 className="text-xl font-bold mb-2">{post.title}</h3>
        <p className="text-gray-600 mb-4">{post.body}</p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
            >
              <Tag size={14} className="mr-1" />
              {tag}
            </span>
          ))}
        </div>

        {/* Actions (Like, Dislike, Comments) */}
        <div className="flex items-center justify-between border-t pt-4">
          <div className="flex space-x-4">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 ${hasLiked ? 'text-blue-600' : 'text-gray-600'}`}
              aria-label="Like post"
            >
              <ThumbsUp size={20} />
              <span>{reactions.likes}</span>
            </button>
            <button
              onClick={handleDislike}
              className={`flex items-center space-x-2 ${hasDisliked ? 'text-red-600' : 'text-gray-600'}`}
              aria-label="Dislike post"
            >
              <ThumbsDown size={20} />
              <span>{reactions.dislikes}</span>
            </button>
            <button
              onClick={() => setShowComments(!showComments)}
              className="flex items-center space-x-2 text-gray-600"
              aria-label="Toggle comments"
            >
              <MessageCircle size={20} />
              <span>{post.comments?.length ?? 0}</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        {showComments && (
          <div className="mt-4 border-t pt-4">
            <h4 className="font-semibold mb-4">Comments</h4>
            {post.comments?.map((comment) => (
              <div key={comment.id} className="mb-4 bg-gray-50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <img
                    className="h-8 w-8 rounded-full object-cover"
                    src={comment.user.image}
                    alt={comment.user.username}
                  />
                  <span className="ml-2 font-medium">{comment.user.username}</span>
                </div>
                <p className="text-gray-600">{comment.body}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
