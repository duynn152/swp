import { useState, useEffect } from 'react'
import { getStoredUser, clearAllData } from '../services/authService'
import { DashboardLayout } from '../components/DashboardLayout'
import { DashboardContent } from '../components/DashboardContent'
import { UserManagement } from '../components/UserManagement'
import { BlogManagement } from '../components/BlogManagement'

interface DashboardPageProps {
  onNavigate?: (page: string) => void
}

export const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
  const [user, setUser] = useState<any>(null)
  const [currentPage, setCurrentPage] = useState('dashboard')

  useEffect(() => {
    const storedUser = getStoredUser()
    if (storedUser) {
      setUser(storedUser)
    } else {
      // Nếu không có user, quay về trang login
      onNavigate?.('login')
    }
  }, [onNavigate])

  const handleLogout = () => {
    clearAllData()
    onNavigate?.('login')
  }

  const handleSidebarNavigate = (page: string) => {
    setCurrentPage(page)
    
    // Handle navigation from sidebar
    switch (page) {
      case 'dashboard':
        // Stay on dashboard - no action needed
        break
      case 'user-management':
        // Show User Management component (handled by conditional rendering)
        break
      case 'blog-management':
        // Show Blog Management component (handled by conditional rendering)
        break
      case 'appointments':
        // Navigate to appointments page (when implemented)
        console.log('Navigate to appointments')
        break
      case 'patients':
        // Navigate to patients page (when implemented)
        console.log('Navigate to patients')
        break
      case 'medical-records':
        // Navigate to medical records page (when implemented)
        console.log('Navigate to medical records')
        break
      case 'medications':
        // Navigate to medications page (when implemented)
        console.log('Navigate to medications')
        break
      case 'notifications':
        // Navigate to notifications page (when implemented)
        console.log('Navigate to notifications')
        break
      default:
        onNavigate?.(page)
    }
  }

  const renderContent = () => {
    switch (currentPage) {
      case 'user-management':
        // Only show User Management for ADMIN role
        if (user?.role === 'ADMIN') {
          return <UserManagement />
        }
        // If not admin, fallback to dashboard
        return <DashboardContent user={user} onNavigate={handleSidebarNavigate} />
      case 'blog-management':
        // Show Blog Management for both STAFF and ADMIN role
        if (user?.role === 'STAFF' || user?.role === 'ADMIN') {
          return <BlogManagement />
        }
        // If not staff or admin, fallback to dashboard
        return <DashboardContent user={user} onNavigate={handleSidebarNavigate} />
      case 'dashboard':
      default:
        return <DashboardContent user={user} onNavigate={handleSidebarNavigate} />
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <div className="text-gray-600">Đang tải...</div>
        </div>
      </div>
    )
  }

  return (
    <DashboardLayout
      user={user}
      onNavigate={handleSidebarNavigate}
      onLogout={handleLogout}
      selectedKey={currentPage}
    >
      <div className="p-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  )
} 