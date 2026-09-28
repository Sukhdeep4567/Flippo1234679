import { ImageResponse } from "next/og";
import { hero, site } from "@/content/site";

export const alt = site.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const words = hero.titleWords;
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#FAFAF8",
        color: "#111111",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div style={{ display: "flex", position: "relative", width: 64, height: 40 }}>
          <div
            style={{
              position: "absolute",
              left: 0,
              width: 40,
              height: 40,
              borderRadius: 40,
              background: "#5B3FE0",
            }}
          />
          <div
            style={{
              position: "absolute",
              left: 24,
              width: 40,
              height: 40,
              borderRadius: 40,
              background: "rgba(142,116,255,0.75)",
            }}
          />
        </div>
        <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: 8 }}>FLIPO</div>
      </div>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          fontSize: 92,
          fontWeight: 700,
          lineHeight: 1.05,
          letterSpacing: -2,
          maxWidth: 980,
        }}
      >
        {words.map((w, i) => {
          const em = w.startsWith("*");
          return (
            <span
              key={i}
              style={{
                marginRight: 24,
                color: em ? "#5B3FE0" : "#111111",
                fontStyle: em ? "italic" : "normal",
              }}
            >
              {w.replace(/\*/g, "")}
            </span>
          );
        })}
      </div>

      <div style={{ display: "flex", fontSize: 30, color: "#6B6B6B" }}>{hero.subline}</div>
    </div>,
    size,
  );
}
