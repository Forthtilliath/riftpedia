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
    // Le layout ne dépasse jamais 1200px (voir Layout.module.scss) : inutile
    // de générer des variantes plus larges (1920/2048/3840 par défaut), qui
    // ne sont jamais servies mais comptent quand même dans le quota Vercel.
    deviceSizes: [640, 750, 828, 1080, 1200],
    // Les images viennent de Data Dragon avec la version du patch dans
    // l'URL : le contenu d'une URL donnée ne change jamais. On peut donc
    // mettre un TTL très long sans risque de servir une image obsolète.
    // L'ancienne valeur (60s, héritée d'un défaut Next < 16) faisait
    // retransformer les mêmes images en boucle et a fait exploser le quota
    // Vercel (Transformations + Cache Writes).
    minimumCacheTTL: 31536000, // 1 an
  },
};

export default withNextIntl(nextConfig);
