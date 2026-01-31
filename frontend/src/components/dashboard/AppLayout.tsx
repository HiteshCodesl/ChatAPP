import React from 'react'
import { SidebarProvider } from '../../components/ui/sidebar.tsx'
import { AppSidebar } from '../../components/ui/app-sidebar.tsx'
import { CustomTrigger } from '../../components/ui/customTrigger.tsx'

function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className='fixed inset-y-0 left-0 z-10 w-[--sidebar-width] bg-gray-900'>
      <SidebarProvider>
        <AppSidebar />
        <CustomTrigger />
        {children}
      </SidebarProvider>
    </div>

  )
}

export default AppLayout