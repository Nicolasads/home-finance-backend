import { app } from "./app";
import { env } from "./config/env.js";
import { prisma } from "./config/database";

const server = app.listen(env.PORT, () => {
  console.log(`API rodando em http://localhost:${env.PORT}`);
});

const shutdown = async (): Promise<void> => {
  server.close();
  await prisma.$disconnect();
  process.exit(0);
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
