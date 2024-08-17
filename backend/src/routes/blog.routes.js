import { Router } from 'express';
import { getAllBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost } from '../controllers/blog.controller.js';
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/post', getAllBlogPosts);
router.get('/post/:id', getBlogPostById);

// Apply `verifyJWT` before the `createBlogPost` controller
router.post('/post', 
  upload.fields([
    { name: 'image', maxCount: 1 },
  ]),
  verifyJWT,
  createBlogPost
);

router.put('/post/:id', verifyJWT, updateBlogPost);
router.delete('/post/:id', verifyJWT, deleteBlogPost);

export default router;
