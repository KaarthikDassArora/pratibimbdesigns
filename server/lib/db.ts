import { PrismaClient } from "@prisma/client";
import { config } from "../config/index.js";

declare global {
  var __prisma: PrismaClient | undefined;
}

export const prisma = globalThis.__prisma || new PrismaClient({
  log: config.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
});

if (config.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}

// Graceful shutdown
process.on("beforeExit", async () => {
  await prisma.$disconnect();
});

// Handle uncaught exceptions
process.on("uncaughtException", async (error) => {
  console.error("Uncaught Exception:", error);
  await prisma.$disconnect();
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", async (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  await prisma.$disconnect();
  process.exit(1);
}); 