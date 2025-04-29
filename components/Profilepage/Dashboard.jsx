import { poppins } from '@/app/page';
import { Package2, Heart, Clock } from 'lucide-react';

const DashboardCard = ({ title, count, icon: Icon, color, state = -1, setCurrent }) => (
  <div 
    onClick={() => { state !== -1 && setCurrent(state) }}
    className="bg-white rounded-xl shadow-sm p-6 flex items-start gap-4 hover:shadow-md transition-shadow cursor-pointer"
  >
    <div className={`${color} p-3 rounded-lg text-white`}>
      <Icon size={24} />
    </div>
    <div>
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-semibold text-gray-900 mt-1">{count}</p>
    </div>
  </div>
);

export const Dashboard = ({ userData, setCurrent }) => {
  // Create dynamic stats cards based on user data
  const statsCards = [
    { 
      title: "Total Orders", 
      count: userData?.orders?.length || 0, 
      icon: Package2, 
      color: "bg-blue-500",
      state: 2 
    },
    { 
      title: "Wishlist Items", 
      count: userData?.wishlist?.length || 0, 
      icon: Heart, 
      color: "bg-pink-500",
      state: 3 
    },
    { 
      title: "Cart Items", 
      count: userData?.cart?.length || 0, 
      icon: Package2, 
      color: "bg-amber-500" 
    },
  ];

  // Filter recent activities from orders and wishlist
  const recentActivities = [
    ...(userData?.orders?.slice(0, 2) || []).map(order => ({
      type: 'order',
      icon: Package2,
      iconColor: 'text-blue-600',
      bgColor: 'bg-blue-100',
      text: `Order #${order._id.slice(-5)} ${order.status || 'placed'}`,
      time: new Date(order.createdAt).toLocaleDateString()
    })),
    ...(userData?.wishlist?.slice(0, 2) || []).map(item => ({
      type: 'wishlist',
      icon: Heart,
      iconColor: 'text-pink-600',
      bgColor: 'bg-pink-100',
      text: 'Added item to wishlist',
      time: new Date(item.createdAt).toLocaleDateString()
    }))
  ].sort((a, b) => new Date(b.time) - new Date(a.time)).slice(0, 2);

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-gray-900">
          Welcome back, <span className="capitalize">{userData?.userName || 'Guest'}</span>
        </h2>
        <p className="text-gray-600">
          Track your orders, manage wishlist items, and update your profile all in one place.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {statsCards.map((card, index) => (
          <DashboardCard key={index} {...card} setCurrent={setCurrent} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-4">
          {recentActivities.length > 0 ? (
            recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                <div className={`${activity.bgColor} p-2 rounded-lg`}>
                  <activity.icon size={20} className={activity.iconColor} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center py-4">No recent activity</p>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button onClick={() => setCurrent(2)} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <h3 className="font-medium text-gray-900">View Orders</h3>
          <p className="text-sm text-gray-500 mt-1">Track your recent purchases</p>
        </button>
        <button onClick={() => setCurrent(5)} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left">
          <h3 className="font-medium text-gray-900">Update Profile</h3>
          <p className="text-sm text-gray-500 mt-1">Manage your account details</p>
        </button>
      </div>
    </div>
  );
};