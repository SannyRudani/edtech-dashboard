import api from "@/lib/axios";

export const AdminService = {
  users: () => api.get("/admin/users"),

  updateRole: (id: string, role: string) =>
    api.put(`/admin/users/${id}`, { role }),
};
