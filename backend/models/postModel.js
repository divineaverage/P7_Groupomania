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
    dislikes: { type: Number, default: 0 },
    usersLiked: [String],
    usersDisliked: [String],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
export default Post;
