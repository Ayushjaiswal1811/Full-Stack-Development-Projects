import { Link, Outlet } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-blue-700 text-white p-6 space-y-6">
        <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

        <nav className="space-y-4 text-lg">
          <Link
            to="/admin"
            className="block hover:bg-blue-600 px-3 py-2 rounded"
          >
            Dashboard Home
          </Link>

          <Link
            to="/admin/add-store"
            className="block hover:bg-blue-600 px-3 py-2 rounded"
          >
            Add Store
          </Link>

          <Link
            to="/admin/add-user"
            className="block hover:bg-blue-600 px-3 py-2 rounded"
          >
            Add User
          </Link>

          <Link
            to="/admin/stores"
            className="block hover:bg-blue-600 px-3 py-2 rounded"
          >
            Manage Stores
          </Link>

          <Link
            to="/admin/users"
            className="block hover:bg-blue-600 px-3 py-2 rounded"
          >
            Manage Users
          </Link>
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-10">
        <Outlet />
      </div>
    </div>
  );
}
