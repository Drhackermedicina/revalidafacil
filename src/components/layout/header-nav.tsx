
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Activity,
  TrendingUp,
  Search,
  Lightbulb,
  LightbulbOff, 
  Bell
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeaderNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  // const [userName, setUserName] = useState("Usuário"); // No longer displayed directly

  useEffect(() => {
    setMounted(true);
    // In a real app, fetch user data here
    // setUserName("hellitoncechinel"); 
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between space-x-4">
          {/* Placeholder for Left side: Nav Items */}
          <div className="flex items-center space-x-3 md:space-x-4 ml-12 md:ml-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-muted animate-pulse rounded-md"></div>
              <div className="w-12 h-4 bg-muted animate-pulse rounded-md"></div> {/* Início */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-muted animate-pulse rounded-md"></div>
              <div className="w-20 h-4 bg-muted animate-pulse rounded-md"></div> {/* Estatísticas */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-muted animate-pulse rounded-md"></div>
              <div className="w-16 h-4 bg-muted animate-pulse rounded-md"></div> {/* Evolução */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-muted animate-pulse rounded-md"></div>
              <div className="w-16 h-4 bg-muted animate-pulse rounded-md"></div> {/* Recursos */}
            </div>
          </div>
          
          {/* Placeholder for Right side: Theme, Bell */}
          <div className="flex items-center space-x-2">
            {/* User name placeholder removed */}
            <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div> {/* Theme toggle placeholder */}
            <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div> {/* Notification Bell placeholder */}
          </div>
        </div>
      </header>
    );
  }
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between space-x-4">
        {/* Left side: Nav Items */}
        <nav className="flex items-center space-x-3 md:space-x-4 text-sm text-muted-foreground ml-12 md:ml-0">
          <Link href="/" className="flex items-center space-x-1.5 hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span>Início</span>
          </Link>
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary transition-colors"> {/* Placeholder for clickability */}
            <Activity className="h-5 w-5" />
            <span>Estatísticas</span>
          </div>
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary transition-colors"> {/* Placeholder for clickability */}
            <TrendingUp className="h-5 w-5" />
            <span>Evolução</span>
          </div>
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary transition-colors"> {/* Placeholder for clickability */}
            <Search className="h-5 w-5" />
            <span>Recursos</span>
          </div>
        </nav>
        
        {/* Right side: Theme, Notifications */}
        <div className="flex items-center space-x-2">
          {/* <span className="text-sm font-medium text-foreground hidden sm:inline">{userName}</span> Removed username display */}
          
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema">
            {theme === "light" ? <LightbulbOff className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
            <span className="sr-only">Alternar tema</span>
          </Button>

          <Button variant="ghost" size="icon" aria-label="Notificações">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>
          
          {/* User Dropdown Menu (Example, if needed in future with Bell)
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Notificações">
                 <Bell className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel>Notificações</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Nenhuma notificação nova.</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          */}
        </div>
      </div>
    </header>
  );
}
