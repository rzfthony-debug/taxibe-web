import type { NextConfig } from "next";

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://vercel.live https://*.vercel-scripts.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src * data: blob:",
      "connect-src 'self' *.supabase.co https://vitals.vercel-analytics.com https://vercel.live",
      "frame-src https://www.google.com/maps https://maps.google.com https://www.youtube.com https://www.youtube-nocookie.com https://player.vimeo.com",
      "media-src 'self' https: blob:",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "base-uri 'self'",
    ].join("; "),
  },
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
