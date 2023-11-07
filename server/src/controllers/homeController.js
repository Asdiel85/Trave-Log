const router = require('express').Router();
const postManager = require('../managers/postManager')

router.get('/', async (req, res) => {
    try {
        const data = await postManager.getPosts();
        res.status(200).json(data)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router