import { LoadingPage } from "@jamalsoueidan/pkg.frontend";
import { useCheckLogin } from "@services/login";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isLoggedIn, isFetching } = useCheckLogin();

  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isFetching) {
    return <LoadingPage title="Checking authentication" />;
  }

  if (!token || !isLoggedIn) {
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return <>{children}</>;
};
