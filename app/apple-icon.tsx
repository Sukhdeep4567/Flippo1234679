import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAFAF8",
      }}
    >
      <div style={{ display: "flex", position: "relative", width: 120, height: 76 }}>
        <div
          style={{
            position: "absolute",
            left: 0,
            width: 76,
            height: 76,
            borderRadius: 76,
            background: "#5B3FE0",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 44,
            width: 76,
            height: 76,
            borderRadius: 76,
            background: "rgba(142,116,255,0.75)",
          }}
        />
      </div>
    </div>,
    size,
  );
}
