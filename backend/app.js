import express from 'express';
import cors from "cors";
import user from "./models/userModel.js";
import userCtrl from "./controllers/userCtrl.js";
// import mongoose from 'mongoose';
// import user from "./models/users.js";
// import userCtrl from "./controllers/users.js";
// import auth from './middleware/auth.js';
// import multer from './middleware/multer-config.js';
// import path from "path";
// import {fileURLToPath} from "url";
// import {config} from "dotenv";
// import { createSauce, deleteSauce, getAllSauce, getOneSauce, likeSauce, modifySauce } from './controllers/sauces.js';
// const {MONGODBURL} = config().parsed;
// const __filename = fileURLToPath(import.meta.url);
export const app = express();

// console.log(MONGODBURL);

app.use(cors());
app.use(express.json());


// mongoose.connect(MONGODBURL)
//   .then(() => {
//     console.log('Successfully connected to MongoDB Atlas!');
//   })
//   .catch((error) => {
//     console.log('Unable to connect to MongoDB Atlas!');
//     console.error(error);
//   });

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');

  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');

  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');

  next();

});

//Sign up
app.use("/api/auth/signup", userCtrl.signup)

//Login
app.post("/api/auth/login", userCtrl.login)

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

//

export default app;