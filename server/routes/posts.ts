import { Router } from "express";
import { z } from "zod";
import { authenticateToken, requireAuth, requireRole } from "../middleware/auth.js";
import { asyncHandler } from "../middleware/errorHandler.js";
import { prisma } from "../lib/db.js";

const router = Router();

const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
  published: z.boolean().default(false),
  tagIds: z.array(z.string()).optional(),
});

const updatePostSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
  published: z.boolean().optional(),
  tagIds: z.array(z.string()).optional(),
});

// Get all posts (public)
router.get("/", asyncHandler(async (req, res) => {
  const { page = "1", limit = "10", search, tagId } = req.query;
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const skip = (pageNum - 1) * limitNum;

  const where: any = { published: true };
  
  if (search) {
    where.OR = [
      { title: { contains: search as string, mode: "insensitive" } },
      { content: { contains: search as string, mode: "insensitive" } },
    ];
  }

  if (tagId) {
    where.tags = { some: { id: tagId as string } };
  }

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
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
        tags: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNum,
    }),
    prisma.post.count({ where }),
  ]);

  res.json({
    success: true,
    data: {
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
}));

// Get single post (public)
router.get("/:id", asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
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
      tags: true,
      comments: {
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
      },
      _count: {
        select: {
          comments: true,
          likes: true,
        },
      },
    },
  });

  if (!post || (!post.published && req.user?.userId !== post.authorId)) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  res.json({
    success: true,
    data: { post },
  });
}));

// Create new post (authenticated)
router.post("/", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const validatedData = createPostSchema.parse(req.body);
  
  const postData: any = {
    title: validatedData.title,
    content: validatedData.content,
    published: validatedData.published,
    authorId: req.user!.userId,
  };

  if (validatedData.tagIds && validatedData.tagIds.length > 0) {
    postData.tags = {
      connect: validatedData.tagIds.map(id => ({ id })),
    };
  }

  const post = await prisma.post.create({
    data: postData,
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
      tags: true,
    },
  });

  res.status(201).json({
    success: true,
    message: "Post created successfully",
    data: { post },
  });
}));

// Update post (author or admin only)
router.put("/:id", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { authorId: true },
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (post.authorId !== req.user!.userId && req.user!.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "You can only edit your own posts",
    });
  }

  const validatedData = updatePostSchema.parse(req.body);
  
  const updateData: any = {};
  
  if (validatedData.title !== undefined) updateData.title = validatedData.title;
  if (validatedData.content !== undefined) updateData.content = validatedData.content;
  if (validatedData.published !== undefined) updateData.published = validatedData.published;
  
  if (validatedData.tagIds) {
    updateData.tags = {
      set: validatedData.tagIds.map(id => ({ id })),
    };
  }
  
  const updatedPost = await prisma.post.update({
    where: { id: req.params.id },
    data: updateData,
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
      tags: true,
    },
  });

  res.json({
    success: true,
    message: "Post updated successfully",
    data: { post: updatedPost },
  });
}));

// Delete post (author or admin only)
router.delete("/:id", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const post = await prisma.post.findUnique({
    where: { id: req.params.id },
    select: { authorId: true },
  });

  if (!post) {
    return res.status(404).json({
      success: false,
      message: "Post not found",
    });
  }

  if (post.authorId !== req.user!.userId && req.user!.role !== "ADMIN") {
    return res.status(403).json({
      success: false,
      message: "You can only delete your own posts",
    });
  }

  await prisma.post.delete({
    where: { id: req.params.id },
  });

  res.json({
    success: true,
    message: "Post deleted successfully",
  });
}));

// Like/Unlike post
router.post("/:id/like", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const postId = req.params.id;
  const userId = req.user!.userId;

  const existingLike = await prisma.like.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existingLike) {
    await prisma.like.delete({
      where: { userId_postId: { userId, postId } },
    });

    res.json({
      success: true,
      message: "Post unliked",
      data: { liked: false },
    });
  } else {
    await prisma.like.create({
      data: { userId, postId },
    });

    res.json({
      success: true,
      message: "Post liked",
      data: { liked: true },
    });
  }
}));

// Get user's posts (authenticated)
router.get("/user/me", authenticateToken, requireAuth, asyncHandler(async (req, res) => {
  const { page = "1", limit = "10" } = req.query;
  const pageNum = parseInt(page as string) || 1;
  const limitNum = parseInt(limit as string) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [posts, total] = await Promise.all([
    prisma.post.findMany({
      where: { authorId: req.user!.userId },
      include: {
        tags: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limitNum,
    }),
    prisma.post.count({ where: { authorId: req.user!.userId } }),
  ]);

  res.json({
    success: true,
    data: {
      posts,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total,
        pages: Math.ceil(total / limitNum),
      },
    },
  });
}));

export default router; 