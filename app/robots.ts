import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/gestion/", "/api/"],
      },
    ],
    sitemap: "https://taxibemada.vercel.app/sitemap.xml",
  };
}
