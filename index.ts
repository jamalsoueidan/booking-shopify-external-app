import express from "express";
import path from "path";
import assetsRouter from "./assets-router";

const { PORT = 8000 } = process.env;

export async function createServer(
  root = process.cwd()
) {
  const app = express();

  app.get("/api/v1", (req, res) => {
    res.json({
      project: "React and Express Boilerplate",
      from: "Vanaldito",
    });
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
