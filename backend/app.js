import express from 'express';
import cors from "cors";
import mongoose from 'mongoose';
// import user from "./models/users.js";
// import UsersController from "./controllers/users.js";
// import auth from './middleware/auth.js';
// import multer from './middleware/multer-config.js';
// import path from "path";
import {fileURLToPath} from "url";
import {config} from "dotenv";
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

export default app;