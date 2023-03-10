import { AbilityProvider, LoadingPage, getAbilityFromToken } from "@jamalsoueidan/pkg.frontend";
import NotFound from "pages/NotFound";
import { ProtectedRoute } from "providers/Protected";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

const Admin = lazy(() => import("pages/admin"));
const Auth = lazy(() => import("pages/auth/auth"));

export const ApplicationRoutes = () => (
  <Suspense fallback={<LoadingPage title="Loading page..." />}>
    <Routes>
      <Route path="admin/*" element={<AdminRoute />} />
      <Route path="/*" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </Suspense>
);

const AdminRoute = () => (
  <ProtectedRoute>
    <AbilityProvider ability={getAbilityFromToken()}>
      <Admin />
    </AbilityProvider>
  </ProtectedRoute>
);
