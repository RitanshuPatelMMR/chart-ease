import { Routes, Route, Navigate } from "react-router-dom";
import { AdminLayout } from "@/components/admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminUsers from "./admin/AdminUsers";
import AdminUserDetails from "./admin/AdminUserDetails";
import AdminPayments from "./admin/AdminPayments";

export default function Admin() {
  return (
    <AdminLayout>
      <Routes>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="users/:id" element={<AdminUserDetails />} />
        <Route path="payments" element={<AdminPayments />} />
      </Routes>
    </AdminLayout>
  );
}
