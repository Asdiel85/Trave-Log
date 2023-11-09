const router = require('express').Router();
const homeController = require('./controllers/homeController')
const postController = require('./controllers/postController')
const authController = require('./controllers/authController')
const userController = require('./controllers/userController')

router.use(homeController)
router.use('/posts', postController)
router.use('/auth', authController)
router.use('/users', userController)

module.exports = router