import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import AppLayout from "./ui/AppLayout";
import Tickets from "./pages/Tickets";
import Chat from "./pages/Chat";
import Users from "./pages/Users";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<Navigate replace to="dashboard" />}></Route>
          <Route path="dashboard" element={<Dashboard />}></Route>
          <Route path="tickets" element={<Tickets />}></Route>
          <Route path="chat" element={<Chat />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="settings" element={<Settings />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
