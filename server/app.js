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
// import { createSauce, deleteSauce, getAllSauce, getOneSauce, likeSauce, modifySauce } from './controllers/sauces.js';
const {MONGODBURL} = config().parsed;
const __filename = fileURLToPath(import.meta.url);
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

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();

});

//Sign up
app.use("/api/auth/signup", usersController.signup)

//Login
app.post("/api/auth/login", usersController.login)

app.post('/api/posts', function (req, res, next) {
  var post = new user({
    username: req.body.username,
    password: req.body.body
  })
  post.post(function (err, post) {
    if (err) { return next(err) }
    res.json(201, post)
  })
})

//Post functions
app.post('/api/sauces', auth, multer, createPost);
app.put('/api/sauces/:id', auth, multer, modifyPost);
app.delete('/api/sauces/:id', auth, deletePost);
app.get('/api/sauces/:id', auth, getOnePost);
app.get('/api/sauces', auth, getAllPost);
app.post('/api/sauces/:id/like', auth, likePost);

export default app;