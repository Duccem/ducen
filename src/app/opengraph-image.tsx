import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#0c0c0c",
        color: "#f2f0ec",
        fontFamily: "Inter, system-ui, sans-serif",
        overflow: "hidden",
        padding: "56px 0 0 56px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div style={{ fontSize: 34, fontWeight: 500 }}>José Manuel Véliz</div>
        <div style={{ fontSize: 30, color: "#a6a39d", maxWidth: 760 }}>
          Freelance full stack engineer · Web, SaaS & AI agents
        </div>
      </div>
      <div
        style={{
          fontSize: 400,
          fontWeight: 700,
          letterSpacing: -24,
          lineHeight: 0.8,
          marginBottom: -60,
          marginLeft: -24,
        }}
      >
        Véliz
      </div>
    </div>,
    size,
  );
}
