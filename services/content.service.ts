import api from "@/lib/axios";

export const ContentService = {
  list: (params?: { page?: number; limit?: number; search?: string }) =>
    api.get("/content", { params }),

  getById: (id: string) => api.get(`/content/${id}`),

  create: (data: any) => api.post("/content", data),

  update: (id: string, data: any) => api.put(`/content/${id}`, data),

  delete: (id: string) => api.delete(`/content/${id}`),
};
