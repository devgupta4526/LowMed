import { Router } from "express";
import {
  getAllBlogPosts,
  getBlogPostById,
  createBlogPost,
  updateBlogPost,
  deleteBlogPost,
  getMyBlogPost,
  searchBlogPosts,
  getRelatedBlogPostById,
} from "../controllers/blog.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/post", getAllBlogPosts);
router.get("/post/:id", getBlogPostById);
router.get("/post/related/:id", getRelatedBlogPostById);
router.get("/myblogs/", getMyBlogPost);
router.get("/search", searchBlogPosts);

// Apply `verifyJWT` before the `createBlogPost` controller
router.post(
  "/post",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyJWT,
  createBlogPost
);

router.put(
  "/post/:id",
  upload.fields([{ name: "image", maxCount: 1 }]),
  verifyJWT,
  updateBlogPost
);
router.delete("/post/:id", verifyJWT, deleteBlogPost);

export default router;
