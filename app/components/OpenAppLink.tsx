"use client";

import { useEffect, useState } from "react";

interface Props {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function OpenAppLink({ className, style, children }: Props) {
  const [href, setHref] = useState("https://app.taxibe.mg");

  useEffect(() => {
    const isMobile = /android|iphone|ipad|ipod|mobile/i.test(navigator.userAgent);
    if (!isMobile) {
      setHref("/ouvrir-sur-mobile");
    }
  }, []);

  return (
    <a href={href} className={className} style={style}>
      {children}
    </a>
  );
}
