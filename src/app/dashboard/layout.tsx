// Localização: src/app/dashboard/layout.tsx

// Removida a importação de SidebarNav, pois AppLayout já a inclui.

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // AppLayout, usado pela DashboardPage (que é o children aqui),
  // já inclui a SidebarNav e HeaderNav.
  // Este layout pode simplesmente renderizar os children ou adicionar um wrapper específico
  // para o conteúdo do dashboard, se necessário, sem duplicar a navegação.
  return <>{children}</>;
}
