import AdminLayout from '@/components/Admin/Layout';
import Dashboard from '@/components/Admin/Dashboard';
import AdminProtection from '@/components/Admin/AdminProtection';

export default function AdminPage() {
  return (
    <AdminProtection>
      <Dashboard />
    </AdminProtection>
  );
}