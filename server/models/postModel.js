import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    authorId: {type: String, required: true},
    caption: { type: String, required: true },
    readby: { type: String },
    date: { type: String, default: new Date()},
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
export default Post;
