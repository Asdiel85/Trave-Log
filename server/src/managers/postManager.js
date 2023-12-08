const Post = require('../models/Post');

exports.create = async (postData) => {
  const post = new Post(postData);
  await post.save();
  return post;
};

exports.getPosts = () => {
  const result = Post.find().sort({createdAt: -1});

  return result;
};

exports.getUserPosts = (userId) => {
  const posts = Post.find({ owner: userId });
  return posts;
};

exports.getById = (postId) => Post.findById(postId);

exports.updatePost = (postId, data) =>
  Post.findByIdAndUpdate(postId, data, { runValidators: true, new: true });

exports.likePost = (postId, userId) =>
  Post.findByIdAndUpdate(postId, { $push: { likes: userId } }, { new: true });

exports.unLikePost = (postId, userId) =>
  Post.findByIdAndUpdate(postId, { $pull: { likes: userId } }, { new: true });

  exports.deletePost = (postId) => Post.findByIdAndDelete(postId);
