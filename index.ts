import {
  bookingRouter,
  customerRouter,
  mongodb,
  productRouter,
  scheduleRouter,
  staffRouter,
  widgetRouter,
} from "@jamalsoueidan/pkg.bsb";
import accountRoutes from "@libs/account/account.routes";
import authenticationRoutes from "@libs/authentication/authentication.route";
import groupRoutes from "@libs/group/group.routes";
import { jwtMiddleware } from "@libs/jwt/jwt.middleware";
import notificationRoutes from "@libs/notification/notification.routes";
import dotenv from "dotenv";
import express from "express";
import path from "path";
import assetsRouter from "./assets-router";

dotenv.config();

const { PORT = 8000 } = process.env;

const DEV_INDEX_PATH = `${process.cwd()}/frontend/`;
const PROD_INDEX_PATH = `${process.cwd()}/frontend/dist/`;

mongodb.connect(null);

export async function createServer(root = process.cwd(), isProd = process.env.NODE_ENV === "production") {
  const app = express();

  if (isProd) {
    const compression = await import("compression").then(({ default: fn }) => fn);
    const serveStatic = await import("serve-static").then(({ default: fn }) => fn);
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
  app.use("/api/*", jwtMiddleware);

  app.use("/api", bookingRouter);
  app.use("/api", productRouter);
  app.use("/api", groupRoutes);
  app.use("/api", customerRouter);
  app.use("/api", widgetRouter);
  app.use("/api", notificationRoutes);
  app.use("/api", accountRoutes);
  app.use("/api", staffRouter);
  app.use("/api", scheduleRouter);

  app.get("/*", (_req, res) => {
    const htmlFile = path.join(isProd ? PROD_INDEX_PATH + "index.html" : DEV_INDEX_PATH + "dev.html");

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
  }),
);
