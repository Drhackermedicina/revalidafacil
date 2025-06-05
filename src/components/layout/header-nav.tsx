
"use client";

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Moon, Sun, User, LogOut, Settings, Activity, TrendingUp } from "lucide-react"; // Updated icons
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function HeaderNav() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [userName, setUserName] = useState("Usuário");
  const [userAvatar, setUserAvatar] = useState("https://placehold.co/40x40.png");

  useEffect(() => {
    setMounted(true);
    // In a real app, fetch user data here
    setUserName("hellitoncechinel");
    setUserAvatar("https://app.penserevalida.com/avatar/cc0984d1-dae5-4b44-8097-2a19a68c6b9e.png");
  }, []);

  if (!mounted) {
    return (
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between space-x-4"> {/* Matched justify-between */}
          {/* Placeholder for Left side: Stats */}
          <div className="flex items-center space-x-3 ml-12 md:ml-0">
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-muted animate-pulse rounded-md"></div> {/* Icon placeholder */}
              <div className="w-20 h-4 bg-muted animate-pulse rounded-md"></div> {/* Text placeholder for "Estatísticas" */}
            </div>
            <div className="flex items-center space-x-1.5">
              <div className="w-5 h-5 bg-muted animate-pulse rounded-md"></div> {/* Icon placeholder */}
              <div className="w-16 h-4 bg-muted animate-pulse rounded-md"></div> {/* Text placeholder for "Evolução" */}
            </div>
          </div>
          
          {/* Placeholder for Right side: User Name, Theme, Avatar */}
          <div className="flex items-center space-x-2">
            <div className="w-24 h-4 bg-muted animate-pulse rounded-md hidden sm:inline"></div> {/* User name placeholder */}
            <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div> {/* Theme toggle placeholder */}
            <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div> {/* Avatar placeholder */}
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
      <div className="container flex h-16 items-center justify-between space-x-4"> {/* Changed to justify-between */}
        {/* Left side: Stats */}
        <div className="flex items-center space-x-3 text-sm text-muted-foreground ml-12 md:ml-0">
          <div className="flex items-center space-x-1.5">
            <Activity className="h-5 w-5 text-primary" />
            <span>Estatísticas</span>
          </div>
          <div className="flex items-center space-x-1.5">
            <TrendingUp className="h-5 w-5 text-accent" />
            <span>Evolução</span>
          </div>
        </div>
        
        {/* Right side: User Name, Theme, Avatar */}
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium text-foreground hidden sm:inline">{userName}</span>
          
          <Button variant="ghost" size="icon" onClick={toggleTheme}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            <span className="sr-only">Toggle theme</span>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage src={userAvatar} alt={userName} data-ai-hint="user avatar" />
                  <AvatarFallback>{userName.charAt(0).toUpperCase()}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{userName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {/* email can be added here if available */}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account">
                  <User className="mr-2 h-4 w-4" />
                  <span>Minha Conta</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Configurações</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sair</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
