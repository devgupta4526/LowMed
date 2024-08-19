import { Router } from 'express';
import {
  getAllComments,
  getCommentsById,
  addCommentToBlog
} from '../controllers/comment.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';

const router = Router();

// Route to get all comments (optional if needed)
router.get('/', getAllComments);

// Route to get comments for a specific blog post
router.get('/:id', getCommentsById);

// Route to add a new comment to a specific blog post (requires authentication)
router.post('/:id', verifyJWT, addCommentToBlog);

export default router;
