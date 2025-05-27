"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';
import { Loader2 } from 'lucide-react';

const AdminProtection = ({ children }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {
    // Check if user is authenticated and has admin role
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else if (userRole !== 'admin') {
        router.push('/');
      }
    }
    
    // Set loading to false after checking auth state
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    return () => clearTimeout(timer);
  }, [isAuthenticated, userRole, router, isLoading]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#003f62]" />
          <p className="mt-4 text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Only render children if user is authenticated and has admin role
  if (isAuthenticated && userRole === 'admin') {
    return children;
  }

  // This return is needed for React, but the component will redirect before rendering this
  return null;
};

export default AdminProtection;