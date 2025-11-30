import { NavLink } from 'react-router-dom'
import { Home, Users, DollarSign, CheckSquare, Mail, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUIStore } from '@/stores/uiStore'
import { Button } from '@/components/ui/button'

const navigation = [
  { name: 'Dashboard', href: '/', icon: Home },
  { name: 'Invitados', href: '/guests', icon: Users },
  { name: 'Presupuesto', href: '/budget', icon: DollarSign },
  { name: 'Tareas', href: '/tasks', icon: CheckSquare },
  { name: 'Invitaciones', href: '/invitations', icon: Mail },
]

export function Sidebar() {
  const { sidebarOpen, setSidebarOpen } = useUIStore()

  return (
    <>
      {/* Overlay móvil */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-16 z-40 h-[calc(100vh-4rem)] w-64 border-r bg-background transition-transform md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col gap-2 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden absolute top-2 right-2"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>

          <nav className="space-y-1 mt-8 md:mt-0">
            {navigation.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                onClick={() => setSidebarOpen(false)}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  )
                }
              >
                <item.icon className="h-5 w-5" />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  )
}
