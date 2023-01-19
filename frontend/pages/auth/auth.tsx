import { AuthFrame } from "@components/auth/AuthFrame";
import { Outlet } from "react-router-dom";

export default () => {
  return (
    <AuthFrame>
      <Outlet />
    </AuthFrame>
  );
};
