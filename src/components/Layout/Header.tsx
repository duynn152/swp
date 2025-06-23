import { useState } from 'react'
import { Layout, Menu, Button, Space, Drawer } from 'antd'
import { 
  HomeOutlined, 
  InfoCircleOutlined, 
  UserOutlined, 
  PhoneOutlined,
  MenuOutlined,
  MedicineBoxOutlined
} from '@ant-design/icons'

const { Header: AntHeader } = Layout

interface HeaderProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export const Header = ({ currentPage, onNavigate }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      key: 'home',
      icon: <HomeOutlined />,
      label: 'Trang chủ',
    },
    {
      key: 'about',
      icon: <InfoCircleOutlined />,
      label: 'Giới thiệu',
    },
    {
      key: 'services',
      icon: <MedicineBoxOutlined />,
      label: 'Dịch vụ',
    },
    {
      key: 'contact',
      icon: <PhoneOutlined />,
      label: 'Liên hệ',
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    onNavigate(key)
    setMobileMenuOpen(false)
  }

  return (
    <AntHeader className="bg-white shadow-md px-4 md:px-8 flex items-center justify-between sticky top-0 z-50">
      {/* Logo */}
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
          <MedicineBoxOutlined className="text-white text-xl" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-blue-600 m-0">MedCare Hospital</h1>
          <p className="text-xs text-gray-500 m-0">Chăm sóc sức khỏe toàn diện</p>
        </div>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex items-center space-x-8">
        <Menu
          mode="horizontal"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none bg-transparent"
        />
        
        <Button 
          type="primary" 
          icon={<UserOutlined />}
          onClick={() => onNavigate('login')}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Đăng nhập
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button 
          type="text" 
          icon={<MenuOutlined />}
          onClick={() => setMobileMenuOpen(true)}
          className="text-blue-600"
        />
      </div>

      {/* Mobile Drawer */}
      <Drawer
        title="Menu"
        placement="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        width={250}
      >
        <Menu
          mode="vertical"
          selectedKeys={[currentPage]}
          items={menuItems}
          onClick={handleMenuClick}
          className="border-none"
        />
        
        <div className="mt-4">
          <Button 
            type="primary" 
            icon={<UserOutlined />}
            block
            onClick={() => onNavigate('login')}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Đăng nhập
          </Button>
        </div>
      </Drawer>
    </AntHeader>
  )
} 