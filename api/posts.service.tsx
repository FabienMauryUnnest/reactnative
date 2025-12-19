import { apiClient } from "./apiClient";

export type Post = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreatePostDto = {
  userId: number;
  title: string;
  body: string;
};

export const postsService = {
  getAll: async (): Promise<Post[]> => {
    const { data } = await apiClient.get<Post[]>("/posts");
    return data;
  },

  create: async (dto: CreatePostDto): Promise<Post> => {
    const { data } = await apiClient.post<Post>("/posts", dto);
    return data;
  },

  put: async (id: number, dto: CreatePostDto): Promise<Post> => {
    const { data } = await apiClient.put<Post>(`/posts/${id}`, dto);
    return data;
  },

  patch: async (id: number, dto: Partial<CreatePostDto>): Promise<Post> => {
    const { data } = await apiClient.patch<Post>(`/posts/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/posts/${id}`);
  },
};
