import { Menu, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/authStore'
import { useUIStore } from '@/stores/uiStore'

export function Header() {
  const { signOut } = useAuthStore()
  const { toggleSidebar } = useUIStore()

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-16 items-center px-4 md:px-6">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden mr-2"
          onClick={toggleSidebar}
        >
          <Menu className="h-5 w-5" />
        </Button>

        <h1 className="text-2xl font-heading font-semibold text-primary">
          CasaPupis
        </h1>

        <div className="ml-auto">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => signOut()}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" />
            <span className="hidden sm:inline">Salir</span>
          </Button>
        </div>
      </div>
    </header>
  )
}
