import { apiClient } from "./apiClient";

export type Todo = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

export type CreateTodoDto = {
  userId: number;
  title: string;
  body: string;
};

export const TodosService = {
  getAll: async (): Promise<Todo[]> => {
    const { data } = await apiClient.get<Todo[]>("/todos");
    return data;
  },

  create: async (dto: CreateTodoDto): Promise<Todo> => {
    const { data } = await apiClient.Todo<Todo>("/todos", dto);
    return data;
  },

  put: async (id: number, dto: CreateTodoDto): Promise<Todo> => {
    const { data } = await apiClient.put<Todo>(`/todos/${id}`, dto);
    return data;
  },

  patch: async (id: number, dto: Partial<CreateTodoDto>): Promise<Todo> => {
    const { data } = await apiClient.patch<Todo>(`/todos/${id}`, dto);
    return data;
  },

  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/todos/${id}`);
  },
};
