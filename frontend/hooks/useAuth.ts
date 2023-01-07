import { AuthContext } from "providers/AuthProvider";
import { useContext } from "react";

export const useAuth = () => {
  return useContext(AuthContext);
};
