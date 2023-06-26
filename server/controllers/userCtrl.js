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
            userId: user._id,
            token: token
        });
      }})

      .catch(error => res.status(500).json({ message: error.message }));

    }
  }

//Profile controllers

//View profile
export const getUser = (req, res) => {
  User.find().then(
    (user) => {
      res.status(200).json(user);
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


  // Modify user
export const modifyUser = async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password || user.password;
    }
    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      token: generateToken(updatedUser.id),

    })
  }
}

// Delete user
export const deleteUser = (req, res) => {
  User.findOne({ _id: req.params.id })
  .then((user) => {
      if (!user) {
          res.status(404).json({message: "User not found."});
      }
      else {
          const token = req.headers.authorization.split(' ')[1];
          const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
          const userId = decodedToken.userId;

          if (user.userId !== userId) {
              res.status(401).json({message: "You're not authorized to delete this user."});
          }
          else {
            User.findByIdAndDelete(req._id)
              .then(() => res.status(200).json({ message: "User deleted." }))
              .catch(error => res.status(400).json({ message: error.message }));
          }
      }

  })
  .catch(error => res.status(500).json({ message: error.message }));
};


export default UsersController;