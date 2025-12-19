import { apiClient } from "./apiClient";

export type User = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreateUserDto = {
  userId: number;
  title: string;
  body: string;
};

export const UsersService = {
  getAll: async (): Promise<User[]> => {
    const { data } = await apiClient.get<User[]>("/users");
    return data;
  },

  create: async (dto: CreateUserDto): Promise<User> => {
    const { data } = await apiClient.User<User>("/users", dto);
    return data;
  },

  put: async (id: number, dto: CreateUserDto): Promise<User> => {
    const { data } = await apiClient.put<User>(`/users/${id}`, dto);
    return data;
  },

  patch: async (id: number, dto: Partial<CreateUserDto>): Promise<User> => {
    const { data } = await apiClient.patch<User>(`/users/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/Users/${id}`);
  },
};
