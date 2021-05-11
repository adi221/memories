import generateToken from '../utils/generateToken.js';
import User from '../models/userModel.js';

const authUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) throw new Error('Invalid username or password');
    if (await user.matchPassword(password)) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    }
  } catch (error) {
    res.status(401).send(error.message);
  }
};

const signUpUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new Error('User already exists');
    }

    const user = await User.create({ username, email, password });

    if (user) {
      res.json({
        _id: user._id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      throw new Error('Invalid data');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      const { username, email } = user;
      res.json({ username, email });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const editUserDetails = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.username = req.body.username;
      user.email = req.body.email;
      user.password = req.body.newPassword
        ? req.body.newPassword
        : req.body.oldPassword;

      const updatedUser = await user.save();
      console.log(updatedUser);

      res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        email: updatedUser.email,
        token: generateToken(updatedUser._id),
      });
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

export { authUser, signUpUser, getUserDetails, editUserDetails };
