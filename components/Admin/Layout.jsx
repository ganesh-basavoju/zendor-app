import AdminNavbar from './AdminNavbar';
import Sidebar from './Sidebar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminNavbar />
      <div className="flex flex-col lg:flex-row">
        <Sidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-6 pb-24 lg:pb-6 transition-all">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;