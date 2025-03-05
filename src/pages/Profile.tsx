import { useAuthStore } from '../store/auth';
import { useState, useEffect } from 'react';
import { getUserPosts } from '../lib/api';
import { Settings, Mail, MapPin, Link as LinkIcon } from 'lucide-react';

export function Profile() {
  const { user } = useAuthStore();
  const [posts, setPosts] = useState<{ id: number; title: string; body: string }[]>([]);

  useEffect(() => {
    if (user?.id) {
      getUserPosts(user.id.toString()).then(data => setPosts(data.posts));
    }
  }, [user?.id]);

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="h-32 bg-gradient-to-r from-primary to-primary-dark" />
        
        <div className="px-6 py-4">
          <div className="flex items-start">
            <img
              src={user.image}
              alt={`${user.firstName} ${user.lastName}`}
              className="w-24 h-24 rounded-full border-4 border-white -mt-12"
            />
            <div className="ml-4 flex-1">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">
                  {user.firstName} {user.lastName}
                </h1>
                <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                  <Settings className="w-5 h-5" />
                </button>
              </div>
              <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>
            </div>
          </div>

          <div className="mt-6 space-y-4">
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <Mail className="w-4 h-4 mr-2" />
              {user.email}
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <MapPin className="w-4 h-4 mr-2" />
              New York, USA
            </div>
            <div className="flex items-center text-gray-600 dark:text-gray-400">
              <LinkIcon className="w-4 h-4 mr-2" />
              github.com/johndoe
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Posts</h2>
        <div className="space-y-6">
          {posts.map(post => (
            <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{post.body}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
