import axios from "axios";
import {
  users,
  // alumni,
  CRUserDto,
  // CRAlumniDto,
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
  getAll: async (): Promise<users[]> => {
    const response = await api.get<ApiResponse<users[]>>("/users");
    return response.data.data || [];
  },

  getById: async (id: number): Promise<users> => {
    const response = await api.get<ApiResponse<users>>(`/users/${id}`);
    if (!response.data.data) throw new Error("User not found");
    return response.data.data;
  },

  create: async (dto: CRUserDto): Promise<users> => {
    const response = await api.post<ApiResponse<users>>("/users", dto);
    if (!response.data.data) throw new Error("Failed to create user");
    return response.data.data;
  },

  update: async (id: number, dto: CRUserDto): Promise<users> => {
    const response = await api.put<ApiResponse<users>>(`/users/${id}`, dto);
    if (!response.data.data) throw new Error("Failed to update user");
    return response.data.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/users/${id}`);
  },
};

// Task API
// export const AlumniApi = {
//   getAll: async (params?: {
//     userId?: number;
//     status?: string;
//   }): Promise<alumni[]> => {
//     const response = await api.get<ApiResponse<alumni[]>>("/alumni", { params });
//     return response.data.data || [];
//   },

//   getById: async (id: number): Promise<alumni> => {
//     const response = await api.get<ApiResponse<alumni>>(`/alumni/${id}`);
//     if (!response.data.data) throw new Error("Alumni not found");
//     return response.data.data;
//   },

//   create: async (dto: CRAlumniDto): Promise<alumni> => {
//     const response = await api.post<ApiResponse<alumni>>("/alumni", dto);
//     if (!response.data.data) throw new Error("Failed to create alumni");
//     return response.data.data;
//   },

//   update: async (id: number, dto: CRAlumniDto): Promise<alumni> => {
//     const response = await api.put<ApiResponse<alumni>>(`/alumni/${id}`, dto);
//     if (!response.data.data) throw new Error("Failed to update alumni");
//     return response.data.data;
//   },

//   delete: async (id: number): Promise<void> => {
//     await api.delete(`/alumni/${id}`);
//   },
// };
