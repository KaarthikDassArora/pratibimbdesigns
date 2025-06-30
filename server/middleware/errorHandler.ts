import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { Prisma } from "@prisma/client";
import { config } from "../config/index.js";

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export function errorHandler(
  error: AppError | ZodError | Prisma.PrismaClientKnownRequestError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  let statusCode = 500;
  let message = "Internal Server Error";
  let details: any = null;

  // Handle Zod validation errors
  if (error instanceof ZodError) {
    statusCode = 400;
    message = "Validation Error";
    details = error.errors.map(err => ({
      field: err.path.join("."),
      message: err.message,
    }));
  }
  // Handle Prisma errors
  else if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case "P2002":
        statusCode = 409;
        message = "Resource already exists";
        break;
      case "P2025":
        statusCode = 404;
        message = "Resource not found";
        break;
      case "P2003":
        statusCode = 400;
        message = "Invalid foreign key reference";
        break;
      default:
        statusCode = 400;
        message = "Database operation failed";
    }
  }
  // Handle custom errors
  else if (error instanceof CustomError) {
    statusCode = error.statusCode;
    message = error.message;
  }
  // Handle other known errors
  else if (error.name === "JsonWebTokenError") {
    statusCode = 401;
    message = "Invalid token";
  } else if (error.name === "TokenExpiredError") {
    statusCode = 401;
    message = "Token expired";
  } else if (error.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
  }

  // Log error in development
  if (config.NODE_ENV === "development") {
    console.error("Error:", {
      message: error.message,
      stack: error.stack,
      url: req.url,
      method: req.method,
      body: req.body,
      params: req.params,
      query: req.query,
    });
  }

  // Send error response
  const errorResponse: any = {
    success: false,
    message,
    ...(details && { details }),
  };

  // Include stack trace in development
  if (config.NODE_ENV === "development" && error.stack) {
    errorResponse.stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
}

export function notFoundHandler(req: Request, res: Response, next: NextFunction) {
  const error = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(error);
}

export function asyncHandler(fn: Function) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
} 