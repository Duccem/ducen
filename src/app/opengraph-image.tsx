import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ogText = "Jose Veliz | Software developer";
const [ogName, ogRole] = ogText.split("|").map((part) => part.trim());

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage:
          "linear-gradient(135deg, #ffffff 0%, #f3f3f3 55%, #e8e8e8 100%)",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 40,
          border: "2px solid #e1e1e1",
          borderRadius: 48,
        }}
      />
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 240,
          height: 240,
          backgroundColor: "#0f0f0f",
          borderRadius: 56,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 70,
          right: 140,
          width: 140,
          height: 140,
          backgroundColor: "#bdbdbd",
          borderRadius: 40,
        }}
      />
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: "96px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 18,
        }}
      >
        <div
          style={{
            width: 80,
            height: 6,
            backgroundColor: "#111111",
            borderRadius: 999,
          }}
        />
        <div
          style={{
            fontSize: 72,
            fontWeight: 600,
            color: "#111111",
            letterSpacing: -1.5,
            lineHeight: 1.05,
          }}
        >
          {ogName}
        </div>
        <div
          style={{
            fontSize: 34,
            fontWeight: 500,
            color: "#4a4a4a",
            lineHeight: 1.2,
          }}
        >
          {ogRole ?? "Software developer"}
        </div>
      </div>
    </div>,
    size,
  );
}

