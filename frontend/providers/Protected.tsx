import LoadingPage from "@components/LoadingPage";
import { checkLogin } from "@services/login";
import { Navigate, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children }: any) => {
  const { isLoggedIn, isFetching } = checkLogin();

  const token = localStorage.getItem("token");
  const location = useLocation();

  if (isFetching) {
    return <LoadingPage title="Checking authentication"></LoadingPage>;
  }

  if (!token || !isLoggedIn) {
    localStorage.clear();
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  return children;
};
