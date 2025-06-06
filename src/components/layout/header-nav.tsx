
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Home,
  Activity,
  Award,
  Search,
  Sparkles,
  Lightbulb,
  LightbulbOff,
  Bell,
  Users // Ícone para Mentoria
} from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import type { SVGProps } from 'react';

// WhatsApp SVG Icon component (Standard Green WhatsApp Icon)
const WhatsAppIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    fill="#25D366" // WhatsApp Green
    width="20" // Adjusted size to better fit header
    height="20" // Adjusted size to better fit header
    {...props}
  >
    <title>WhatsApp</title>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.204-1.634a11.86 11.86 0 005.79 1.498h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-2.893-6.994z"/>
  </svg>
);

// Google Meet SVG Icon component
const MeetIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <title>Google Meet</title>
    <path d="M12.5799 13.4H19.3799C19.3799 15.91 18.3899 18.27 16.7199 19.94L14.7299 21.93C11.6299 23.56 7.7099 22.84 5.2299 20.35C2.7499 17.87 2.0299 13.95 3.6599 10.85L5.6499 8.86C6.6799 7.83 8.0199 7.16 9.4799 6.99L12.5799 6.6V13.4Z" fill="#00832D"/>
    <path d="M12.5799 6.6L9.4799 6.99C8.0199 7.16 6.6799 7.83 5.6499 8.86L3.6599 10.85C2.0299 13.95 2.7499 17.87 5.2299 20.35L6.1899 19.39C4.5199 17.72 4.0299 15.21 4.9199 12.98L5.4499 11.78C6.5199 9.44 8.8699 7.91 11.3499 7.91H12.5799V6.6Z" fill="#0066DA"/>
    <path d="M12.5799 13.4V7.91H11.3499C8.8699 7.91 6.5199 9.44 5.4499 11.78L4.9199 12.98C4.0299 15.21 4.5199 17.72 6.1899 19.39L8.1799 17.4C8.7299 15.97 9.7699 14.79 11.0999 14L12.5799 13.4Z" fill="#E94235"/>
    <path d="M12.5799 6.6V13.4L11.0999 14C9.7699 14.79 8.7299 15.97 8.1799 17.4L6.1899 19.39C6.6799 19.88 7.2699 20.27 7.9199 20.54L10.4699 18C10.6999 17.11 10.6599 16.16 10.3599 15.29C9.8899 13.94 10.5099 12.42 11.7899 11.67L13.7799 10.42C14.7599 9.86 15.9999 9.82 17.0099 10.32L19.3799 9.28C17.6699 7.59 15.2199 6.6 12.5799 6.6Z" fill="#FFBA00"/>
    <path d="M19.3802 9.28L17.0102 10.32C16.0002 9.82 14.7602 9.86 13.7802 10.42L11.7902 11.67C10.5102 12.42 9.89024 13.94 10.3602 15.29C10.6602 16.16 10.7002 17.11 10.4702 18L12.5802 20.53V13.4H19.3802V9.28Z" fill="#4285F4"/>
  </svg>
);


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
               <div className="flex items-center space-x-1.5"> {/* Meet Placeholder */}
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-10 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div>
              </div>
              <div className="flex items-center space-x-1.5"> {/* Report Problem placeholder */}
                <div className="w-5 h-5 bg-primary-foreground/20 animate-pulse rounded-md"></div>
                <div className="w-28 h-4 bg-primary-foreground/20 animate-pulse rounded-md"></div>
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
          <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3 lg:space-x-4">
            <Link href="/" className="flex items-center space-x-1.5 hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Home className="h-5 w-5" />
              <span className="hidden sm:inline">Início</span>
            </Link>
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Activity className="h-5 w-5" />
              <span className="hidden sm:inline">Estatísticas</span>
            </div>
            <Link href="/mentorship" className="flex items-center space-x-1.5 hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Users className="h-5 w-5" />
              <span className="hidden sm:inline">Mentoria</span>
            </Link>
            <div className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10">
              <Search className="h-5 w-5" />
              <span className="hidden sm:inline">Recursos</span>
            </div>
            <Link
              href="https://meet.google.com/new"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10"
            >
              <MeetIcon className="h-5 w-5" />
              <span className="hidden sm:inline">Meet</span>
            </Link>
            <Link
              href="https://wa.me/5545998606685"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10"
            >
              <WhatsAppIcon className="h-5 w-5" />
              <span className="hidden md:inline">Relatar Problema/Sugestões</span>
              <span className="md:hidden">Suporte</span>
            </Link>
          </div>

          <Link
            href="https://gemini.google.com/app"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1.5 cursor-pointer hover:text-primary-foreground/80 transition-colors py-2 px-2 rounded-md hover:bg-primary-foreground/10"
          >
            <Sparkles className="h-5 w-5" />
            <span className="hidden sm:inline">Gemini</span>
          </Link>
        </nav>

        {/* Right side: Theme, Notifications */}
        <div className="flex items-center space-x-1">
          <Button variant="ghost" size="icon" onClick={toggleTheme} aria-label="Alternar tema" className="hover:bg-primary-foreground/10 focus-visible:ring-primary-foreground/50 text-primary-foreground">
            {theme === "light" ? <Lightbulb className="h-5 w-5" /> : <LightbulbOff className="h-5 w-5" />}
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
