import { Router } from "express";
import { authenticateUser, createUser, generateToken, authSchema, registerSchema } from "../lib/auth.js";
import { authenticateToken, requireAuth } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { prisma } from "../lib/db.js";

const router = Router();

// Register new user
router.post("/register", asyncHandler(async (req, res) => {
  const validatedData = registerSchema.parse(req.body);
  const user = await createUser(validatedData);
  
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: {
      user,
      token,
    },
  });
}));

// Login user
router.post("/login", asyncHandler(async (req, res) => {
  const { email, password } = authSchema.parse(req.body);
  const user = await authenticateUser(email, password);
  
  const token = generateToken({
    userId: user.id,
    email: user.email,
    role: user.role,
  });

  res.json({
    success: true,
    message: "Login successful",
    data: {
      user,
      token,
    },
  });
}));

// Get current user profile
router.get("/me", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json({
    success: true,
    data: { user },
  });
}));

// Update user profile
router.put("/me", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const { firstName, lastName, avatar } = req.body;
  
  const user = await prisma.user.update({
    where: { id: req.user!.userId },
    data: {
      firstName,
      lastName,
      avatar,
    },
    select: {
      id: true,
      email: true,
      username: true,
      firstName: true,
      lastName: true,
      avatar: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  res.json({
    success: true,
    message: "Profile updated successfully",
    data: { user },
  });
}));

// Change password
router.put("/change-password", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  
  if (!currentPassword || !newPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password and new password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: req.user!.userId },
    select: { password: true },
  });

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }

  const { comparePassword, hashPassword } = await import("../lib/auth.js");
  const isValidPassword = await comparePassword(currentPassword, user.password);
  
  if (!isValidPassword) {
    return res.status(400).json({
      success: false,
      message: "Current password is incorrect",
    });
  }

  const hashedNewPassword = await hashPassword(newPassword);
  
  await prisma.user.update({
    where: { id: req.user!.userId },
    data: { password: hashedNewPassword },
  });

  res.json({
    success: true,
    message: "Password changed successfully",
  });
}));

export default router; 