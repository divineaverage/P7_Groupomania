import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    content: String,
    images: {
      type: Array,
      required: true,
    },
    description: { type: String, required: true },
    likes: { type: Number, default: 0 },
    usersLiked: [String],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
export default Post;
