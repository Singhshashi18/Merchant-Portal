

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Transactions from "./pages/Transactions";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Terminals from "./pages/Terminals";
import TableActivity from "./pages/TableActivity";
import Billing from "./pages/Billing";
import Settings from "./pages/Settings";
import ForgotPassword from "./pages/ForgotPassword";
function App() {
  const location = useLocation();

  const hideNavbar = ["/login", "/forgot-password"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}

      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/users" element={<Users />} />
        <Route path="/terminals" element={<Terminals />} />
        <Route path="/table-activity" element={<TableActivity />} />
        <Route path="/billing" element={<Billing />} />
        <Route path="/settings" element={<Navigate to="/settings/kitchen-hours" replace />} />
        <Route path="/settings/:tab" element={<Settings />} />
      </Routes>
    </>
  );
}
export default App;