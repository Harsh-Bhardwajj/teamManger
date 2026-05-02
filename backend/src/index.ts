import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import express from "express"; // Express yahan import karein
import cors from "cors";

// Path setup
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.resolve(__dirname, "..", "..", ".env") });

const rawPort = process.env["PORT"];
if (!rawPort) {
  throw new Error("PORT environment variable is required.");
}
const port = Number(rawPort);

async function start(): Promise<void> {
  // Yahan humne imports ko fix kiya aur .js extensions lagaye
  const [{ logger }, { connectDB }] = await Promise.all([
    import("./lib/logger.js"),
    import("@workspace/db"),
  ]);

  const app = express();
  app.use(cors());
  app.use(express.json());

  // Test Route
  app.get("/health", (req, res) => {
    res.json({ status: "ok" });
  });

  try {
    await connectDB();
    logger.info("Connected to MongoDB");

    app.listen(port, () => {
      logger.info({ port }, "Server listening");
    });
  } catch (err) {
    logger.error({ err }, "Failed to connect to MongoDB");
    process.exit(1);
  }
}

void start();
