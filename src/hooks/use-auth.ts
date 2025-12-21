import { useUserStore } from "@/user/stores/signup-store";

export const useAuth = () => {
  const { user, isAuthenticated } = useUserStore();

  return {
    isAuthenticated,
    isAdmin: user?.role === "ROLE_admin",
    role: user?.role,
  };
};
