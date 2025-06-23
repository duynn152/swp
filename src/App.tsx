import { Button, Card, Space, Typography, Spin, Alert, Tag } from 'antd'
import { PlusOutlined, MinusOutlined, ReloadOutlined } from '@ant-design/icons'
import { useCounterStore } from './stores/useCounterStore'
import { useUser } from './hooks/useUser'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const { Title, Text } = Typography

function App() {
  // Zustand store
  const { count, increment, decrement, reset } = useCounterStore()
  
  // React Query
  const { data: user, isLoading, error } = useUser(1)

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header with logos */}
        <div className="text-center mb-8">
          <Space size="large" className="mb-6">
            <a href="https://vite.dev" target="_blank">
              <img src={viteLogo} className="h-16 w-16 transition-transform hover:scale-110" alt="Vite logo" />
            </a>
            <a href="https://react.dev" target="_blank">
              <img src={reactLogo} className="h-16 w-16 animate-spin-slow" alt="React logo" />
            </a>
          </Space>
          <Title level={1}>Vite + React + TypeScript</Title>
          <Space size="small" className="mt-2">
            <Tag color="blue">Ant Design</Tag>
            <Tag color="green">React Query</Tag>
            <Tag color="purple">Zustand</Tag>
            <Tag color="cyan">Tailwind CSS</Tag>
          </Space>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Zustand Counter Demo */}
          <Card title="Zustand State Management" className="shadow-md">
            <div className="text-center">
              <Title level={2} className="mb-4">{count}</Title>
              <Space>
                <Button 
                  type="primary" 
                  icon={<PlusOutlined />} 
                  onClick={increment}
                  size="large"
                >
                  Increment
                </Button>
                <Button 
                  icon={<MinusOutlined />} 
                  onClick={decrement}
                  size="large"
                >
                  Decrement
                </Button>
                <Button 
                  icon={<ReloadOutlined />} 
                  onClick={reset}
                  size="large"
                >
                  Reset
                </Button>
              </Space>
            </div>
          </Card>

          {/* React Query Demo */}
          <Card title="React Query Data Fetching" className="shadow-md">
            {isLoading && (
              <div className="text-center">
                <Spin size="large" />
                <Text className="block mt-2">Loading user data...</Text>
              </div>
            )}
            
            {error && (
              <Alert 
                message="Error" 
                description="Failed to fetch user data" 
                type="error" 
                showIcon 
              />
            )}
            
            {user && (
              <div>
                <Title level={4}>{user.name}</Title>
                <Space direction="vertical" className="w-full">
                  <Text>
                    <strong>Username:</strong> {user.username}
                  </Text>
                  <Text>
                    <strong>Email:</strong> {user.email}
                  </Text>
                </Space>
              </div>
            )}
          </Card>
        </div>

        <Card className="mt-6 shadow-md">
          <Text className="text-center block">
            Edit <Text code>src/App.tsx</Text> and save to test HMR
          </Text>
        </Card>
      </div>
    </div>
  )
}

export default App
