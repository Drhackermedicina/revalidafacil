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
  // NOVO: Adicionado para corrigir o aviso de 'cross-origin' no seu ambiente de nuvem,
  allowedDevOrigins: [
    'local-origin.dev', // Exemplo de origem local, pode ser removido se não usado
    '*.local-origin.dev', // Exemplo de padrão para subdomínios locais, pode ser removido se não usado
    '3000-firebase-studio-1749389259812.cluster-kc2r6y3mtba5mswcmol45orivs.cloudworkstations.dev', // Origem específica do seu ambiente
    '*.cluster-kc2r6y3mtba5mswcmol444444orivs.cloudworkstations.dev',
  ] // Vírgula removida aqui
};

export default nextConfig;
