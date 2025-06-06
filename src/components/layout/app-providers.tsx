
"use client";

import type { ReactNode } from 'react';
import { ThemeProvider } from 'next-themes';
import { AuthProvider } from '@/context/AuthContext'; // Importar AuthProvider

interface AppProvidersProps {
  children: ReactNode;
}

export default function AppProviders({ children }: AppProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <AuthProvider> {/* Envolver children com AuthProvider */}
        {children}
      </AuthProvider>
    </ThemeProvider>
  );
}
