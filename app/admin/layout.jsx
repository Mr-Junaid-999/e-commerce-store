// app/admin/dashboard/layout.jsx
import { Sidebar } from "@/app/admin/components/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen bg-[#0D1117] text-white">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6">{children}</main>
    </div>
  );
}
