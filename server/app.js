import express from 'express';
import cors from "cors";
import user from "./models/userModel.js";
import usersController from "./controllers/userCtrl.js";
import mongoose from 'mongoose';
import auth from './middleware/auth.js';
import multer from './middleware/multer-config.js';
import path from "path";
import {fileURLToPath} from "url";
import {config} from "dotenv";
import { createPost, deletePost, getAllPosts, likePost, modifyPost } from './controllers/postCtrl.js';
import { deleteUser, getUser, modifyUser } from './controllers/userCtrl.js';
const {MONGODBURL} = config().parsed;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const app = express();

console.log(MONGODBURL);

app.use(cors());
app.use(express.json());


mongoose.connect(MONGODBURL)
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });


app.use("/images", express.static(path.join(__dirname, "images")))

//Sign up
app.use("/api/auth/signup", usersController.signup)

//Login
app.post("/api/auth/login", usersController.login)


//Post functions
app.post('/api/posts', auth, multer, createPost);
app.put('/api/posts/:id', auth, multer, modifyPost);
app.delete('/api/posts/:id', auth, deletePost);
app.get('/api/posts', auth, getAllPosts);
app.post('/api/posts/:id/like', auth, likePost);

//Profile functions
app.get('/api/profile/:id', auth, getUser);
app.put('/api/profile/:id', auth, modifyUser);
app.delete('/api/posts/:id', auth, deleteUser);

export default app;