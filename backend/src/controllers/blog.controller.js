import BlogPost from "../models/blogpost.models.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import cloudinary from 'cloudinary';

// Get all blog posts
const getAllBlogPosts = asyncHandler(async (req, res) => {
  const blogPosts = await BlogPost.find().populate("author", "username");

  if (!blogPosts || blogPosts.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, blogPosts, "No Blogs Are There"));
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blogPosts, "Blog Posts retrieved successfully"));
});

// Get post by id
const getBlogPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blogPost = await BlogPost.findById(id).populate("author", "username");

  if (!blogPost) {
    throw new ApiError(404, "Blog post not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, blogPost, "Blog Post retrieved successfully"));
});
// Get related post by id
const getRelatedBlogPostById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const blogPost = await BlogPost.findById(id)
    .populate("author", "username");

  if (!blogPost) {
    throw new ApiError(404, "Blog post not found");
  }

  // Fetch related posts from the same category
  const relatedPosts = await BlogPost.find({
    _id: { $ne: id },
    category: blogPost.category,
  }).limit(3); // Limit the number of related posts

  return res
    .status(200)
    .json(new ApiResponse(200,  relatedPosts, "Blog Post retrieved successfully"));
});


// Add a new blog post
const createBlogPost = asyncHandler(async (req, res) => {
  const { title, author, content, category } = req.body;
  const imageLocalPath = req.files?.image[0]?.path;
  console.log(imageLocalPath);

  // Validate required fields
  if (
    [title, author, category, content].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, `Some Fields Are Missing`);
  }

  // Validate categories (optional: ensure they match allowed categories)
  const allowedCategories = [
    "Tech",
    "MobileDev",
    "Travel",
    "Food",
    "Lifestyle",
    "None",
  ];
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
    const uploadResponse = await uploadOnCloudinary(imageLocalPath);
    imageUrl = uploadResponse?.url || "";
    console.log(imageUrl);
  }

  // Create blog post
  const blogPost = await BlogPost.create({
    title,
    author,
    content,
    image: imageUrl,
    category,
  });

  if (!blogPost) {
    throw new ApiError(400, "Something went wrong while creating blogPost");
  }

  doesUserExist.yourBlogs.push(blogPost._id);
  await doesUserExist.save();
  console.log(doesUserExist);

  return res
    .status(200)
    .json(new ApiResponse(200, blogPost, "BlogPost Created Successfully"));
});

// Update a blog post
const updateBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;
  const imageLocalPath = req.files?.image?.[0]?.path;
  console.log(req.body);
  console.log(req.body.formData);

  // Find the blog post by ID
  const blogPost = await BlogPost.findById(id);

  if (!blogPost) {
    throw new ApiError(404, "Blog post not found");
  }
  console.log(blogPost);

  // Validate categories (optional: ensure they match allowed categories)
  const allowedCategories = [
    "Tech",
    "MobileDev",
    "Travel",
    "Food",
    "Lifestyle",
    "None",
  ];
  if (category && !allowedCategories.includes(category)) {
    throw new ApiError(400, "Invalid category provided");
  }

  // Update fields
  blogPost.title = title || blogPost.title;
  blogPost.content = content || blogPost.content;
  blogPost.category = category || blogPost.category;

  // Handle image upload if a new image is provided
  if (imageLocalPath) {
    const uploadResponse = await uploadOnCloudinary(imageLocalPath);
    blogPost.image = uploadResponse?.url || "";
    console.log(uploadResponse);
  }

  // Save the updated blog post
  const updatedBlogPost = await blogPost.save();
  console.log(updatedBlogPost);

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedBlogPost, "Blog Post updated successfully")
    );
});

// Delete a blog post
const deleteBlogPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { author } = req.body;

  // Find the blog post by ID
  const blogPost = await BlogPost.findById(id);

  if (!blogPost) {
    throw new ApiError(404, "Blog post not found");
  }

  // Remove the image from Cloudinary if it exists
  if (blogPost.image) {
    const publicId = blogPost.image.split("/").pop().split(".")[0]; // Extract the public ID
    await cloudinary.uploader.destroy(publicId);
  }

  // Remove the blog post
  await blogPost.deleteOne();

  // Also remove the blog post reference from the user's 'yourBlogs' array
  const user = await User.findById(author);
  if (user) {
    user.yourBlogs.pull(blogPost._id);
    await user.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Blog post deleted successfully"));
});

// Get my blog posts
const getMyBlogPost = asyncHandler(async (req, res) => {
  const userId = req.body.userId || req.query.userId || req.params.userId;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  console.log(userId);

  // Find the user by userId
  const user = await User.findById(userId).populate("yourBlogs");

  // Check if the user exists
  if (!user) {
    throw new ApiError(404, "User with this ID not found");
  }

  // Retrieve the blogs created by the user
  const userBlogs = user.yourBlogs;

  // If no blogs found, return an empty array with a message
  if (!userBlogs || userBlogs.length === 0) {
    return res
      .status(200)
      .json(new ApiResponse(200, [], "No Blogs created by the user"));
  }

  // Return the blogs created by the user
  return res
    .status(200)
    .json(
      new ApiResponse(200, userBlogs, "User's Blogs retrieved successfully")
    );
});

// Search Blog Posts
const searchBlogPosts = asyncHandler(async (req, res) => {
  const { query } = req.query;

  const blogPosts = await BlogPost.find({
    title: { $regex: query, $options: "i" },
  }).populate("author", "username");

  return res
    .status(200)
    .json(new ApiResponse(200, blogPosts, "Blog Posts retrieved successfully"));
});

export {
  createBlogPost,
  getAllBlogPosts,
  getBlogPostById,
  updateBlogPost,
  deleteBlogPost,
  getMyBlogPost,
  searchBlogPosts,
  getRelatedBlogPostById,
};
