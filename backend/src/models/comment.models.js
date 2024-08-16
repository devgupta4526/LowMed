import mongoose, { Schema } from "mongoose";

const commentSchema = new Schema({
  name: { type: String, default: 'Anonymous' },
  text: { type: String, required: true },
  blogPost: { type: Schema.Types.ObjectId, ref: 'BlogPost', required: true }, // Reference to BlogPost model
  user: { type: Schema.Types.ObjectId, ref: 'User' } // Optional reference to User model
}, { timestamps: true });

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
