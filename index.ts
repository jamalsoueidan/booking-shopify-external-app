import { connection } from "database/connection";
import express, { Router } from "express";
import path from "path";
import assetsRouter from "./assets-router";
import dotenv from "dotenv";
import authenticationRoutes from "@libs/authentication/authentication.route";

dotenv.config();

const { PORT = 8000 } = process.env;

const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

connection();

export async function createServer(
  root = process.cwd(),
  isProd = process.env.NODE_ENV === "production"
) {
  const app = express();

  if (isProd) {
    const compression = await import("compression").then(
      ({ default: fn }) => fn
    );
    const serveStatic = await import("serve-static").then(
      ({ default: fn }) => fn
    );
    app.use(compression());
    app.use(serveStatic(PROD_INDEX_PATH, { index: false }));
  } else {
    app.use("/", assetsRouter);
  }

  // All endpoints after this point will have access to a request.body
  // attribute, as a result of the express.json() middleware
  app.use(express.json({ limit: "1mb", extended: true } as any));

  app.use("/api", authenticationRoutes);

  // All endpoints after this point will require an active session
  /*app.use(
    "/api/*",
    verifyRequest(app)
  );*/

  app.get("/*", (_req, res) => {
    const htmlFile = path.join(
      isProd ? PROD_INDEX_PATH + "index.html" : DEV_INDEX_PATH + "dev.html"
    );

    res.sendFile(htmlFile);
  });

  return { app };
}

createServer().then(({ app }) =>
  app.listen(PORT, () => {
    console.log();
    console.log(`  App running in port ${PORT}`);
    console.log();
    console.log(`  > Local: \x1b[36mhttp://localhost:\x1b[1m${PORT}/\x1b[0m`);
  })
);
