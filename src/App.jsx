import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Tickets from "./pages/Tickets";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import UserSettings from "./pages/UserSettings";

import AppLayout from "./ui/AppLayout";
import ProtectedRoute from "./ui/ProtectedRoute";
import AuthRoute from "./ui/AuthRoute";

import TicketAddForm from "./features/tickets/TicketAddForm";
import TicketDetailPage from "./features/tickets/TicketDetailPage";

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
      <ReactQueryDevtools initialIsOpen={false} />

      <BrowserRouter>
        <Routes>
          <Route
            element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate replace to="dashboard" />}></Route>
            <Route path="dashboard" element={<Dashboard />}></Route>
            <Route path="tickets" element={<Tickets />}></Route>
            <Route path="tickets/add" element={<TicketAddForm />}></Route>
            <Route path="tickets/:id" element={<TicketDetailPage />} />
            <Route path="chat" element={<Chat />}></Route>
            <Route path="user-settings" element={<UserSettings />}></Route>
            <Route path="users" element={<Users />}></Route>
            <Route path="settings" element={<Settings />}></Route>
          </Route>

          <Route
            path="reset-pass"
            element={
              <ProtectedRoute>
                <ResetPassword />
              </ProtectedRoute>
            }
          />

          <Route
            path="login"
            element={
              <AuthRoute>
                <Login />
              </AuthRoute>
            }
          />
          <Route
            path="signup"
            element={
              <AuthRoute>
                <Signup />
              </AuthRoute>
            }
          />
          <Route
            path="forgot-pass"
            element={
              <AuthRoute>
                <ForgotPassword />
              </AuthRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "16px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#fafaf9",
            color: "#374151",
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
