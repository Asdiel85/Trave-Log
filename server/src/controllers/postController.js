const router = require('express').Router();
const postManager = require('../managers/postManager');
const { routeGuard } = require('../middlewares/authMiddleware');

router.get('/create', routeGuard, (req, res) => {
  res.status(200).send('Create post get');
});

router.post('/create', routeGuard, async (req, res) => {
  const { country, city, imageUrl, cost, description } = req.body;

  try {
    const post = await postManager.create({
      country,
      city,
      imageUrl,
      cost,
      description,
      owner: req.user._id,
    });
    res.status(201).json(post);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.get('/:postId', async (req, res) => {
  try {
    const post = await postManager.getById(req.params.postId);
    res.status(200).json(post);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

router.delete('/:postId', routeGuard, async (req, res) => {
  try {
    const post = await postManager.getById(req.params.postId);

    if (req.user.id === post.owner.toString() || req.user.isAdmin) {
      await postManager.deletePost(req.params.postId);

      res.status(200).send('Post Deleted');
    } else {
      throw new Error('You are not authorized to delete this post');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.put('/:postId/edit', routeGuard, async (req, res) => {
  try {
    const post = await postManager.getById(req.params.postId);
    if (post.owner.toString() === req.user.id) {
      const newPost = await postManager.updatePost(req.params.postId, req.body);
      res.status(200).json(newPost);
    } else {
      throw new Error('You are not authorized to edit this post');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

module.exports = router;
