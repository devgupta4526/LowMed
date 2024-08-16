import mongoose, { Schema } from "mongoose";

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User model
  content: { type: String, required: true },
  image: { type: String, required: true },
  relatedPosts: [
    {
      id: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
      title: String,
      image: String,
    }
  ],
  comments: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
}, { timestamps: true });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
