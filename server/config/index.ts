import dotenv from "dotenv";
import { z } from "zod";

// Load environment variables
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  PORT: z.string().transform(Number).default("3001"),
  DATABASE_URL: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRES_IN: z.string().default("7d"),
  CORS_ORIGIN: z.string().default("http://localhost:5173").transform((val) => {
    // Handle multiple origins separated by commas
    if (val.includes(',')) {
      return val.split(',').map(origin => origin.trim());
    }
    return val;
  }),
  RATE_LIMIT_WINDOW_MS: z.string().transform(Number).default("900000"),
  RATE_LIMIT_MAX_REQUESTS: z.string().transform(Number).default("100"),
  MAX_FILE_SIZE: z.string().transform(Number).default("5242880"),
  UPLOAD_PATH: z.string().default("./uploads"),
  LOG_LEVEL: z.enum(["error", "warn", "info", "debug"]).default("info"),
});

const envParse = envSchema.safeParse(process.env);

if (!envParse.success) {
  console.error("❌ Invalid environment variables:", envParse.error.flatten().fieldErrors);
  throw new Error("Invalid environment variables");
}

export const config = envParse.data;

export const isDevelopment = config.NODE_ENV === "development";
export const isProduction = config.NODE_ENV === "production";
export const isTest = config.NODE_ENV === "test"; 