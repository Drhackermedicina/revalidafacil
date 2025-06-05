
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ListChecks,
  Layers,
  BookOpen,
  BarChart3,
  History,
  Moon,
  Sun,
  ChevronsLeft,
  ChevronsRight,
  Menu as MenuIcon,
  FileCheck,
  GraduationCap, // Adicionado GraduationCap
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
    <div className="p-4 border-b border-border flex items-center gap-2">
      <Link href="/" className="flex items-center gap-2">
        <Logo width={32} height={32} className="h-8 w-8 rounded-md" />
        <h1 className="text-xl font-bold font-headline text-primary">Revalida Fácil</h1>
      </Link>
    </div>
    <ScrollArea className="flex-grow">
      <nav className="py-4">
        <ul className="space-y-1 px-2">
          <NavItem href="/dashboard" icon={GraduationCap} label="Área do estudante" />
          <li className="px-4 pt-4 pb-2">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Checklist
            </span>
          </li>
          <NavAccordionItem icon={ListChecks} label="Estações" value="checklists">
            <NavItem href="/estacoes/inep" icon={BookOpen} label="INEP Provas anteriores" isSubItem />
            <NavItem href="/checklists/pense" icon={FileCheck} label="REVALIDA FÁCIL" isSubItem />
          </NavAccordionItem>
          <NavItem href="/simulados" icon={ListChecks} label="Simulados" />

          <li className="px-4 pt-4 pb-2">
            <span className="text-xs font-medium uppercase text-muted-foreground">
              Desempenho
            </span>
          </li>
          <NavItem href="/performance" icon={BarChart3} label="Meus Desempenhos" />
          <NavAccordionItem icon={History} label="Histórico" value="history">
            <NavItem href="/history/checklist" icon={ListChecks} label="Checklist" isSubItem />
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
        <div className="p-3 border-b border-border flex items-center justify-between">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-2">
              <Logo width={32} height={32} className="h-8 w-8 rounded-md"/>
              <h1 className="text-lg font-bold font-headline text-primary">Revalida Fácil</h1>
            </Link>
          )}
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className={cn(isCollapsed && "mx-auto")}>
            {isCollapsed ? <ChevronsRight className="h-5 w-5" /> : <ChevronsLeft className="h-5 w-5" />}
          </Button>
        </div>
        <ScrollArea className="flex-grow">
           <nav className="py-2">
            <Accordion type="multiple" className={cn("w-full", isCollapsed && "px-2")}>
              <ul className={cn("space-y-1", isCollapsed ? "px-0" : "px-2")}>
                 <NavItem href="/dashboard" icon={GraduationCap} label={isCollapsed ? "" : "Área do estudante"} />
                 {!isCollapsed && <li className="px-4 pt-2 pb-1">
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      Checklist
                    </span>
                  </li>}
                  <NavAccordionItem icon={ListChecks} label={isCollapsed ? "" : "Estações"} value="checklists">
                    <NavItem href="/estacoes/inep" icon={BookOpen} label="INEP Provas anteriores" isSubItem />
                    <NavItem href="/checklists/pense" icon={FileCheck} label="REVALIDA FÁCIL" isSubItem />
                  </NavAccordionItem>
                  <NavItem href="/simulados" icon={ListChecks} label={isCollapsed ? "" : "Simulados"} />
                  
                  {!isCollapsed && <li className="px-4 pt-2 pb-1">
                    <span className="text-xs font-medium uppercase text-muted-foreground">
                      Desempenho
                    </span>
                  </li>}
                  <NavItem href="/performance" icon={BarChart3} label={isCollapsed ? "" : "Meus Desempenhos"} />
                  <NavAccordionItem icon={History} label={isCollapsed ? "" : "Histórico"} value="history">
                    <NavItem href="/history/checklist" icon={ListChecks} label="Checklist" isSubItem />
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
