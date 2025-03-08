export interface User {
  id: number;
  username: string;
  image: string;
}
export interface Reactions {
    likes: number;
    dislikes: number;
  }

export interface Comment {
  id: number;
  body: string;
  user: User;
  postId: number;
}

export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    tags: string[];
    reactions: Reactions;
    user: User;
    comments: Comment[];
  }

export interface PostsResponse {
  posts: Post[];
  total: number;
  skip: number;
  limit: number;
}