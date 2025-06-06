
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Activity,
  Award,
  Search,
  MessageSquare,
  Sparkles,
  Lightbulb,
  LightbulbOff,
  Bell,
  Users // Ícone para Mentoria
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
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-gradient-to-r from-primary to-[hsl(var(--chart-2))] text-primary-foreground">
        <div className="container flex h-16 items-center justify-between space-x-4">
          {/* Placeholder for Nav Items */}
          <div className="flex flex-1 items-center justify-between">
            <div className="flex items-center space-x-4 md:space-x-6">
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-12 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div> {/* Início */}
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-20 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div> {/* Estatísticas */}
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-16 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div> {/* Mentoria */}
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-16 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div> {/* Recursos */}
              </div>
              <div className="flex items-center space-x-1.5">
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-10 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div> {/* Chat */}
              </div>
            </div>
            {/* Gemini placeholder, separated */}
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
              <div className="w-14 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div>
            </div>
          </div>

          {/* Placeholder for Right side: Theme, Bell */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary-foreground/20 animate-pulse rounded-full"></div> {/* Theme toggle placeholder */}
            <div className="w-10 h-10 bg-primary-foreground/20 animate-pulse rounded-full"></div> {/* Notification Bell placeholder */}
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
        {/* Nav Items */}
        <nav className="flex flex-1 items-center justify-between text-sm">
          <div className="flex items-center space-x-3 lg:space-x-4">
            <Link href="/" className="flex items-center space-x-1.5 hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Home className="h-5 w-5" />
              <span>Início</span>
            </Link>
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Activity className="h-5 w-5" />
              <span>Estatísticas</span>
            </div>
            <Link href="/mentorship" className="flex items-center space-x-1.5 hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Users className="h-5 w-5" />
              <span>Mentoria</span>
            </Link>
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Search className="h-5 w-5" />
              <span>Recursos</span>
            </div>
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <MessageSquare className="h-5 w-5" />
              <span>Chat</span>
            </div>
          </div>
          <Link
            href="https://gemini.google.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10"
          >
            <Sparkles className="h-5 w-5" />
            <span>Gemini</span>
          </Link>
        </nav>

        {/* Right side: Theme, Notifications */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema" className="hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground/50 text-primary-foreground">
            {theme === "light" ? <LightbulbOff className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
            <span className="sr-only">Alternar tema</span>
          </Button>

          <Button variant="ghost" size="icon" aria-label="Notificações" className="hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground/50 text-primary-foreground">
            <Bell className="h-5 w-5" />
            <span className="sr-only">Notificações</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
