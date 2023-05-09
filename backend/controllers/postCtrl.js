import Post from "../models/posts.js";
import fs from "fs";

// New post
export const createPost = (req, res) => {
     const postObject = JSON.parse(req.body.post);

    delete postObject._id;
    delete postObject._userId;

    const post = new Post({
        ...postObject,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`,
        userId: postObject.userId
    });
    post.save()
        .then(() => res.status(201).json({message: "Post added." }))
        .catch(error => res.status(400).json({message: error.message }));
};


// Edit a post
export const modifyPost = (req, res) => {
  const postObject = req.file? {
    ...JSON.parse(req.body.post),
    imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
  } : { ...req. body };

  delete postObject._userId;
  Post.findOne({ _id: req.params.id })
    .then((post) => {
      if (post.userId != req.auth.userId) {
        res.status(401).json({ message: "You are not authorized to edit this post." });
      } else {
        Post.updateOne({ _id: req.params.id }, { ...postObject, _id: req.params.id })
          .then(() => res.status(200).json({ message: "Post updated." }))
          .catch(error => res.status(401).json({ error }));
      }
    })
    .catch((error) => {
      res.status(400).json({ error });
    });
};

// Delete a post
export const deletePost = (req, res) => {
  Post.findOne({ _id: req.params.id })
  .then((post) => {
      if (!post) {
          res.status(404).json({message: "Post not found."});
      }
      else {
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
          const userId = decodedToken.userId;

          if (post.userId !== userId) {
              res.status(401).json({message: "You're not authorized to delete this post."});
          }
          else {
              const filename = post.imageUrl.split('/images/')[1];
              fs.unlink(`images/${filename}`, () => {
                  Post.deleteOne({ _id: req.params.id })
                      .then(() => res.status(200).json({ message: "Post deleted." }))
                      .catch(error => res.status(400).json({ message: error.message }));
              });
          }
      }

  })
  .catch(error => res.status(500).json({ message: error.message }));
};

// Retrieve all posts
export const getAllPosts = (req, res) => {
   Post.find().then(
     (posts) => {
       res.status(200).json(posts);
     }
   ).catch(
     (error) => {
       res.status(404).json({
        error: {
          message: "Unable to retrieve posts.",
          ...error
        }
       });
     }
   );
};

//like and dislike
export const likePost = (req, res) => {
   const like = req. body. like;
   if(like === 1) { // like button
       Post.updateOne({_id: req.params.id}, { $inc: { likes: 1}, $push: { usersLiked: req.body.userId}, _id: req.params.id })
       .then( () => res.status(200).json({message: "You liked this post." }))
       .catch( error => res.status(500).json({ error}))

   } else if(like === -1) { // don"t like button
       Post.updateOne({_id: req.params.id}, { $inc: { dislikes: 1}, $push: { usersDisliked: req.body.userId}, _id: req.params.id })
       .then( () => res.status(200).json({message: "You disliked like this post." }))
       .catch( error => res.status(500).json({ error}))

   } else { // cancel the like or dislike button
       Post.findOne( {_id: req.params.id})
       .then( post => {
           if( post.usersLiked.indexOf(req.body.userId)!== -1){
                post.updateOne({_id: req.params.id}, { $inc: { likes: -1},$pull: { usersLiked: req.body.userId}, _id: req.params.id })
               .then( () => res.status(200).json({message: "Selection updated." }))
               .catch( error => res.status(500).json({ error}))
               }
              
           else if( post.usersDisliked.indexOf(req.body.userId)!== -1) {
               Post.updateOne( {_id: req.params.id}, { $inc: { dislikes: -1 }, $pull: { usersDisliked: req.body.userId}, _id: req.params.id})
               .then( () => res.status(200).json({message: "Selection updated" }))
               .catch( error => res.status(500).json({ error}))
               }
       })
       .catch( error => res.status(404).json({ error}))
   }
};
