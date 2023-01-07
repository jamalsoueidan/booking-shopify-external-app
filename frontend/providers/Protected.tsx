import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const token = localStorage.getItem("token");
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
