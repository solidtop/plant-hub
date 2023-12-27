import { UserContext } from "@/providers/UserProvider";
import { useContext } from "react";

export default function useUser() {
  const { user, loading, login, logout, register } = useContext(UserContext);

  return {
    user,
    loading,
    login,
    logout,
    register,
  };
}
