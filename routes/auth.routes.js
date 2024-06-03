const bcrypt = require('bcrypt');
const router = require('express').Router();
const Authentification = require('../components/view/Authentification');
const Registration = require('../components/view/Registration');
const { User } = require('../db/models');

router.get('/signin', (req, res) => {
  res.renderComponent(Authentification, { user: res.locals.user });
});

router.post('/signin', async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;
    const findUser = await User.findOne({ where: { email } });
    if (!findUser) {
      res
        .status(401)
        .json({ message: 'Пользователя с таким email не найдено' });
    }
    const isSamePassword = await bcrypt.compare(password, findUser?.password);
    console.log(isSamePassword);
    if (findUser && isSamePassword) {
      req.session.user_sid = findUser.id;
      res.json({ message: 'Пользователь выполнил вход', id: findUser.id });
      return;
    } else {
      res.status(403).json({ message: 'Все поля должны быть заполнены!' });
      return;
    }
  } catch (err) {
    console.log({ AUTHENTIFICATION_DB_ERROR: err });
  }
});

router.get('/signup', (req, res) => {
  res.renderComponent(Registration, { user: res.locals.user });
});

router.post('/signup', async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res
        .status(403)
        .json({ message: 'Все поля должны быть заполнены!' });
      return;
    }
    const findUser = await User.findOne({ where: { email } });
    if (findUser) {
      res.status(403).json({ message: 'Пользователь с таким email уже зарегистрирован!' });
      return;
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        username,
        email,
        password: hashedPassword,
      });
      req.session.user_sid = user.id;
      res
        .status(203)
        .json({ message: 'Пользователь зарегистрирован', id: user.id });
      return;
    }
  } catch (err) {
    console.log({ REGISTRATION_DB_ERROR: err });
  }
});

router.get('/signout', (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      return res.status(500).json({ message: 'ERROR LOGOUT USER' });
    }
    res.clearCookie('user_sid').redirect('/');
  });
});

module.exports = router;
