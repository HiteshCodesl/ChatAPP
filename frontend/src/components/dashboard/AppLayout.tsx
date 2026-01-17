import React from 'react'
import { SidebarProvider } from '../../components/ui/sidebar.tsx'
import { AppSidebar } from '../../components/ui/app-sidebar.tsx'
import { CustomTrigger } from '../../components/ui/customTrigger.tsx'

function AppLayout({children}: {children: React.ReactNode}) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <CustomTrigger />
        {children}
    </SidebarProvider>    
  )
}

export default AppLayout