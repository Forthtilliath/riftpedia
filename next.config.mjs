import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.communitydragon.org',
        port: '',
        pathname: '**',
      },
    ],
    // Les images viennent de Data Dragon / CommunityDragon, des CDN qui
    // servent déjà des fichiers légers. La version du patch fait partie de
    // l'URL : à chaque patch, toutes les images étaient retransformées par
    // Vercel et épuisaient le quota (Transformations + Cache Writes).
    // On les sert donc telles quelles, sans passer par l'optimiseur.
    unoptimized: true,
  },
};

export default withNextIntl(nextConfig);
