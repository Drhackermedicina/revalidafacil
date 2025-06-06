// Localização: src/app/dashboard/layout.tsx

import { SidebarNav } from '@/components/layout/sidebar-nav'; // <-- CORRIGIDO

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      {/* Usando o seu componente de menu lateral real */}
      <SidebarNav /> {/* <-- CORRIGIDO */}
      
      {/* O conteúdo principal da página da dashboard */}
      <main className="flex-1 p-6 overflow-auto">
        {children} {/* Aqui é onde a sua app/dashboard/page.tsx vai entrar */}
      </main>
    </div>
  );
}}