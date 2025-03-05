import { useState, useEffect } from 'react';
import { Search, ThumbsUp, MessageCircle, Tag } from 'lucide-react';

// Define post type for type safety
type Post = {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: number;
};

// Function to fetch posts from DummyJSON API
async function getPosts(page: number, limit: number) {
  const response = await fetch(
    `https://dummyjson.com/posts?limit=${limit}&skip=${(page - 1) * limit}`
  );
  const data = await response.json();
  return data;
}

export function Feed() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'likes' | 'popularity'>('date');
  const [selectedTags] = useState<string[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);

  // Fetch posts from API when dependencies change
  useEffect(() => {
    setIsLoading(true);
    getPosts(page, 10).then((data) => {
      setPosts(data.posts);
      setHasMore(data.total > page * 10);
      setIsLoading(false);
    });
  }, [page]);

  // Filter posts based on search and selected tags
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      search === '' ||
      post.title.toLowerCase().includes(search.toLowerCase()) ||
      post.body.toLowerCase().includes(search.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 || selectedTags.every((tag) => post.tags.includes(tag));

    return matchesSearch && matchesTags;
  });

  // Sort posts based on selected sorting option
  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case 'likes':
        return b.reactions - a.reactions;
      case 'popularity':
        return b.reactions + b.tags.length - (a.reactions + a.tags.length);
      default:
        return 0;
    }
  });

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      {/* Search and Sort Controls */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4">
          {/* Search Input */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Sort Dropdown */}
          <select
            className="px-4 py-2 rounded-lg border focus:ring-2 focus:ring-primary"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
          >
            <option value="date">Latest</option>
            <option value="likes">Most Liked</option>
            <option value="popularity">Popular</option>
          </select>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="space-y-6">
          {/* Render Posts */}
          {sortedPosts.length > 0 ? (
            sortedPosts.map((post) => (
              <article key={post.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{post.body}</p>

                {/* Reactions & Comments */}
                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                  <button className="flex items-center gap-1">
                    <ThumbsUp className="w-4 h-4" />
                    {post.reactions}
                  </button>
                  <button className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    Comments
                  </button>
                </div>

                {/* Tags */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary"
                    >
                      <Tag className="w-3 h-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))
          ) : (
            <div className="text-center text-gray-500">No posts found.</div>
          )}
        </div>
      )}

      {/* Pagination Buttons */}
      <div className="mt-8 flex justify-center gap-4">
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 rounded-lg bg-primary text-white disabled:opacity-50"
          disabled={!hasMore}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
