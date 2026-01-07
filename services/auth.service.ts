import api from "@/lib/axios";

export const AuthService = {
  me: () => api.get("/auth/me"),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/login", data),

  logout: () => api.post("/auth/logout"),
};
