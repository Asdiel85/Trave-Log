const User = require('../models/User');
const Post = require('../models/Post')
const bcrypt = require('bcrypt');
const jwt = require('../lib/jwt');
const { SECRET } = require('../config/config');

exports.register = async (userData) => {
  const user = await User.findOne({ email: userData.email });

  if (!user) {
    await User.create(userData);
  } else {
    
    throw new Error('User already exists');
  }
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw new Error('Invalid username or password');
  }
  
  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error('Invalid username or password');
  }

  const payload = {
    _id: user._id,
    username: user.username,
    isAdmin: user.isAdmin,
  };

  const userData = {
    id: user._id,
    avatar: user.userAvatar,
    isAdmin: user.isAdmin
  }
  const token = await jwt.sign(payload, SECRET, { expiresIn: '2d' });

  return {userData, token};
};

exports.getUsers = () => {
  const result = User.find();
  return result;
}

exports.getById = (userId) => User.findById(userId);

exports.updateUser = (userId, data) => User.findByIdAndUpdate(userId, data, {runValidators:true, new: true})

exports.deleteUser = async (userId) => {
 await Post.deleteMany({owner: userId})
 await User.findByIdAndDelete(userId)
}