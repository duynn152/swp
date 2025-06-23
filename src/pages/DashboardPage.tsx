import { useState, useEffect } from 'react'
import { getStoredUser, clearTokens } from '../services/authService'
import { DashboardLayout } from '../components/DashboardLayout'
import { DashboardContent } from '../components/DashboardContent'

interface DashboardPageProps {
  onNavigate?: (page: string) => void
}

export const DashboardPage = ({ onNavigate }: DashboardPageProps) => {
  const [user, setUser] = useState<any>(null)

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
    clearTokens()
    onNavigate?.('login')
  }

  const handleSidebarNavigate = (page: string) => {
    // Handle navigation from sidebar
    switch (page) {
      case 'dashboard':
        // Stay on dashboard - no action needed
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
    >
      <DashboardContent 
        user={user} 
        onNavigate={handleSidebarNavigate}
      />
    </DashboardLayout>
  )
} 