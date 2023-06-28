import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    imageUrl: {
      type: String,
      required: true,
    },
    authorId: {type: String, required: true},
    caption: { type: String, required: true },
    likes: { type: Number, default: 0 },
    date: { type: String, default: 0},
    usersLiked: [String],
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model("post", postSchema);
export default Post;
