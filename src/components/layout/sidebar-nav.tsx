
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BookMarked,
  Clock,
  History,
  ChevronsLeft,
  ChevronsRight,
  Menu as MenuIcon,
  ClipboardCheck,
  FilePlus2,
  Library,
  UserCircle,
  Laptop,
  TrendingUp,
  MessageCircleQuestion,
  Trophy,
  Youtube,
  Settings,
  MessagesSquare, // Ícone para Chatplay
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { useAuth } from "@/context/AuthContext";

const ADMIN_EMAIL = 'hellitoncechinel1@gmail.com';

interface NavItemProps {
  href: string;
  icon: React.ElementType;
  label: string;
  isSubItem?: boolean;
  isCollapsed?: boolean;
  target?: string;
  rel?: string;
  iconClassName?: string;
  labelClassName?: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, icon: Icon, label, isSubItem, isCollapsed, target, rel, iconClassName, labelClassName }) => {
  const linkProps = target ? { target, rel } : {};
  return (
    <li>
      <Link href={href} passHref legacyBehavior>
        <a
          {...linkProps}
          className={cn(
            "flex items-center w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm font-medium rounded-md",
            isCollapsed
              ? (isSubItem ? "pl-6 justify-start h-9" : "px-0 justify-center h-9 w-9 mx-auto")
              : (isSubItem ? "pl-10 pr-6 py-2 h-9" : "px-6 py-2 h-9"),
            labelClassName
          )}
          title={isCollapsed && !isSubItem ? label : undefined}
        >
          <Icon className={cn("mr-2 h-5 w-5", isCollapsed && !isSubItem && "mr-0", iconClassName)} />
          {(!isCollapsed || (isSubItem && isCollapsed)) && label}
        </a>
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
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground hover:no-underline rounded-md text-sidebar-foreground text-sm font-medium h-9",
        "data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground data-[state=open]:font-semibold",
        isCollapsed ? "px-2 justify-center w-9 mx-auto" : "px-6 py-2",
        "w-full"
        )}
        title={isCollapsed ? label : undefined}
        hideChevron={isCollapsed}
        >
        <div className={cn("flex items-center flex-1", isCollapsed && "w-full justify-center")}>
          <Icon className={cn("mr-2 h-5 w-5", isCollapsed && "mr-0")} />
          {!isCollapsed && label}
        </div>
      </AccordionTrigger>
      {!isCollapsed && (
        <AccordionContent className="pb-0">
          <ul className="space-y-1 pt-1">{children}</ul>
        </AccordionContent>
      )}
    </AccordionItem>
  );
};

const SidebarNavContent: React.FC<{isCollapsed?: boolean; isAdmin?: boolean}> = ({ isCollapsed = false, isAdmin = false }) => {
  const pathname = usePathname();
  const getOpenAccordionValue = () => {
    if (pathname.startsWith("/estacoes") || pathname.startsWith("/checklists")) return "checklists";
    if (pathname.startsWith("/history")) return "history";
    if (isAdmin && pathname.startsWith("/admin")) return "admin";
    return undefined;
  };

  return (
  <>
    <div className={cn(
        "p-4 border-b border-sidebar-border flex items-center gap-2 group",
        isCollapsed ? "justify-center" : "justify-between"
    )}>
      <div className="flex items-center gap-2 cursor-default">
        <Logo
            width={isCollapsed ? 28 : 32}
            height={isCollapsed ? 28 : 32}
            className={cn(
              "transition-colors duration-200 ease-in-out",
               "text-accent dark:text-sidebar-foreground",
              isCollapsed ? "h-7 w-7" : "h-8 w-8"
            )}
        />
        {!isCollapsed && (
            <span className={cn(
              "font-semibold text-lg transition-colors duration-200 ease-in-out",
              "text-accent dark:text-sidebar-foreground"
            )}>
              Revalida Fácil
            </span>
        )}
      </div>
    </div>
    <ScrollArea className="flex-grow">
      <nav className="py-2">
        <Accordion type="multiple" defaultValue={getOpenAccordionValue()} className={cn("w-full", isCollapsed && "px-0")}>
          <ul className={cn("space-y-1", isCollapsed ? "px-1" : "px-2")}>
            <NavItem
                href="/chatplay"
                icon={MessagesSquare}
                label="Chatplay"
                isCollapsed={isCollapsed}
                iconClassName={cn("h-7 w-7", isCollapsed ? "text-primary" : "text-primary dark:text-blue-400")}
                labelClassName={cn(isCollapsed ? "" : "py-3 text-base font-semibold", isCollapsed ? "" : "text-primary dark:text-blue-400")}
            />
            <NavAccordionItem icon={Archive} label={"Estações"} value="checklists" isCollapsed={isCollapsed}>
              <NavItem href="/estacoes/inep" icon={BookMarked} label="INEP Provas anteriores" isSubItem isCollapsed={isCollapsed}/>
              <NavItem href="/checklists/pense" icon={ClipboardCheck} label="REVALIDA FÁCIL" isSubItem isCollapsed={isCollapsed}/>
            </NavAccordionItem>

            <NavAccordionItem icon={Clock} label={"Histórico"} value="history" isCollapsed={isCollapsed}>
              <NavItem href="/history/checklist" icon={History} label="Checklist" isSubItem isCollapsed={isCollapsed}/>
            </NavAccordionItem>

            <NavItem href="/dashboard" icon={UserCircle} label={"Área do Estudante"} isCollapsed={isCollapsed} />
            <NavItem href="/simulados" icon={Laptop} label={"Simulados"} isCollapsed={isCollapsed} />
            <NavItem href="/performance" icon={TrendingUp} label={"Performance"} isCollapsed={isCollapsed} />
            <NavItem href="/materiais-apoio" icon={Library} label={"Materiais de Apoio"} isCollapsed={isCollapsed}/>
            <NavItem href="/banco-questoes" icon={MessageCircleQuestion} label={"Banco de Questões"} isCollapsed={isCollapsed}/>
            <NavItem
              href="https://www.youtube.com/"
              icon={Youtube}
              label={"Video Aulas"}
              isCollapsed={isCollapsed}
              target="_blank"
              rel="noopener noreferrer"
            />
            <NavItem href="/modelos-checklists" icon={FilePlus2} label={"Modelo de Checklists"} isCollapsed={isCollapsed} />
            <NavItem href="/ranking" icon={Trophy} label={"Ranking"} isCollapsed={isCollapsed} />
            {isAdmin && (
              <NavAccordionItem icon={Settings} label={"Admin"} value="admin" isCollapsed={isCollapsed}>
                  <NavItem href="/admin/station-editor" icon={FilePlus2} label="Editor de Estações" isSubItem isCollapsed={isCollapsed}/>
              </NavAccordionItem>
            )}
          </ul>
        </Accordion>
      </nav>
    </ScrollArea>
  </>
  );
};


export function SidebarNav() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const { user, isLoading: isAuthLoading } = useAuth();

  const isAdmin = React.useMemo(() => {
    if (isAuthLoading || !user || !user.email) return false;
    return user.email === ADMIN_EMAIL;
  }, [user, isAuthLoading]);


  const getOpenAccordionValue = () => {
    if (pathname.startsWith("/estacoes") || pathname.startsWith("/checklists")) return "checklists";
    if (pathname.startsWith("/history")) return "history";
    if (isAdmin && pathname.startsWith("/admin")) return "admin";
    return undefined;
  };

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

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
              <div className="flex justify-center w-full py-1 cursor-default">
                <Logo
                  width={28}
                  height={28}
                  className="h-7 w-7 text-accent dark:text-green-400"
                />
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 w-8">
                <ChevronsRight className="h-5 w-5" />
              </Button>
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 group cursor-default">
                <Logo
                  width={32}
                  height={32}
                  className="h-8 w-8 text-accent dark:text-green-400 transition-colors duration-200 ease-in-out"
                />
                <span className={cn(
                  "font-semibold text-lg transition-colors duration-200 ease-in-out",
                  "text-accent dark:text-green-400"
                )}>
                  Revalida Fácil
                </span>
              </div>
              <Button variant="ghost" size="icon" onClick={toggleSidebar} className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground h-8 w-8">
                <ChevronsLeft className="h-5 w-5" />
              </Button>
            </>
          )}
        </div>
        <ScrollArea className="flex-grow">
           <nav className="py-2">
            <Accordion type="multiple" defaultValue={getOpenAccordionValue()} className={cn("w-full", isCollapsed && "px-0")}>
              <ul className={cn("space-y-1", isCollapsed ? "px-1" : "px-2")}>
                  <NavItem
                    href="/chatplay"
                    icon={MessagesSquare}
                    label="Chatplay"
                    isCollapsed={isCollapsed}
                    iconClassName={cn("h-7 w-7", isCollapsed ? "text-primary" : "text-primary dark:text-blue-400")}
                    labelClassName={cn(isCollapsed ? "" : "py-3 text-base font-semibold", isCollapsed ? "" : "text-primary dark:text-blue-400")}
                  />
                  <NavAccordionItem icon={Archive} label={"Estações"} value="checklists" isCollapsed={isCollapsed}>
                    <NavItem href="/estacoes/inep" icon={BookMarked} label="INEP Provas anteriores" isSubItem isCollapsed={isCollapsed} />
                    <NavItem href="/checklists/pense" icon={ClipboardCheck} label="REVALIDA FÁCIL" isSubItem isCollapsed={isCollapsed} />
                  </NavAccordionItem>

                  <NavAccordionItem icon={Clock} label={"Histórico"} value="history" isCollapsed={isCollapsed}>
                    <NavItem href="/history/checklist" icon={History} label="Checklist" isSubItem isCollapsed={isCollapsed} />
                  </NavAccordionItem>

                  <NavItem href="/dashboard" icon={UserCircle} label={"Área do Estudante"} isCollapsed={isCollapsed} />
                  <NavItem href="/simulados" icon={Laptop} label={"Simulados"} isCollapsed={isCollapsed} />
                  <NavItem href="/performance" icon={TrendingUp} label={"Performance"} isCollapsed={isCollapsed} />
                  <NavItem href="/materiais-apoio" icon={Library} label={"Materiais de Apoio"} isCollapsed={isCollapsed} />
                  <NavItem href="/banco-questoes" icon={MessageCircleQuestion} label={"Banco de Questões"} isCollapsed={isCollapsed}/>
                  <NavItem
                    href="https://www.youtube.com/"
                    icon={Youtube}
                    label={"Video Aulas"}
                    isCollapsed={isCollapsed}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                  <NavItem href="/modelos-checklists" icon={FilePlus2} label={"Modelo de Checklists"} isCollapsed={isCollapsed} />
                  <NavItem href="/ranking" icon={Trophy} label={"Ranking"} isCollapsed={isCollapsed} />
                  {isAdmin && (
                    <NavAccordionItem icon={Settings} label={"Admin"} value="admin" isCollapsed={isCollapsed}>
                       <NavItem href="/admin/station-editor" icon={FilePlus2} label="Editor de Estações" isSubItem isCollapsed={isCollapsed}/>
                    </NavAccordionItem>
                  )}
              </ul>
            </Accordion>
           </nav>
        </ScrollArea>
      </aside>

      {/* Mobile Sidebar Trigger */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="md:hidden fixed top-4 left-4 z-50 bg-card shadow-md">
            <MenuIcon className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72 bg-sidebar text-sidebar-foreground border-r-0 flex flex-col">
          <div className="flex-grow">
            <SidebarNavContent isCollapsed={false} isAdmin={isAdmin} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
    

    

    