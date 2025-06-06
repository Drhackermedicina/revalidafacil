// Localização: app/layout.tsx (O NOVO ARQUIVO QUE VOCÊ VAI CRIAR)

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css'; // Importa o CSS global

// Importe seus provedores globais aqui
import { AuthProvider } from '@/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Meu Revalida App',
  description: 'Sua plataforma de estudos para o Revalida',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // A estrutura HTML obrigatória fica aqui
    <html lang="pt-br" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AuthProvider>
            {children} {/* As páginas do seu site serão injetadas aqui */}
            <Toaster />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}