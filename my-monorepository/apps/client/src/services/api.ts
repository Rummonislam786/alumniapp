import axios from "axios";
import {
  User,
  Task,
  CreateUserDto,
  UpdateUserDto,
  CreateTaskDto,
  UpdateTaskDto,
  ApiResponse,
} from "@monorepo/types";

const api = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// User API
export const userApi = {
  getAll: async (): Promise<User[]> => {
    const response = await api.get<ApiResponse<User[]>>("/users");
    return response.data.data || [];
  },

  getById: async (id: number): Promise<User> => {
    const response = await api.get<ApiResponse<User>>(`/users/${id}`);
    if (!response.data.data) throw new Error("User not found");
    return response.data.data;
  },

  create: async (dto: CreateUserDto): Promise<User> => {
    const response = await api.post<ApiResponse<User>>("/users", dto);
    if (!response.data.data) throw new Error("Failed to create user");
    return response.data.data;
  },

  update: async (id: number, dto: UpdateUserDto): Promise<User> => {
    const response = await api.put<ApiResponse<User>>(`/users/${id}`, dto);
    if (!response.data.data) throw new Error("Failed to update user");
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Task API
export const taskApi = {
  getAll: async (params?: {
    userId?: number;
    status?: string;
  }): Promise<Task[]> => {
    const response = await api.get<ApiResponse<Task[]>>("/tasks", { params });
    return response.data.data || [];
  },

  getById: async (id: number): Promise<Task> => {
    const response = await api.get<ApiResponse<Task>>(`/tasks/${id}`);
    if (!response.data.data) throw new Error("Task not found");
    return response.data.data;
  },

  create: async (dto: CreateTaskDto): Promise<Task> => {
    const response = await api.post<ApiResponse<Task>>("/tasks", dto);
    if (!response.data.data) throw new Error("Failed to create task");
    return response.data.data;
  },

  update: async (id: number, dto: UpdateTaskDto): Promise<Task> => {
    const response = await api.put<ApiResponse<Task>>(`/tasks/${id}`, dto);
    if (!response.data.data) throw new Error("Failed to update task");
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  },
};
