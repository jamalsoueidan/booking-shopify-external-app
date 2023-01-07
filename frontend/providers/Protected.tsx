import { useAuth } from "hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const { token } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
