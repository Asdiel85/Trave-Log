const router = require('express').Router();
const { adminGuard, routeGuard } = require('../middlewares/authMiddleware');
const userManager = require('../managers/userManager');
const postManager = require('../managers/postManager')

router.get('/', adminGuard, async (req, res) => {
  try {
    const data = await userManager.getUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.get('/:userId', routeGuard, async (req, res) => {
  try {   
      const user = await userManager.getById(req.params.userId);
      res.status(200).json(user);
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.get('/:userId/posts', routeGuard, async (req, res) => {
  try {
    const posts = await postManager.getUserPosts(req.params.userId)
    res.status(200).json(posts)
  } catch (error) {
    res.status(401).json(error.message);
  }
})

router.put('/:userId/edit', routeGuard, async (req, res) => {
  try {
    if (req.user.id === req.params.userId) {
      const updatedUser = await userManager.updateUser(
        req.params.userId,
        req.body
      );
      res.status(200).json(updatedUser);
    } else {
      throw new Error('You are not authorized to edit this user');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.delete('/:userId', routeGuard, async (req, res) => {
    try {
      if (req.user.id === req.params.userId || req.user.isAdmin) {
        await userManager.deleteUser(req.params.userId)
        res.status(200).json('User Deleted');
      }
    } catch (error) {
        res.status(401).json(error.message); 
    }
})
module.exports = router;
