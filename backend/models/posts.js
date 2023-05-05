import mongoose from 'mongoose';

const sauceSchema = mongoose.Schema({
  userId: { type: String },
  username: { type: String, required: true },
  postTitle: { type: String, required: true },
  postCaption: { type: String, required: true },
  imageUrl: { type: String },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  usersLiked: [ String ],
  usersDisliked: [ String ],
});

export const Sauce = mongoose.model('Sauce', sauceSchema);
export default Sauce