import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/actualites", destination: "/blog", permanent: true },
      { source: "/actualites/:path*", destination: "/blog/:path*", permanent: true },
      { source: "/conditions", destination: "/legal", permanent: true },
      { source: "/mentions-legales", destination: "/legal", permanent: true },
      { source: "/guide", destination: "/aide", permanent: true },
      { source: "/conseils", destination: "/aide", permanent: true },
      { source: "/faq", destination: "/aide", permanent: true },
      { source: "/contribuer", destination: "/communaute", permanent: true },
      { source: "/signaler", destination: "/communaute", permanent: true },
      { source: "/partenaires", destination: "/entreprises", permanent: true },
      { source: "/publicite", destination: "/entreprises", permanent: true },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sorucqpaytrhmthxeuhx.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
};

export default nextConfig;
