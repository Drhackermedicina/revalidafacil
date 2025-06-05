
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive, // Changed
  BookMarked, // Changed
  BarChart3,
  History, 
  Clock, // Changed from ClockRewind
  Moon,
  Sun,
  ChevronsLeft,
  ChevronsRight,
  Menu as MenuIcon,
  ClipboardCheck, // New
  FilePlus2, // New
  Library, // New
  UserCircle, // Changed
  Laptop, // New
  TrendingUp, // New
  ListChecks, 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Logo from "@/components/icons/logo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState, useEffect } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isSubItem?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isSubItem }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href} passHref>
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start",
            isSubItem ? "pl-10" : "pl-6",
            isActive && "bg-primary/10 text-primary hover:bg-primary/20"
          )}
        >
          <Icon className="mr-2 h-5 w-5" />
          {label}
        </Button>
      </Link>
    </li>
  );
};

const NavAccordionItem: React.FC<{
  icon: React.ElementType;
  label: string;
  children: React.ReactNode;
  value: string;
}> = ({ icon: Icon, label, children, value }) => {
  return (
    <AccordionItem value={value} className="border-none">
      <AccordionTrigger className="py-2 px-6 hover:bg-muted/50 hover:no-underline rounded-md text-foreground/80 data-[state=open]:text-primary">
        <div className="flex items-center">
          <Icon className="mr-2 h-5 w-5" />
          {label}
        </div>
      </AccordionTrigger>
      <AccordionContent className="pb-0">
        <ul className="space-y-1">{children}</ul>
      </AccordionContent>
    </AccordionItem>
  );
};

const SidebarNavContent = () => (
  <>
    <div className="p-4 border-b border-border flex items-center justify-center">
      <Link href="/">
        <Logo width={36} height={36} className="h-9 w-9 text-primary" />
      </Link>
    </div>
    <ScrollArea className="flex-grow">
      <nav className="py-4">
        <ul className="space-y-1 px-2">
          <NavItem href="/dashboard" icon={UserCircle} label="Área do estudante" />
          
          <NavAccordionItem icon={Archive} label="Estações" value="checklists">
            <NavItem href="/estacoes/inep" icon={BookMarked} label="INEP Provas anteriores" isSubItem />
            <NavItem href="/checklists/pense" icon={ClipboardCheck} label="REVALIDA FÁCIL" isSubItem />
          </NavAccordionItem>
          <NavItem href="/simulados" icon={Laptop} label="Simulados" />
          <NavItem href="/performance" icon={TrendingUp} label="Meus Desempenhos" />
          <NavItem href="/materiais-apoio" icon={Library} label="Materiais de apoio" />
          <NavItem href="/modelos-checklists" icon={FilePlus2} label="Modelo de Checklists" />
          <NavAccordionItem icon={Clock} label="Histórico" value="history">
            <NavItem href="/history/checklist" icon={History} label="Checklist" isSubItem />
          </NavAccordionItem>
        </ul>
      </nav>
    </ScrollArea>
  </>
);


export function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; 

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);
  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={cn(
          "hidden md:flex flex-col h-screen bg-card border-r border-border transition-all duration-300 ease-in-out",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn(
          "p-3 border-b border-border flex items-center",
          isCollapsed ? "flex-col gap-2 py-2.5 items-center" : "justify-between" 
        )}>
          <Link href="/" className={cn(isCollapsed && "flex justify-center w-full")}>
            <Logo 
              width={isCollapsed ? 28 : 32} 
              height={isCollapsed ? 28 : 32} 
              className={cn(isCollapsed ? "h-7 w-7" : "h-8 w-8", "text-primary")}
            />
          </Link>
          
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn(isCollapsed && "mt-1")}>
            {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </Button>
        </div>
        <ScrollArea className="flex-grow">
           <nav className="py-2">
            <Accordion type="multiple" className={cn("w-full", isCollapsed && "px-2")}>
              <ul className={cn("space-y-1", isCollapsed ? "px-0" : "px-2")}>
                 <NavItem href="/dashboard" icon={UserCircle} label={isCollapsed ? "" : "Área do estudante"} />
                 
                  <NavAccordionItem icon={Archive} label={isCollapsed ? "" : "Estações"} value="checklists">
                    <NavItem href="/estacoes/inep" icon={BookMarked} label="INEP Provas anteriores" isSubItem />
                    <NavItem href="/checklists/pense" icon={ClipboardCheck} label="REVALIDA FÁCIL" isSubItem />
                  </NavAccordionItem>
                  <NavItem href="/simulados" icon={Laptop} label={isCollapsed ? "" : "Simulados"} />
                  
                  <NavItem href="/performance" icon={TrendingUp} label={isCollapsed ? "" : "Meus Desempenhos"} />
                  <NavItem href="/materiais-apoio" icon={Library} label={isCollapsed ? "" : "Materiais de apoio"} />
                  <NavItem href="/modelos-checklists" icon={FilePlus2} label={isCollapsed ? "" : "Modelo de Checklists"} />
                  <NavAccordionItem icon={Clock} label={isCollapsed ? "" : "Histórico"} value="history">
                    <NavItem href="/history/checklist" icon={History} label="Checklist" isSubItem />
                  </NavAccordionItem>
              </ul>
            </Accordion>
           </nav>
        </ScrollArea>
        <div className="p-4 border-t border-border mt-auto">
          <Button variant="ghost" onClick={toggleTheme} className={cn("w-full justify-start", isCollapsed && "justify-center")}>
            {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            {!isCollapsed && <span className="ml-2">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>}
          </Button>
        </div>
      </aside>

      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-card shadow-md">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-card">
          <SidebarNavContent />
           <div className="p-4 border-t border-border mt-auto absolute bottom-0 w-full">
            <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start">
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
              <span className="ml-2">{theme === "light" ? "Dark Mode" : "Light Mode"}</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
