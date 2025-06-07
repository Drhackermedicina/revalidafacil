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
  // NOVO: Adicionado para corrigir o aviso de 'cross-origin' no seu ambiente de nuvem
  experimental: {
    allowedDevOrigins: [
    ],
  },
};

export default nextConfig;