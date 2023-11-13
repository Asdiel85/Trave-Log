const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
  {
    userAvatar: {
      type: String,
    },
    country: {
      type: String,
      required: [true, 'Please enter country'],
    },
    city: {
      type: String,
      required: [true, 'Please enter city'],
    },
    imageUrl: {
      type: String,
      required: [true, 'Please enter picture'],
      match: [/^(http|https):\/\//, 'Invalid image url!']
    },
    cost: {
      type: Number,
      required: [true, 'Please enter cost'],
      min: [0, 'Cost should be a positive number']
    },
    description: {
      type: String,
      required: [true, 'Please enter description'],
      minLength: [20, 'Please enter more than 20 characters'],
      maxLength: [1000, 'Description max length is 1000 characters'],
    },
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
  },
  {
    timestamps: true,
  }
);

const Post = new mongoose.model('Post', postSchema);

module.exports = Post;
