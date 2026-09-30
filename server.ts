import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Server-side proxy route for cricketdata.org currentMatches
  app.get("/api/current-matches", async (_req, res) => {
    const apiKey =
      process.env.CRICKETDATA_API_KEY ||
      process.env.CRICAPI_KEY ||
      "4368edd4-c44d-42fa-xxxx";

    try {
      const response = await fetch(
        `https://api.cricapi.com/v1/currentMatches?apikey=${encodeURIComponent(
          apiKey
        )}&offset=0`
      );
      if (!response.ok) {
        return res.json({
          status: "failure",
          reason: `HTTP ${response.status}`,
          fallback: true,
        });
      }

      const data = await response.json();

      // Check if cricketdata.org returned a failure or hits exceeded
      if (
        !data ||
        data.status !== "success" ||
        !Array.isArray(data.data) ||
        data.data.length === 0
      ) {
        return res.json({
          status: "failure",
          reason: data?.reason || "API hits finished or no active matches",
          info: data?.info || null,
          fallback: true,
        });
      }

      return res.json({
        status: "success",
        data: data.data,
        info: data.info || null,
        fallback: false,
      });
    } catch (error) {
      return res.json({
        status: "failure",
        reason: error instanceof Error ? error.message : "Network error",
        fallback: true,
      });
    }
  });

  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(__dirname, "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
