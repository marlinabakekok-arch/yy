"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { LogIn, LogOut, User, Palette } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

interface HeaderProps {
  onLoginClick: () => void
  theme: "blue" | "green"
  onThemeChange: (theme: "blue" | "green") => void
}

export default function Header({ onLoginClick, theme, onThemeChange }: HeaderProps) {
  const { user, logout } = useAuth()

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm sm:text-base">SMK</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-bold text-slate-800 dark:text-white">SMK YPE SAMPANG</h1>
              <p className="text-xs text-slate-600 dark:text-slate-300">Kas Kelas XI TJKT 1</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Theme Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="hidden sm:flex bg-transparent">
                  <Palette className="w-4 h-4 mr-2" />
                  Theme
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => onThemeChange("blue")}>
                  <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                  Blue Theme
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => onThemeChange("green")}>
                  <div className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></div>
                  Green Theme
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 bg-transparent">
                    <User className="w-4 h-4" />
                    <span className="hidden sm:inline">{user.name}</span>
                    <Badge variant={user.role === "bendahara" ? "default" : "secondary"} className="text-xs">
                      {user.role === "bendahara" ? "Bendahara" : "Guru"}
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem disabled>
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </DropdownMenuItem>
                  <DropdownMenuItem disabled>
                    <span className="text-xs text-slate-500">{user.assignedClass}</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button onClick={onLoginClick} className="flex items-center space-x-2">
                <LogIn className="w-4 h-4" />
                <span className="hidden sm:inline">Login</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
