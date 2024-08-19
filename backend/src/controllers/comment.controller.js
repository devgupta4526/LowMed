import Comment from '../models/comment.models.js';
import BlogPost from '../models/blogpost.models.js';
import User from '../models/user.models.js';
import { ApiError } from '../utils/ApiError.js';
import asyncHandler from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';

// Get all comments
const getAllComments = asyncHandler(async (req, res) => {
  try {
    const comments = await Comment.find()
      .populate('user', 'username')
      .populate('blogPost', 'title')
      .lean()
      .exec();

    // Filter out comments with missing users or assign a default value
    const filteredComments = comments.map(comment => {
      if (!comment.user) {
        comment.user = { username: 'Anonymous' };
      }
      return comment;
    });

    res.status(200).json(new ApiResponse(filteredComments, 'Comments fetched successfully'));
  } catch (error) {
    res.status(500).json(new ApiError('Error fetching comments', error.message));
  }
});

// Get comments by blog post ID
const getCommentsById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    // Check if blog post exists
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json(new ApiError('Blog post not found'));
    }

    const comments = await Comment.find({ blogPost: id })
      .populate('user', 'username')
      .lean()
      .exec();

    // Filter out comments with missing users or assign a default value
    const filteredComments = comments.map(comment => {
      if (!comment.user) {
        comment.user = { username: 'Anonymous' };
      }
      return comment;
    });

    res.status(200).json(new ApiResponse(filteredComments, 'Comments fetched successfully'));
  } catch (error) {
    res.status(500).json(new ApiError('Error fetching comments', error.message));
  }
});

// Add a new comment to a blog post
const addCommentToBlog = asyncHandler(async (req, res) => {
  const { id } = req.params; // Blog post ID
  const { text, userId } = req.body; // Comment details
  console.log("Id Details")
  console.log(text);
  console.log(userId);
  console.log(id);

  try {
    // Check if blog post exists
    const blogPost = await BlogPost.findById(id);
    if (!blogPost) {
      return res.status(404).json(new ApiError('Blog post not found'));
    }
    const userDetails = await User.findById(userId);
    if(!userDetails){
      return res.status(404).json(new ApiError("User Not Found"));
    }
    console.log("username");
    console.log(userDetails.username);
    // Create new comment
    const newComment = new Comment({
      username: userDetails.username, 
      text,
      blogPost: id,
      user: userId, 
    });
    console.log("New Comment")
    console.log(newComment);

    const savedComment = await newComment.save();
    console.log("saved Comment");
    console.log(savedComment);

    // Add the comment to the blog post
    blogPost.comments.push(savedComment._id);
    await blogPost.save();

    res.status(201).json(new ApiResponse(savedComment, 'Comment added successfully'));
  } catch (error) {
    res.status(500).json(new ApiError('Error adding comment', error.message));
  }
});

export { getAllComments, getCommentsById, addCommentToBlog };
