import React from 'react'
import { Toaster } from 'react-hot-toast'

const layout = ({children}) => {
  return (
    <div className='flex flex-col w-full bg-gray-100 '>
        <Toaster/>
        {children}
    </div>
  )
}

export default layout