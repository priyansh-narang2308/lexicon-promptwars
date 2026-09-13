"use client";

import React, { useEffect, useState } from "react";
import Globe from "./globe";

const ACCENT = "#00A1DB";
const DOTS_CONFIG = { color: ACCENT, size: 5, density: 8, allDots: false } as const;
const GLOBE_STYLE: React.CSSProperties = { width: "100%", height: "100%" };

export const MediaGlobe = ({ query }: { query: string }) => {
  const [matches, setMatches] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia(query).matches;
    }
    return true;
  });

  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, [query]);

  if (!matches) return null;

  return (
    <Globe
      scale={9.7}
      stopOnHover
      initialLatitude={23}
      initialLongitude={-23}
      fill="dots"
      dots={DOTS_CONFIG}
      showOutline
      outlineColor={ACCENT}
      showGrid
      graticuleColor={ACCENT}
      oceanColor="#101216"
      style={GLOBE_STYLE}
    />
  );
};
