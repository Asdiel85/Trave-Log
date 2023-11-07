const Post = require('../models/Post');

exports.create = async (postData) => {
  const post = new Post(postData);
  await post.save();
  return post;
};

exports.getPosts = () => {
  const result = Post.find();

  return result;
};

exports.getById = (postId) => Post.findById(postId);

exports.updatePost = (postId, data) =>
  Post.findByIdAndUpdate(postId, data, { runValidators: true, new: true });

exports.deletePost = (postId) => Post.findByIdAndDelete(postId);
