import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { portfolio } from "./content";

export const alt = `${portfolio.name}. ${portfolio.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const avatar = await readFile(join(process.cwd(), "public/avatar.png"));
  const avatarSrc = `data:image/png;base64,${avatar.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: "#f5f2eb",
        color: "#14171c",
      }}
    >
      <div style={{ width: 14, background: "#1e3a8a" }} />
      <div
        style={{
          display: "flex",
          flex: 1,
          alignItems: "center",
          padding: "64px 72px",
          gap: 56,
        }}
      >
        <img
          src={avatarSrc}
          alt=""
          width={280}
          height={280}
          style={{
            borderRadius: 140,
            objectFit: "cover",
          }}
        />
        <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 4,
              color: "#1e3a8a",
              textTransform: "uppercase",
            }}
          >
            {portfolio.location}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: 76,
              lineHeight: 1.02,
              letterSpacing: -1.5,
            }}
          >
            {portfolio.name}
          </div>
          <div
            style={{
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.35,
              color: "#4a5160",
            }}
          >
            {portfolio.tagline}
          </div>
        </div>
      </div>
    </div>,
    { ...size },
  );
}
