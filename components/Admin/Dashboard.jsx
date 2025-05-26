"use client";
import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';
import { MoreVertical, ArrowUp, ShoppingBag, Clock, CheckCircle, Users, ExternalLink } from 'lucide-react';
import axiosInstance from "@/utils/AxiosInstance";
import { useRouter } from 'next/navigation';

// Initial empty stats
const initialStats = [
  { title: 'Total Sales', icon: ShoppingBag, color: 'blue', value: '₹0' },
  { title: 'Total Orders', icon: Clock, color: 'yellow', value: '0' },
  { title: 'Total Products', icon: CheckCircle, color: 'green', value: '0' },
  { title: 'Total Users', icon: Users, color: 'red', value: '0' },
];

const Dashboard = () => {
  const router = useRouter();
  const [timeframe, setTimeframe] = useState('WEEKLY');
  const [statsCards, setStatsCards] = useState(initialStats);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [recentOrders, setRecentOrders] = useState([]);
  const [salesData, setSalesData] = useState([]);
  
  useEffect(() => {
    const fetchDashboardStats = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch orders statistics
        const ordersResponse = await axiosInstance.get('/orders/getAllOrders');
        const orderData = ordersResponse.data.data;
        const orderStats = orderData.statistics || {};
        
        // Set recent orders (limit to 6)
        setRecentOrders(orderData.orders.slice(0, 6));
        
        // Generate sales data for graph based on orders
        generateSalesData(orderData.orders, timeframe);
        
        // Fetch products count
        const productsResponse = await axiosInstance.get('/user/products-count');
        const productsCount = productsResponse.data.count || 0;
        
        // Fetch users count
        const usersResponse = await axiosInstance.get('/user/users-count');
        const usersCount = usersResponse.data.count || 0;
        
        // Update stats cards with real data
        setStatsCards([
          { 
            title: 'Total Sales', 
            icon: ShoppingBag, 
            color: 'blue', 
            value: `₹${(orderStats.totalRevenue || 0).toLocaleString('en-IN')}` 
          },
          { 
            title: 'Total Orders', 
            icon: Clock, 
            color: 'yellow', 
            value: orderStats.totalOrders?.toString() || '0' 
          },
          { 
            title: 'Total Products', 
            icon: CheckCircle, 
            color: 'green', 
            value: productsCount.toString() 
          },
          { 
            title: 'Total Users', 
            icon: Users, 
            color: 'red', 
            value: usersCount.toString() 
          },
        ]);
      } catch (err) {
        console.error('Error fetching dashboard stats:', err);
        setError('Failed to load dashboard statistics');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDashboardStats();
  }, []);
  
  // Update sales data when timeframe changes
  useEffect(() => {
    if (recentOrders.length > 0) {
      generateSalesData(recentOrders, timeframe);
    }
  }, [timeframe, recentOrders]);
  
  // Function to generate sales data based on timeframe
  const generateSalesData = (orders, timeframe) => {
    // Current date for calculations
    const currentDate = new Date();
    let salesMap = new Map();
    let dateFormat;
    let periodStart;
    
    // Set up period based on timeframe
    switch(timeframe) {
      case 'WEEKLY':
        // Last 7 days
        periodStart = new Date(currentDate);
        periodStart.setDate(currentDate.getDate() - 6); // 6 days ago + today = 7 days
        dateFormat = (date) => {
          const day = date.getDate();
          return `${day}/${date.getMonth() + 1}`; // Format: DD/MM
        };
        break;
        
      case 'MONTHLY':
        // Last 30 days
        periodStart = new Date(currentDate);
        periodStart.setDate(currentDate.getDate() - 29); // 29 days ago + today = 30 days
        dateFormat = (date) => {
          const day = date.getDate();
          return `${day}/${date.getMonth() + 1}`; // Format: DD/MM
        };
        break;
        
      case 'YEARLY':
        // Last 12 months
        periodStart = new Date(currentDate);
        periodStart.setMonth(currentDate.getMonth() - 11); // 11 months ago + current month = 12 months
        dateFormat = (date) => {
          const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          return monthNames[date.getMonth()];
        };
        break;
    }
    
    // Initialize the sales map with all periods (days/months) set to 0
    if (timeframe === 'YEARLY') {
      // For yearly, initialize all 12 months
      for (let i = 0; i < 12; i++) {
        const date = new Date(periodStart);
        date.setMonth(periodStart.getMonth() + i);
        salesMap.set(dateFormat(date), 0);
      }
    } else {
      // For weekly/monthly, initialize all days
      const dayCount = timeframe === 'WEEKLY' ? 7 : 30;
      for (let i = 0; i < dayCount; i++) {
        const date = new Date(periodStart);
        date.setDate(periodStart.getDate() + i);
        salesMap.set(dateFormat(date), 0);
      }
    }
    
    // Process orders and aggregate sales
    orders.forEach(order => {
      // Extract date from order
      const orderDate = new Date(order.date);
      
      // Skip orders outside our period
      if (orderDate < periodStart) return;
      
      // Get the formatted date key
      const dateKey = dateFormat(orderDate);
      
      // Only process if the key exists in our map
      if (salesMap.has(dateKey)) {
        // Extract amount (remove ₹ and convert to number)
        const amount = parseFloat(order.amount.replace('₹', '').replace(',', ''));
        salesMap.set(dateKey, (salesMap.get(dateKey) || 0) + amount);
      }
    });
    
    // Convert map to array for the chart
    const chartData = Array.from(salesMap, ([date, value]) => ({ date, value }));
    
    // Sort data chronologically
    if (timeframe === 'YEARLY') {
      // For yearly, sort by month index
      const monthOrder = {'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'May': 4, 'Jun': 5, 'Jul': 6, 'Aug': 7, 'Sep': 8, 'Oct': 9, 'Nov': 10, 'Dec': 11};
      chartData.sort((a, b) => monthOrder[a.date] - monthOrder[b.date]);
    } else {
      // For daily data, sort by day
      chartData.sort((a, b) => {
        const [dayA, monthA] = a.date.split('/');
        const [dayB, monthB] = b.date.split('/');
        if (monthA !== monthB) return parseInt(monthA) - parseInt(monthB);
        return parseInt(dayA) - parseInt(dayB);
      });
    }
    
    setSalesData(chartData);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold text-[#003f62]">Dashboard</h1>
          <div className="text-sm text-gray-500">
            Home <span className="mx-1">&gt;</span> Dashboard
          </div>
        </div>
        <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg shadow-sm">
          {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {isLoading ? (
          // Loading state for stats cards
          Array(4).fill(0).map((_, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow animate-pulse">
              <div className="h-6 bg-gray-200 rounded w-1/2 mb-3"></div>
              <div className="h-8 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          ))
        ) : error ? (
          // Error state
          <div className="col-span-4 bg-red-50 p-4 rounded-lg border border-red-200">
            <p className="text-red-600">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-2 text-sm text-[#003f62] font-medium hover:underline"
            >
              Try again
            </button>
          </div>
        ) : (
          // Loaded stats cards
          statsCards.map(({ title, icon: Icon, color, value }) => (
            <div key={title} className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded bg-${color}-50`}>
                    <Icon className={`w-6 h-6 text-${color}-600`} />
                  </div>
                  <span className="text-sm font-medium text-gray-600">{title}</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical size={20} />
                </button>
              </div>
              <h3 className="text-lg md:text-xl font-bold text-gray-900">{value}</h3>
              <div className="flex items-center text-sm mt-2">
                <ArrowUp className="text-green-500 mr-1" size={16} />
                <span className="text-green-500 font-medium">34.7%</span>
                <span className="text-gray-500 ml-2 text-xs md:text-sm">Compared to Oct 2023</span>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Sales Graph */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <h2 className="text-lg font-semibold text-[#003f62]">Sales Graph</h2>
          <div className="flex space-x-2">
            {['WEEKLY', 'MONTHLY', 'YEARLY'].map((period) => (
              <button
                key={period}
                className={`px-3 md:px-4 py-1 rounded text-sm transition-colors ${
                  timeframe === period 
                    ? 'bg-[#003f62] text-white' 
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
                onClick={() => setTimeframe(period)}
              >
                {period}
              </button>
            ))}
          </div>
        </div>
        <div className="h-[300px]">
          {isLoading ? (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
              <div className="animate-pulse text-gray-400">Loading sales data...</div>
            </div>
          ) : salesData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#64748b" />
                <YAxis stroke="#64748b" />
                <Tooltip 
                  formatter={(value) => [`₹${value.toLocaleString('en-IN')}`, 'Sales']}
                  labelFormatter={(label) => `Date: ${label}`}
                  contentStyle={{ 
                    backgroundColor: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#003f62" 
                  strokeWidth={2}
                  dot={{ fill: '#003f62', strokeWidth: 2 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
              <div className="text-gray-400">No sales data available</div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 md:p-6 flex justify-between items-center border-b">
          <h2 className="text-lg font-semibold text-[#003f62]">Recent Orders</h2>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => router.push('/admin/orders')} 
              className="text-sm text-[#003f62] font-medium hover:underline flex items-center gap-1"
            >
              View All
              <ExternalLink size={14} />
            </button>
            <button className="p-2 hover:bg-[#003f62]/10 rounded-full transition-colors">
              <MoreVertical size={20} className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          {isLoading ? (
            <div className="p-8 text-center">
              <div className="animate-pulse text-gray-400">Loading recent orders...</div>
            </div>
          ) : recentOrders.length > 0 ? (
            <table className="w-full min-w-[800px]">
              <thead className="bg-gray-50">
                <tr>
                  <th className="w-8 p-4"><input type="checkbox" className="rounded border-2 border-gray-300" /></th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Order ID</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Date</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Customer Name</th>
                  <th className="text-left p-4 text-sm font-medium text-gray-600">Status</th>
                  <th className="text-right p-4 text-sm font-medium text-gray-600">Amount</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((order, i) => (
                  <tr key={order._id} className="border-t hover:bg-gray-50 transition-colors">
                    <td className="p-4"><input type="checkbox" className="rounded border-2 border-gray-300" /></td>
                    <td className="p-4 text-sm font-medium text-[#003f62]">{order.orderId}</td>
                    <td className="p-4 text-sm text-gray-600">{order.date}</td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <div className="w-8 h-8 bg-[#003f62]/10 rounded-full mr-2 flex items-center justify-center text-sm text-[#003f62] font-medium shadow-sm">
                          {order.customer.charAt(0).toUpperCase()}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{order.customer}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        order.status.toLowerCase() === 'delivered' 
                          ? 'bg-green-100 text-green-700' 
                          : order.status.toLowerCase() === 'pending'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="p-4 text-right text-sm font-medium text-gray-800">
                      ₹{parseFloat(order.amount.toString().replace(/[₹,]/g, '')).toLocaleString('en-IN')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-8 text-center text-gray-500">
              No orders found
            </div>
          )}
        </div>
        {recentOrders.length > 0 && (
          <div className="p-4 border-t text-center">
            <button 
              onClick={() => router.push('/admin/orders')} 
              className="text-[#003f62] hover:text-[#003f62]/80 font-medium text-sm transition-colors"
            >
              Load More Orders
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;