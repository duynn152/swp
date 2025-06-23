import { useState } from 'react'
import { Layout, Menu, Avatar, Typography, Button, Space, Tag } from 'antd'
import {
  DashboardOutlined,
  CalendarOutlined,
  UserOutlined,
  TeamOutlined,
  MedicineBoxOutlined,
  SettingOutlined,
  LogoutOutlined,
  HeartOutlined,
  FileTextOutlined,
  BellOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined
} from '@ant-design/icons'

const { Sider } = Layout
const { Text, Title } = Typography

interface SidebarProps {
  user: any
  onNavigate?: (page: string) => void
  onLogout: () => void
  collapsed?: boolean
  onToggleCollapse?: () => void
}

export const Sidebar = ({ user, onNavigate, onLogout, collapsed = false, onToggleCollapse }: SidebarProps) => {
  const [selectedKey, setSelectedKey] = useState('dashboard')

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'red'
      case 'DOCTOR': return 'blue'
      case 'STAFF': return 'green'
      case 'PATIENT': return 'orange'
      default: return 'default'
    }
  }

  const getRoleText = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Quản trị viên'
      case 'DOCTOR': return 'Bác sĩ'
      case 'STAFF': return 'Nhân viên'
      case 'PATIENT': return 'Bệnh nhân'
      default: return role
    }
  }

  const menuItems = [
    {
      key: 'dashboard',
      icon: <DashboardOutlined />,
      label: 'Tổng quan',
    },
    {
      key: 'appointments',
      icon: <CalendarOutlined />,
      label: 'Lịch hẹn',
    },
    {
      key: 'patients',
      icon: <TeamOutlined />,
      label: 'Bệnh nhân',
    },
    {
      key: 'medical-records',
      icon: <FileTextOutlined />,
      label: 'Hồ sơ y tế',
    },
    {
      key: 'medications',
      icon: <MedicineBoxOutlined />,
      label: 'Thuốc & Điều trị',
    },
    {
      key: 'notifications',
      icon: <BellOutlined />,
      label: 'Thông báo',
    }
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    setSelectedKey(key)
    onNavigate?.(key)
  }

  return (
    <Sider 
      width={280} 
      collapsedWidth={80}
      collapsed={collapsed}
      className="bg-white shadow-lg border-r border-gray-200"
      style={{ 
        overflow: 'auto', 
        height: '100vh', 
        position: 'fixed', 
        left: 0, 
        top: 0, 
        bottom: 0,
        zIndex: 1000
      }}
    >
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className={`flex items-center ${collapsed ? 'justify-center' : 'space-x-3'}`}>
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <HeartOutlined className="text-white text-xl" />
              </div>
              {!collapsed && (
                <div>
                  <Title level={4} className="mb-0 text-blue-600">
                    MedCare
                  </Title>
                  <Text className="text-xs text-gray-500">
                    Hospital Management
                  </Text>
                </div>
              )}
            </div>
            {!collapsed && (
              <Button
                type="text"
                icon={<MenuFoldOutlined />}
                onClick={onToggleCollapse}
                className="text-gray-500 hover:text-blue-600"
              />
            )}
            {collapsed && (
              <Button
                type="text"
                icon={<MenuUnfoldOutlined />}
                onClick={onToggleCollapse}
                className="text-gray-500 hover:text-blue-600 absolute top-4 right-2"
              />
            )}
          </div>
        </div>

        {/* User Profile */}
        {!collapsed && (
          <div className="p-4 border-b border-gray-100">
            <Space direction="vertical" size="small" className="w-full">
              <div className="flex items-center space-x-3">
                <Avatar size="large" icon={<UserOutlined />} />
                <div className="flex-1 min-w-0">
                  <Text strong className="block text-sm truncate">
                    {user?.fullName || user?.username}
                  </Text>
                  <Tag 
                    color={getRoleColor(user?.role)} 
                    className="mt-1 text-xs"
                  >
                    {getRoleText(user?.role)}
                  </Tag>
                </div>
              </div>
            </Space>
          </div>
        )}

        {/* Navigation Menu */}
        <div className="flex-1 py-4">
          <Menu
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-none"
            inlineIndent={collapsed ? 0 : 20}
          />
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-4">
          <Space direction="vertical" className="w-full" size="small">
            <Button
              icon={<SettingOutlined />}
              className={`${collapsed ? 'w-full' : 'w-full text-left'}`}
              type="text"
            >
              {!collapsed && 'Cài đặt'}
            </Button>
            <Button
              icon={<LogoutOutlined />}
              onClick={onLogout}
              className={`${collapsed ? 'w-full' : 'w-full text-left'} text-red-500 hover:text-red-600 hover:bg-red-50`}
              type="text"
            >
              {!collapsed && 'Đăng xuất'}
            </Button>
          </Space>
        </div>
      </div>
    </Sider>
  )
} 