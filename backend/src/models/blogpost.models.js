import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the schema for a blog post
const blogPostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    categories: [
      {
        type: String,
        enum: ["Tech", "MobileDev", "Travel", "Food", "Lifestyle","None"], // Add your categories here
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  { timestamps: true }
);

const BlogPost = mongoose.model("BlogPost", blogPostSchema);

export default BlogPost;
