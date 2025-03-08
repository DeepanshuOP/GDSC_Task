import { useEffect, useState } from 'react';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import type { Post as PostType } from './types';
import { Post } from '../components/Post';

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        console.log('Fetching posts...');
        const response = await axios.get('https://dummyjson.com/posts?limit=10');
        console.log('Posts response:', response.data);
        
        const postsData = (response.data as { posts: PostType[] }).posts;
  
        const postsWithDetails = await Promise.all(
          postsData.map(async (post: PostType) => {
            const [userResponse, commentsResponse] = await Promise.all([
              axios.get(`https://dummyjson.com/users/${post.userId}`),
              axios.get(`https://dummyjson.com/posts/${post.id}/comments`)
            ]);
  
            return {
              ...post,
              user: userResponse.data,
              comments: (commentsResponse.data as { comments: any[] }).comments
            };
          })
        );
  
        setPosts(postsWithDetails as PostType[]);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching posts:', err);
        setError('Failed to load posts. Please try again later.');
        setLoading(false);
      }
    };
  
    fetchPosts();
  }, []);
  

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="animate-spin" size={24} />
          <span>Loading posts...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-red-50 text-red-800 p-4 rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Social Feed</h1>
        <div className="space-y-6">
          {posts.map(post => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Feed;