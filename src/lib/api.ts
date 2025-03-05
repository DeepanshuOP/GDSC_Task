import axios, { AxiosError } from 'axios';
import { AuthResponse } from '../types/api';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await api.post('https://dummyjson.com/c/286d-16a3-4593-9d52', { username, password });
    return response.data;
  } catch (error) {
    if (error instanceof AxiosError) {
      throw new Error(error.response?.data?.message || 'Login failed');
    }
    throw new Error('An unexpected error occurred');
  }
};

export const getPosts = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  const response = await api.get(`/posts?limit=${limit}&skip=${skip}&select=title,body,userId,tags,reactions`);
  return response.data;
};

export const getPost = async (id: string) => {
  const response = await api.get(`/posts/${id}`);
  return response.data;
};

export const getPostComments = async (id: string) => {
  const response = await api.get(`/posts/${id}/comments`);
  return response.data;
};

export const getUserPosts = async (userId: string) => {
  const response = await api.get(`/users/${userId}/posts`);
  return response.data;
};

export const getUser = async (id: string) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const searchPosts = async (query: string) => {
  const response = await api.get(`/posts/search?q=${query}`);
  return response.data;
};