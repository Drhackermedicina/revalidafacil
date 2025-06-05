"use client";

import { SidebarNav } from "@/components/layout/sidebar-nav";
import { HeaderNav } from "@/components/layout/header-nav";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: React.ReactNode;
}

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <SidebarNav />
      <div className="flex-1 flex flex-col md:ml-0 transition-all duration-300 ease-in-out"> {/* Adjust ml if sidebar is collapsed fixed width */}
        <HeaderNav />
        <main className="flex-1 p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
