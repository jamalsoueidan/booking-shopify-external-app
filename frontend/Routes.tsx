import { LoadingPage } from "@jamalsoueidan/bsf.bsf-pkg";
import NotFound from "pages/NotFound";
import { ProtectedRoute } from "providers/Protected";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Admin = lazy(() => import("pages/admin"));
const Auth = lazy(() => import("pages/auth/auth"));

export default () => {
  return (
    <Suspense fallback={<LoadingPage title="Loading page..." />}>
      <Routes>
        <Route
          path="admin/*"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route path="/*" element={<Auth />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
};
