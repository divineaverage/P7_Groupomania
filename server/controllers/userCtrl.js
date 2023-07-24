import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../middleware/auth.js";

class UsersController {
  //Signup
  static async signup(req, res) {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(401).json({
        error: true,
        message: "Email is already in use.",
      });
    }

    bcrypt
      .hash(req.body.password, 10)
      .then((hash) => {
        const user = new User({
          name: req.body.name,
          email: req.body.email,
          password: hash,
        });
        user
          .save()
          .then(() => res.status(201).json({ message: "User created." }))
          .catch((error) => res.status(400).json({ message: error.message }));
      })
      .catch((error) => res.status(500).json({ message: error.message }));
  }

  //Login
  static async login(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        message: "Email is required.",
      });
    } else if (!req.body.password) {
      return res.status(400).json({
        message: "Password is required.",
      });
    }
    let user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        error: true,
        message: "Account not found.",
      });
    }

    bcrypt
      .compare(req.body.password, user.password)
      .then(async (isValid) => {
        if (!isValid) {
          return res.status(401).json({
            error: true,
            message: "Invalid password.",
          });
        } else {
          let token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
            expiresIn: "24h",
          });
          res.status(200).json({
            ...user,
            userId: user._id,
            token: token,
          });
        }
      })

      .catch((error) => res.status(500).json({ message: error.message }));
  }
}

//Profile controllers

//Get profile
export const getUser = (req, res) => {
  User.find({ _id: req.params.id })
    .then((user) => {
      res.status(200).json({
        ...user[0]._doc,
        userId: user._id,
        token: token,
      });
    })
    .catch((error) => {
      res.status(404).json({
        error: {
          message: "Unable to retrieve profile.",
          ...error,
        },
      });
    });
};

// Modify profile
// export const modifyUser = async (req, res) => {
//   User.findOne({
//     _id: req.params.id,
//   })
//   .then((user) => {
//     console.log(user)
//       User.db.collection.updateOne(
//         {_id: req.params.id}, 
//         {$set: req.body.name}, {$set: req.body.email}, {$set: req.body.password})
//       .then(() => {
//         res.status(200).json({
//           message: "Profile updated.",
//         });
//       })
//       .catch((error) => {
//         res.status(400).json({
//           error: "Could not update user profile.",
//         });
//       });
//   })
//   .catch((error) => {
//     res.status(404).json({
//       error: "Could not update user profile.",
//     });
//   });
// };

// // Delete current user
export const deleteUser = async (req, res) => {
  console.log(req.params.id)
  User.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      console.log(user)
        User.deleteOne({_id: req.params.id})
        .then(() => {
          res.status(200).json({
            message: "Profile deleted.",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: "Could not delete user profile!!!",
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: "Could not delete user profile.",
      });
    });
};

// Timestamp of user visit
export const timeStamp = async (req, res) => {
  console.log(req.params.id)
  User.findOne({
    _id: req.params.id,
  })
    .then((user) => {
      console.log(user)
        User.updateOne({_id: req.params.id}, {$set:{lastLogin:Date.now()}})
        .then(() => {
          res.status(200).json({
            message: "Timestamp assigned.",
          });
        })
        .catch((error) => {
          res.status(400).json({
            error: "Could not assign timestamp.",
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        error: "Could not assign timestamp.",
      });
    });
};

export default UsersController;
