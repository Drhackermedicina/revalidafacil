
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

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-border bg-gradient-to-r from-primary to-[hsl(var(--chart-2))]">
        <div className="container flex h-16 items-center justify-between space-x-4">
          {/* Placeholder for Left side: Nav Items */}
          <div className="flex items-center space-x-4 md:space-x-6 ml-12 md:ml-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-primary-foreground/10 animate-pulse rounded-md"></div>
              <div className="w-12 h-4 bg-primary-foreground/10 animate-pulse rounded-md"></div> {/* Início */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-primary-foreground/10 animate-pulse rounded-md"></div>
              <div className="w-20 h-4 bg-primary-foreground/10 animate-pulse rounded-md"></div> {/* Estatísticas */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-primary-foreground/10 animate-pulse rounded-md"></div>
              <div className="w-16 h-4 bg-primary-foreground/10 animate-pulse rounded-md"></div> {/* Evolução */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-primary-foreground/10 animate-pulse rounded-md"></div>
              <div className="w-16 h-4 bg-primary-foreground/10 animate-pulse rounded-md"></div> {/* Recursos */}
            </div>
          </div>
          
          {/* Placeholder for Right side: Theme, Bell */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-foreground/10 animate-pulse rounded-full"></div> {/* Theme toggle placeholder */}
            <div className="w-10 h-10 bg-primary-foreground/10 animate-pulse rounded-full"></div> {/* Notification Bell placeholder */}
          </div>
        </div>
      </header>
    );
  }
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground">
      <div className="container flex h-16 items-center justify-between space-x-4">
        {/* Left side: Nav Items */}
        <nav className="flex items-center space-x-4 md:space-x-6 text-sm ml-12 md:ml-0">
          <Link href="/" className="flex items-center space-x-1.5 hover:text-primary-foreground/80 transition-colors">
            <Home className="h-5 w-5" />
            <span>Início</span>
          </Link>
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors"> {/* Placeholder for clickability */}
            <Activity className="h-5 w-5" />
            <span>Estatísticas</span>
          </div>
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors"> {/* Placeholder for clickability */}
            <TrendingUp className="h-5 w-5" />
            <span>Evolução</span>
          </div>
          <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors"> {/* Placeholder for clickability */}
            <Search className="h-5 w-5" />
            <span>Recursos</span>
          </div>
        </nav>
        
        {/* Right side: Theme, Notifications */}
        <div className="flex items-center space-x-2 text-primary-foreground">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema" className="hover:bg-white/10 focus-visible:ring-white/50">
            {theme === "light" ? <LightbulbOff className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
            <span className="sr-only">Alternar tema</span>
          </Button>

          <Button variant="ghost" size="icon" aria-label="Notificações" className="hover:bg-white/10 focus-visible:ring-white/50">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>
        </div>
      </div>
    </header>
  );
}

