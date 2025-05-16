import AdminLayout from '@/components/Admin/Layout'
import AdminProtection from '@/components/Admin/AdminProtection'
import React from 'react'

const layout = ({children}) => {
  return (
    <AdminProtection>
      <AdminLayout>
        {children}
      </AdminLayout>
    </AdminProtection>
  )
}

export default layout