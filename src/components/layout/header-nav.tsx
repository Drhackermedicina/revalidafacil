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
import { Moon, Sun, User, LogOut, Settings, Brain, Dumbbell } from "lucide-react";
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
        <div className="container flex h-16 items-center justify-end space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex-1 md:grow-0"></div>
          <div className="w-full h-8 bg-muted animate-pulse rounded-md md:w-48"></div> {/* Placeholder for user info */}
          <div className="w-10 h-10 bg-muted animate-pulse rounded-full"></div> {/* Placeholder for avatar */}
        </div>
      </header>
    );
  }
  
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 justify-end">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground mr-auto md:mr-4 ml-12 md:ml-0">
            <Dumbbell className="h-5 w-5 text-primary" />
            <span>2025.1</span>
            <Brain className="h-5 w-5 text-accent" />
            <span>0/7</span>
        </div>
        
        <span className="text-sm font-medium hidden md:block">{userName}</span>

        <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:inline-flex">
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
    </header>
  );
}
