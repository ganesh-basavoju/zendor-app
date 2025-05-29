"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Trash2 } from 'lucide-react';
import axiosInstance from '@/utils/AxiosInstance';

export default function AcousticsAdmin() {
  const [acoustics, setAcoustics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch acoustic messages
  const fetchAcoustics = async () => {
    try {
      const response = await axiosInstance.get('/acoustics/'); // Fixed API endpoint
      setAcoustics(response.data.data || []); // Ensure we always have an array
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch messages');
      setLoading(false);
    }
  };

  // Delete acoustic message
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this message?')) {
      try {
        await axiosInstance.delete(`/acoustics/${id}`);
        setAcoustics(acoustics.filter(acoustic => acoustic._id !== id));
      } catch (err) {
        alert('Failed to delete message');
      }
    }
  };

  useEffect(() => {
    fetchAcoustics();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Acoustic Inquiries</h1>
        <p className="text-gray-500 mt-1">Manage customer inquiries for acoustic panels</p>
      </div>

      <div className="bg-white rounded-lg shadow">
        {acoustics.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            No acoustic inquiries found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone Number
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Message
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {acoustics.map((acoustic) => (
                  <tr key={acoustic._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{acoustic.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{acoustic.phoneNumber}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-md truncate">
                        {acoustic.message}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(acoustic.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleDelete(acoustic._id)}
                        className="text-red-600 hover:text-red-900 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}