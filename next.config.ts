
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* Suas configurações existentes */
  typescript: {
    // AVISO: Isso permite que a build seja gerada mesmo com erros de TypeScript.
    // Recomenda-se remover no futuro e corrigir os erros.
    ignoreBuildErrors: true,
  },
  eslint: {
    // AVISO: Isso ignora erros de ESLint durante a build.
    // Recomenda-se remover no futuro.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
      },
      {
        protocol: 'https',
        hostname: 'app.penserevalida.com',
      },
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      // NOVO: Adicionado para permitir imagens de perfil de contas Google
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },
  // ATUALIZADO: Ajustado para refletir a URL observada nos logs e remover entradas não utilizadas.
  allowedDevOrigins: [
    '3000-firebase-studio-1749389259812.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev', // Mantendo a de porta 3000 por precaução
    '6000-firebase-studio-1749389259812.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev', // Adicionada a de porta 6000
  ]
};

export default nextConfig;
