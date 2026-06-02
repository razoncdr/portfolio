import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";

/**
 * Generated Open Graph / Twitter card (1200×630), rendered at build time by next/og.
 * Next 16 auto-wires this into og:image AND twitter:image (resolved as absolute URLs
 * against metadataBase) — no static asset to maintain. Uses only the flexbox subset
 * next/og supports. The default system font keeps the build dependency-free.
 */
export const alt = `${profile.name} — ${profile.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const stats = profile.stats.slice(0, 3);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          backgroundColor: "#0f172a",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "#60a5fa",
            letterSpacing: "0.05em",
          }}
        >
          {profile.name.split(" ")[0].toLowerCase()}.dev
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 28,
            fontSize: 76,
            fontWeight: 700,
            color: "#f8fafc",
            lineHeight: 1.05,
          }}
        >
          {profile.name}
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 34,
            color: "#cbd5e1",
          }}
        >
          {profile.title}
        </div>

        <div style={{ display: "flex", gap: 16, marginTop: 56, flexWrap: "wrap" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                border: "1px solid #334155",
                borderRadius: 14,
                padding: "16px 22px",
              }}
            >
              <div style={{ display: "flex", fontSize: 20, color: "#94a3b8" }}>
                {stat.label}
              </div>
              <div
                style={{
                  display: "flex",
                  marginTop: 6,
                  fontSize: 26,
                  color: "#f1f5f9",
                  fontWeight: 600,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}
