import { useState } from 'react'
import { Layout } from 'antd'
import { Sidebar } from './Sidebar'

const { Content } = Layout

interface DashboardLayoutProps {
  user: any
  onNavigate?: (page: string) => void
  onLogout: () => void
  children: React.ReactNode
  selectedKey?: string
}

export const DashboardLayout = ({ user, onNavigate, onLogout, children, selectedKey }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false)

  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }

  return (
    <Layout className="min-h-screen bg-gray-50">
      <Sidebar
        user={user}
        onNavigate={onNavigate}
        onLogout={onLogout}
        collapsed={collapsed}
        onToggleCollapse={toggleCollapse}
        selectedKey={selectedKey}
      />
      
      <Layout style={{ marginLeft: collapsed ? 80 : 280, transition: 'margin-left 0.2s' }}>
        <Content className="overflow-auto">
          {children}
        </Content>
      </Layout>
    </Layout>
  )
} 