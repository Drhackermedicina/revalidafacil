// Localização: src/app/dashboard/layout.tsx
// 'use client'; // Adicione se houver interatividade no cliente

import { SidebarNav } from '@/components/layout/sidebar-nav'; // <-- Verifique o alias se necessário

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen">
      <SidebarNav />
      <main className="flex-1 p-6 overflow-auto">
        {children}
      </main>
    </div>
  );
} // <-- Apenas uma chave fechando a função aqui