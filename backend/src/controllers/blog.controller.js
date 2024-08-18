import BlogPost from '../models/blogpost.models.js';
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// Get all blog posts
// const getAllBlogPosts = asyncHandler(async (req, res) => {

//   const blogPost = await BlogPost.find().populate('author','name')

//   if(!blogPost || blogPost.length === 0){
//     return res.status(200).json(new ApiResponse(200,blogPost,"No Blogs Are There"));
//   }

//   const user = await User.findById(blogPost.author);
//   if(!user){
//     throw new ApiError(404,"User written blog post not found");
//   }

//   const username = user.username;
//   if(!username){
//     throw new ApiError(404,"username does not exist");
//   }
//   blogPost.author = username;


//   return res
//   .status(200)
//   .json(new ApiResponse(200, blogPosts, "Blog Posts retrieved successfully"));
  
// });
const getAllBlogPosts = asyncHandler(async (req, res) => {
  const blogPosts = await BlogPost.find().populate('author', 'username');

  if (!blogPosts || blogPosts.length === 0) {
    return res.status(200).json(new ApiResponse(200, blogPosts, "No Blogs Are There"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blogPosts, "Blog Posts retrieved successfully"));
});


// Get post by id
const getBlogPostById = asyncHandler(async (req, res) => {

  const { id } = req.params;

  const blogPost = await BlogPost.findById(id)
    .populate('author', 'username');        

  if (!blogPost) {
    throw new ApiError(404, "Blog post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blogPost, "Blog Post retrieved successfully"));

  
});


// Add a new blog post
const createBlogPost = asyncHandler(async (req, res) => {

  const { title, author, content, category } = req.body;
  const imageLocalPath = req.files?.image[0]?.path;

  // Validate required fields
  if ([title, author,category, content].some((field) => field?.trim() === "")) {
    throw new ApiError(400, `Some Fields Are Missing`);
  }

  // Validate categories (optional: ensure they match allowed categories)
   const allowedCategories = ["Tech", "MobileDev", "Travel", "Food", "Lifestyle", "None"];
   if (category && !allowedCategories.includes(category)) {
    throw new ApiError(400, "Invalid category provided");
  }

  // Check if user exists
  const doesUserExist = await User.findById(author);
  if (!doesUserExist) {
    throw new ApiError(400, "User author does not exist");
  }

  // Handle image upload
  let imageUrl = "";
  if (imageLocalPath) {
    imageUrl = await uploadOnCloudinary(imageLocalPath);
  }

  // Create blog post
  const blogPost = await BlogPost.create({
    title,
    author,       
    content,
    image: imageUrl?.url || "", 
    category, 
  });

  if(!blogPost){
    throw new ApiError(400, "Something went wrong while creating blogPost");

  }
  return res
  .status(200)
  .json(new ApiResponse(200, blogPost, "BlogPost Created Successfully"));


});


// Update a blog post
const updateBlogPost = asyncHandler(async (req, res) => {


});

// Delete a blog post
const deleteBlogPost = asyncHandler(async (req, res) => {



});

export { createBlogPost, getAllBlogPosts, getBlogPostById, updateBlogPost, deleteBlogPost };
