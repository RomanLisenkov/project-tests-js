const router = require('express').Router();
const Home = require('../components/view/Home');
const { Category } = require('../db/models');
const { QuestionAndAnswer } = require('../db/models');

router.get('/', async (req, res) => {
  const categoriesFromDb = await Category.findAll({
    include: QuestionAndAnswer,
  });
  const categories = JSON.parse(JSON.stringify(categoriesFromDb));

  const categoriesWithoutEmpty = categories.filter(
    (category) => category.QuestionAndAnswers.length != 0
  );
  
  res.renderComponent(Home, {
    user: res.locals.user,
    categories: categoriesWithoutEmpty,
  });
});

module.exports = router;
