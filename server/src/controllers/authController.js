const router = require('express').Router();
const userManager = require('../managers/userManager');

router.get('/register', (req, res) => {
  res.send('Register Page');
});

router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, repeatPassword } = req.body;
  try {
    await userManager.register({
      firstName,
      lastName,
      email,
      password,
      repeatPassword,
      isAdmin: false,
    });

    res.send('Success');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get('/login', (req, res) => {
  res.send('Login page');
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const token = await userManager.login(email, password);
    res.status(200).json(token);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
