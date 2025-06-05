
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BookMarked,
  History, 
  Clock,
  LightbulbOff,
  Lightbulb,
  ChevronsLeft,
  ChevronsRight,
  Menu as MenuIcon,
  ClipboardCheck,
  FilePlus2,
  Library,
  UserCircle,
  Laptop,
  TrendingUp,
  FileQuestion,
  Trophy,
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
  isCollapsed?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isSubItem, isCollapsed }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li>
      <Link href={href} passHref>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
            isSubItem ? "pl-10" : "pl-6",
            isActive && "bg-sidebar-accent text-sidebar-accent-foreground font-semibold hover:bg-sidebar-accent/90",
            isCollapsed && !isSubItem && "px-0 justify-center",
            isCollapsed && isSubItem && "pl-6" 
          )}
          title={isCollapsed ? label : undefined}
        >
          <Icon className={cn("mr-2 h-5 w-5", isCollapsed && !isSubItem && "mr-0")} />
          {(!isCollapsed || isSubItem) && label}
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
  isCollapsed?: boolean;
}> = ({ icon: Icon, label, children, value, isCollapsed }) => {
  return (
    <AccordionItem value={value} className="border-none">
      <AccordionTrigger className={cn(
        "py-2 px-6 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline rounded-md text-sidebar-foreground", // Alterado aqui
        "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=open]:font-semibold", // Adicionado/Confirmado
        isCollapsed && "px-2 justify-center"
        )}
        title={isCollapsed ? label : undefined}
        hideChevron={isCollapsed}
        >
        <div className={cn("flex items-center", isCollapsed && "w-full justify-center")}>
          <Icon className={cn("mr-2 h-5 w-5", isCollapsed && "mr-0")} />
          {!isCollapsed && label}
        </div>
      </AccordionTrigger>
      {!isCollapsed && (
        <AccordionContent className="pb-0">
          <ul className="space-y-1">{children}</ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

const SidebarNavContent: React.FC<{isCollapsed?: boolean}> = ({ isCollapsed = false}) => (
  <>
    <div className={cn(
        "p-4 border-b border-sidebar-border flex items-center gap-2", 
        isCollapsed ? "justify-center" : "justify-start"
    )}>
      <Link href="/" className="flex items-center gap-2 group">
        <Logo 
            width={isCollapsed ? 28 : 32} 
            height={isCollapsed ? 28 : 32} 
            className={cn("text-sidebar-foreground transition-colors duration-200 ease-in-out", isCollapsed ? "h-7 w-7" : "h-8 w-8")} 
        />
        {!isCollapsed && (
            <span className="font-semibold text-lg text-sidebar-foreground group-hover:text-sidebar-accent transition-colors duration-200 ease-in-out">
              Revalida Fácil
            </span>
        )}
      </Link>
    </div>
    <ScrollArea className="flex-grow">
      <nav className="py-4">
        <Accordion type="multiple" className={cn("w-full", isCollapsed && "px-1")}>
          <ul className={cn("space-y-1", isCollapsed ? "px-0" : "px-2")}>
            <NavItem href="/dashboard" icon={UserCircle} label={"Área do estudante"} isCollapsed={isCollapsed} />
            
            <NavAccordionItem icon={Archive} label={"Estações"} value="checklists" isCollapsed={isCollapsed}>
              <NavItem href="/estacoes/inep" icon={BookMarked} label="INEP Provas anteriores" isSubItem isCollapsed={isCollapsed}/>
              <NavItem href="/checklists/pense" icon={ClipboardCheck} label="REVALIDA FÁCIL" isSubItem isCollapsed={isCollapsed}/>
            </NavAccordionItem>
            
            <NavAccordionItem icon={Clock} label={"Histórico"} value="history" isCollapsed={isCollapsed}>
              <NavItem href="/history/checklist" icon={History} label="Checklist" isSubItem isCollapsed={isCollapsed}/>
            </NavAccordionItem>

            <NavItem href="/simulados" icon={Laptop} label={"Simulados"} isCollapsed={isCollapsed} />
            <NavItem href="/performance" icon={TrendingUp} label={"Meus Desempenhos"} isCollapsed={isCollapsed} />
            <NavItem href="/materiais-apoio" icon={Library} label={"Materiais de apoio"} isCollapsed={isCollapsed}/>
            <NavItem href="/banco-questoes" icon={FileQuestion} label={"Banco de Questões"} isCollapsed={isCollapsed}/>
            <NavItem href="/modelos-checklists" icon={FilePlus2} label={"Modelo de Checklists"} isCollapsed={isCollapsed} />
            <NavItem href="/ranking" icon={Trophy} label={"Ranking"} isCollapsed={isCollapsed} />
          </ul>
        </Accordion>
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
          "hidden md:flex flex-col h-screen border-r border-sidebar-border transition-all duration-300 ease-in-out bg-sidebar text-sidebar-foreground",
          isCollapsed ? "w-16" : "w-64"
        )}
      >
        <div className={cn(
          "p-3 border-b border-sidebar-border flex items-center",
          isCollapsed ? "flex-col gap-2 py-2.5" : "justify-between"
        )}>
          {isCollapsed ? (
            <>
              <Link href="/" className="flex justify-center w-full">
                <Logo 
                  width={28} 
                  height={28} 
                  className="h-7 w-7 text-sidebar-foreground"
                />
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <ChevronsRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <Link href="/" className="flex items-center gap-2 group">
                <Logo 
                  width={32} 
                  height={32} 
                  className="h-8 w-8 text-sidebar-foreground transition-colors duration-200 ease-in-out"
                />
                <span className="font-semibold text-lg text-sidebar-foreground group-hover:text-sidebar-accent transition-colors duration-200 ease-in-out">
                  Revalida Fácil
                </span>
              </Link>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <ChevronsLeft className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        <ScrollArea className="flex-grow">
           <nav className="py-2">
            <Accordion type="multiple" className={cn("w-full", isCollapsed && "px-1")}>
              <ul className={cn("space-y-1", isCollapsed ? "px-0" : "px-2")}>
                 <NavItem href="/dashboard" icon={UserCircle} label={"Área do estudante"} isCollapsed={isCollapsed} />
                 
                  <NavAccordionItem icon={Archive} label={"Estações"} value="checklists" isCollapsed={isCollapsed}>
                    <NavItem href="/estacoes/inep" icon={BookMarked} label="INEP Provas anteriores" isSubItem isCollapsed={isCollapsed} />
                    <NavItem href="/checklists/pense" icon={ClipboardCheck} label="REVALIDA FÁCIL" isSubItem isCollapsed={isCollapsed} />
                  </NavAccordionItem>

                  <NavAccordionItem icon={Clock} label={"Histórico"} value="history" isCollapsed={isCollapsed}>
                    <NavItem href="/history/checklist" icon={History} label="Checklist" isSubItem isCollapsed={isCollapsed} />
                  </NavAccordionItem>

                  <NavItem href="/simulados" icon={Laptop} label={"Simulados"} isCollapsed={isCollapsed} />
                  <NavItem href="/performance" icon={TrendingUp} label={"Meus Desempenhos"} isCollapsed={isCollapsed} />
                  <NavItem href="/materiais-apoio" icon={Library} label={"Materiais de apoio"} isCollapsed={isCollapsed} />
                  <NavItem href="/banco-questoes" icon={FileQuestion} label={"Banco de Questões"} isCollapsed={isCollapsed}/>
                  <NavItem href="/modelos-checklists" icon={FilePlus2} label={"Modelo de Checklists"} isCollapsed={isCollapsed} />
                  <NavItem href="/ranking" icon={Trophy} label={"Ranking"} isCollapsed={isCollapsed} />
              </ul>
            </Accordion>
           </nav>
        </ScrollArea>
        <div className="p-4 border-t border-sidebar-border mt-auto">
          <Button variant="ghost" onClick={toggleTheme} className={cn("w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground", isCollapsed && "justify-center")}>
            {theme === "light" ? <LightbulbOff className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
            {!isCollapsed && <span className="ml-2">{theme === "light" ? "Modo Noite" : "Modo Dia"}</span>}
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
        <SheetContent side="left" className="p-0 w-72 bg-sidebar text-sidebar-foreground border-r-0">
          <SidebarNavContent isCollapsed={false} /> {/* Always expanded in mobile sheet */}
           <div className="p-4 border-t border-sidebar-border mt-auto absolute bottom-0 w-full">
            <Button variant="ghost" onClick={toggleTheme} className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
              {theme === "light" ? <LightbulbOff className="h-5 w-5" /> : <Lightbulb className="h-5 w-5" />}
              <span className="ml-2">{theme === "light" ? "Modo Noite" : "Modo Dia"}</span>
            </Button>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

    