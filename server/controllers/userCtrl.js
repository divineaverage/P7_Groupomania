import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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

      bcrypt.hash(req.body.password, 10)
        .then((hash) => {
            const user = new User({
                name: req.body.name,
                email: req.body.email,
                password: hash
            });
            user.save()
                .then(() => res.status(201).json({message: "User created." }))
                .catch(error => res.status(400).json({ message: error.message }));
        })
        .catch(error => res.status(500).json({ message: error.message }));
      };

//Login
  static async login(req, res) {
    if (!req.body.email) {
      return res.status(400).json({
        message: "Email is required.",
      })
    }
    else if (!req.body.password) {
      return res.status(400).json({
        message: "Password is required."
      })
    }
      let user = await User.findOne({ email: req.body.email });

      if (!user) {
        return res.status(404).json({
          error: true,
          message: "Account not found.",
        });
      }

      bcrypt.compare(req.body.password, user.password)
      .then(async (isValid) => {

      if (!isValid) {
        return res.status(401).json({
          error: true,
          message: "Invalid password.",
        });
      } else {
        let token = jwt.sign(
            { userId: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: '24h' }
        );
        res.status(200).json({
          ...user,
          userId: user._id,
          token: token,
        });
      }})

      .catch(error => res.status(500).json({ message: error.message }));

    }
  }

//Profile controllers

//Get profile
export const getUser = (req, res) => {
  User.find({_id:req.params.id}).then(
    (user) => {
      res.status(200).json({
        ...user,
        userId: user._id,
        token: token,
      });
    }
  ).catch(
    (error) => {
      res.status(404).json({
       error: {
         message: "Unable to retrieve profile.",
         ...error
       }
      });
    }
  );
};


  // Modify profile
export const modifyUser = async (req, res) => {

  if (req.body.name == "" || req.body.firstname == "") {
    return res
      .status(400)
      .json({ error: "Please enter new information." });
  }

  User.findOne({
    _id: req.params.id,
  }).then((user) => {
    if (!user) throw new Error()
    if (user._id === req.params.id) {
      user
        .update({
          name: req.body.name,
          firstname: req.body.firstname,
        })
        .then(() => res.status(200).json({ 
          ...user,
          userId: user._id,
          token: token,
          message: "Profile updated." 
        }))
        .catch((error) =>
          res
            .status(400)
            .json({ error: "Profile could not be updated." })
        );
    }
  }).catch((error) =>
  res
    .status(400)
    .json({ error: "Profile could not be updated." })
);
}

// // Delete current user
export const deleteUser = (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET");
  const userId = decodedToken.userId;

  User.findOne({
    where: { id: req.params.id },
  })
    .then((user) => {
      if (user.id === userId) {
        user
          .destroy()
          .then(() => {
            res.status(200).json({
              ...user,
              userId: user._id,
              token: token,
              message: "Profile deleted.",
            });
          })
          .catch((error) => {
            res.status(400).json({
              error: "Could not delete user profile.",
            });
          });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: "Could not delete user profile.",
      });
    });
};


export default UsersController;