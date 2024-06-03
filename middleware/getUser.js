const { User } = require('../db/models');

const userSession = async (req, res, next) => {
  try {
    if (req.session?.user_sid) {
      const user = await User.findByPk(req.session.user_sid);
      res.locals.user = user ? user.get() : null;
    } else {
      res.locals.user = null;
    }
    next();
  } catch (error) {
    console.log('ERROR FIND USER', error);
    next(error);
  }
};

module.exports = userSession;