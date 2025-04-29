"use client";
import { useState, useEffect } from 'react';
import { Trash2, UserPlus, Search } from 'lucide-react';
import axiosInstance from '@/utils/AxiosInstance';
import toast from 'react-hot-toast';

const UsersList = () => {
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'Customer'
  });
  
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/user/getAllUsers');
      console.log(response.data,"admin");
      if (response.data.success) {
        setUsers(response.data.data.users);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        userName: newUser.name,
        email: newUser.email,
        password: newUser.password,
        role: newUser.role
      };

      const response = await axiosInstance.post('/user/addRole', userData);
      
      if (response.data.success) {
        toast.success('User added successfully');
        fetchUsers(); // Refresh the users list
        setNewUser({ name: '', email: '', password: '', role: 'Customer' });
      }
    } catch (error) {
      console.error('Error adding user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to add user';
      toast.error(errorMessage);
    }
  };

  const handleUpdateRole = async (userId, newRole) => {
    try {
      const response = await axiosInstance.put('/user/update-role', {
        userId: userId,
        newRole: newRole.toLowerCase()
      });

      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error('Error updating user role:', error);
      const errorMessage = error.response?.data?.message || 'Failed to update user role';
      toast.error(errorMessage);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!confirm('Are you sure you want to delete this user?')) return;
    try {
      const response = await axiosInstance.delete(`/user/delete-user/${userId}`);
      
      if (response.data.success) {
        toast.success(response.data.message);
        fetchUsers(); // Refresh the users list
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      const errorMessage = error.response?.data?.message || 'Failed to delete user';
      toast.error(errorMessage);
    }
  };

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#003f62]">Users Management</h1>
          <div className="text-sm text-gray-500">
            Dashboard <span className="mx-1">&gt;</span> Users
          </div>
        </div>
      </div>

      {/* Add User Form */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex items-center gap-2 mb-6">
          <UserPlus className="text-[#003f62]" size={24} />
          <h2 className="text-xl font-semibold text-[#003f62]">Add New User</h2>
        </div>
        <form onSubmit={handleAddUser} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={newUser.name}
                onChange={(e) => setNewUser({...newUser, name: e.target.value})}
                className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={newUser.email}
                onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={newUser.password}
                onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Role</label>
              <select
                value={newUser.role}
                onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                className="w-full p-2.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
              >
                <option value="Customer">Customer</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="bg-[#003f62] text-white px-6 py-2.5 rounded-lg hover:bg-[#003f62]/90 transition-colors flex items-center gap-2"
          >
            <UserPlus size={20} />
            Add User
          </button>
        </form>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <h2 className="text-xl font-semibold text-[#003f62]">
              Users List ({users.length})
            </h2>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users..."
                className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
              />
            </div>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <div className="p-8 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#003f62] mx-auto"></div>
              <p className="mt-2 text-gray-500">Loading users...</p>
            </div>
          ) : (
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">NAME</th>
                  <th className="text-left p-4 font-medium text-gray-600">EMAIL</th>
                  <th className="text-left p-4 font-medium text-gray-600">ROLE</th>
                  <th className="text-right p-4 font-medium text-gray-600">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.actions} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-4 font-medium text-gray-900">{user.name}</td>
                    <td className="p-4 text-gray-600">{user.email}</td>
                    <td className="p-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.actions, e.target.value)}
                        className="px-3 py-1.5 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                        disabled={user.email === 'admin@example.com'}
                      >
                        <option value="customer">Customer</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDeleteUser(user.actions)}
                        disabled={user.email === 'admin@example.com'}
                        className="p-2 hover:bg-red-50 rounded-lg text-red-500 hover:text-red-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default UsersList;