import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  ...(process.env.NODE_ENV === "production"
    ? [{ key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" }]
    : []),
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
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
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 2678400,
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
