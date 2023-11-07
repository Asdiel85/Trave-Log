const router = require('express').Router();
const { adminGuard, routeGuard } = require('../middlewares/authMiddleware');
const userManager = require('../managers/userManager');

router.get('/', adminGuard, async (req, res) => {
  try {
    const data = await userManager.getUsers();
    res.status(200).json(data);
  } catch (error) {
    res.status(401).send(error.message);
  }
});

router.get('/:userId', routeGuard, async (req, res) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      const user = await userManager.getById(req.params.userId);
      res.status(200).json(user);
    } else {
      throw new Error('You are not authorized');
    }
  } catch (error) {
    res.status(401).json(error.message);
  }
});

router.put('/:userId/edit', routeGuard, async (req, res) => {
  try {
    if (req.user.id === req.params.userId || req.user.isAdmin) {
      const user = await userManager.getById(req.params.userId);
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

router.delete('/:userId', adminGuard, async (req, res) => {
    try {
        await userManager.deleteUser(req.params.userId)
        res.status(200).send('User Deleted');
    } catch (error) {
        res.status(401).json(error.message); 
    }
})
module.exports = router;
