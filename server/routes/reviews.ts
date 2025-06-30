import { Router } from "express";
import { z } from "zod";
import { authenticateToken, requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { prisma } from "../lib/db.js";

const router = Router();

const createReviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10).max(1000),
});

const updateReviewSchema = z.object({
  rating: z.number().min(1).max(5).optional(),
  content: z.string().min(10).max(1000).optional(),
});

// Get all approved reviews (public)
router.get("/", asyncHandler(async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where: { isApproved: true },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNum,
    }),
    prisma.review.count({ where: { isApproved: true } }),
  ]);

  res.json({
    success: true,
    data: {
      reviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
}));

// Get all reviews (admin only)
router.get("/admin", authenticateToken, requireAuth, requireRole("ADMIN"), asyncHandler(async (req, res) => {
  const { page = "1", limit = "10", status } = req.query;
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const skip = (pageNum - 1) * limitNum;

  const where: any = {};
  if (status === "pending") {
    where.isApproved = false;
  } else if (status === "approved") {
    where.isApproved = true;
  }

  const [reviews, total] = await Promise.all([
    prisma.review.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            firstName: true,
            lastName: true,
            avatar: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNum,
    }),
    prisma.review.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      reviews,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
}));

// Get user's own reviews
router.get("/my", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const reviews = await prisma.review.findMany({
    where: { authorId: req.user!.userId },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  res.json({
    success: true,
    data: { reviews },
  });
}));

// Create new review
router.post("/", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const validatedData = createReviewSchema.parse(req.body);

  // Check if user has already submitted a review
  const existingReview = await prisma.review.findFirst({
    where: { authorId: req.user!.userId },
  });

  if (existingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already submitted a review",
    });
  }

  const review = await prisma.review.create({
    data: {
      rating: validatedData.rating,
      content: validatedData.content,
      authorId: req.user!.userId,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  });

  res.status(201).json({
    success: true,
    message: "Review submitted successfully and pending approval",
    data: { review },
  });
}));

// Update user's own review
router.put("/:id", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const review = await prisma.review.findUnique({
    where: { id: req.params.id },
    select: { authorId: true, isApproved: true },
  });

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (review.authorId !== req.user!.userId) {
    return res.status(403).json({
      success: false,
      message: "You can only edit your own review",
    });
  }

  if (review.isApproved) {
    return res.status(400).json({
      success: false,
      message: "Cannot edit an approved review",
    });
  }

  const validatedData = updateReviewSchema.parse(req.body);

  const updatedReview = await prisma.review.update({
    where: { id: req.params.id },
    data: validatedData,
    include: {
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  });

  res.json({
    success: true,
    message: "Review updated successfully",
    data: { review: updatedReview },
  });
}));

// Delete user's own review
router.delete("/:id", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const review = await prisma.review.findUnique({
    where: { id: req.params.id },
    select: { authorId: true },
  });

  if (!review) {
    return res.status(404).json({
      success: false,
      message: "Review not found",
    });
  }

  if (review.authorId !== req.user!.userId && req.user!.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "You can only delete your own review",
    });
  }

  await prisma.review.delete({
    where: { id: req.params.id },
  });

  res.json({
    success: true,
    message: "Review deleted successfully",
  });
}));

// Approve/reject review (admin only)
router.patch("/:id/approve", authenticateToken, requireAuth, requireRole("ADMIN"), asyncHandler(async (req, res) => {
  const { isApproved } = req.body;

  if (typeof isApproved !== "boolean") {
    return res.status(400).json({
      success: false,
      message: "isApproved must be a boolean",
    });
  }

  const review = await prisma.review.update({
    where: { id: req.params.id },
    data: { isApproved },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          firstName: true,
          lastName: true,
          avatar: true,
        },
      },
    },
  });

  res.json({
    success: true,
    message: `Review ${isApproved ? "approved" : "rejected"} successfully`,
    data: { review },
  });
}));

export default router; 