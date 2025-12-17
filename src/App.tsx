import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useAuth } from '@/hooks/useAuth'
import { ProtectedRoute } from '@/components/ProtectedRoute'
import { MainLayout } from '@/components/layout/MainLayout'
import { Login } from '@/pages/Login'
import { Dashboard } from '@/pages/Dashboard'
import { GuestsPage } from '@/pages/GuestsPage'
import { BudgetPage } from '@/pages/BudgetPage'
import { TasksPage } from '@/pages/TasksPage'
import { InvitationsPage } from '@/pages/InvitationsPage'
import { InvitationPreview } from '@/pages/InvitationPreview'
import { PublicRSVP } from '@/pages/PublicRSVP'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
})

function AppContent() {
  useAuth()

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/rsvp/:nameOrToken" element={<PublicRSVP />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Dashboard />} />
        <Route path="/guests" element={<GuestsPage />} />
        <Route path="/budget" element={<BudgetPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/invitations" element={<InvitationsPage />} />
        <Route path="/invitations/preview/:token" element={<InvitationPreview />} />
      </Route>
    </Routes>
  )
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
