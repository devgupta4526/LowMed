import mongoose, { Schema } from "mongoose";

const commentSchema = new mongoose.Schema({
  username: { type: String,},
  text: { type: String, required: true },
  blogPost: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }, // Reference to BlogPost model
  user: { type: Schema.Types.ObjectId, ref: 'User' } // Optional reference to User model
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
