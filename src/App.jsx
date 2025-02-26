import { lazy, Suspense } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SkeletonTheme } from "react-loading-skeleton";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./features/authentication/ProtectedRoute";
import FullscreenLoading from "./ui/Loaders/FullscreenLoading";

const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Clients = lazy(() => import("./pages/Clients"));
const Users = lazy(() => import("./pages/Users"));
const NoAccess = lazy(() => import("./pages/NoAccess"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <SkeletonTheme
        baseColor="#151c28"
        highlightColor="#1d2430"
        borderRadius={8}
      >
        {import.meta.env.MODE === "development" && (
          <ReactQueryDevtools initialIsOpen={false} />
        )}

        <BrowserRouter>
          <Suspense fallback={<FullscreenLoading />}>
            <Routes>
              <Route
                element={
                  <ProtectedRoute>
                    <AppLayout />
                  </ProtectedRoute>
                }
              >
                <Route index element={<Navigate replace to="dashboard" />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="erp/clients" element={<Clients />} />
                <Route path="users" element={<Users />} />
              </Route>
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </SkeletonTheme>
    </QueryClientProvider>
  );
}

export default App;
