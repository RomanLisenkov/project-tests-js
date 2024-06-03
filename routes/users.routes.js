const router = require('express').Router();
const UsersPage = require('../components/view/UsersPage');
const { Category, User, QuestionAndAnswer, Variant } = require('../db/models');

const QuestionsAndAnswersPage = require('../components/view/QuestionsAndAnswersPage');

router.get('/categories', async (req, res) => {
  const categoriesFromDb = await Category.findAll({
    where: { user_id: res.locals.user.id },
  });

  const categories = JSON.parse(JSON.stringify(categoriesFromDb));

  res.renderComponent(UsersPage, { user: res.locals.user, categories });
});

router.post('/categories', async (req, res) => {
  if (res.locals.user) {
    try {
      const newCategory = await Category.create({
        ...req.body,
        user_id: res.locals.user.id,
      });
      res.json({
        message: 'Категория успешно добавлена',
        id: JSON.parse(JSON.stringify(newCategory)).id,
        title: JSON.parse(JSON.stringify(newCategory)).title,
      });
    } catch (error) {
      console.log({ ERROR_ADD_CATEGORY_DB: error });
    }
  } else {
    res.status(403).json({
      message: 'Для добавления новой категории необходимо авторизоваться',
    });
  }
});

router.delete('/categories', async (req, res) => {
  const { id } = req.body;
  try {
    const currCategoryFromDb = await Category.findByPk(Number(id));
    const currCategory = JSON.parse(JSON.stringify(currCategoryFromDb));
    if (currCategory.user_id === res.locals.user.id) {
      await Category.destroy({ where: { id } });
      res.json({ message: 'Категория удалена' });
    } else {
      res.status(403).json({ message: 'Эта категория вам не пренадлежит' });
    }
  } catch (error) {
    console.log({ ERROR_DELET_CATEGORY_DB });
  }
});

router.patch('/categories', async (req, res) => {
  const { id, title, description } = req.body;
  try {
    const currCategoryFromDb = await Category.findByPk(Number(id));
    const currCategory = JSON.parse(JSON.stringify(currCategoryFromDb));

    if (res.locals.user.id === currCategory.user_id) {
      await Category.update({ title, description }, { where: { id } });

      res.json({
        message: 'Категория успешно отредактирована!',
      });
    } else {
      res
        .status(403)
        .res.json({ message: 'У вас нет прав для редактирования категории' });
    }
  } catch (err) {
    console.log({ ERROR_PATCH_BD: err });
  }
});

router.get('/categories/data/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const currCategortFromDb = await Category.findByPk(Number(id));
    const currCategory = JSON.parse(JSON.stringify(currCategortFromDb));
    const { title, description } = currCategory;
    res.json({ message: 'Данные из бд получены', title, description });
  } catch (error) {
    console.log({ ERROR_GET_DESCRIPTION_FROM_DB: error });
  }
});

router.get('/categories/:id', async (req, res) => {
  const { id } = req.params;

  const questionsAndAnswersFromDb = await QuestionAndAnswer.findAll({
    where: { category_id: id },

    include: Variant,
  });
  const questionsAndAnswers = JSON.parse(
    JSON.stringify(questionsAndAnswersFromDb)
  ).sort((a, b) => a.id - b.id);

  const categoryFromDb = await Category.findByPk(Number(id));
  const category = JSON.parse(JSON.stringify(categoryFromDb));

  res.renderComponent(QuestionsAndAnswersPage, {
    user: res.locals.user,
    category,
    questionsAndAnswers,
  });
});

router.post('/categories/:id', async (req, res) => {
  const { id } = req.params;
  const { question, answer, variant1, variant2, variant3, variant4 } = req.body;

  const variantsArr = [variant1, variant2, variant3, variant4].filter(
    (el) => el !== ''
  );
  let variants = true;
  if (variantsArr.length === 0) {
    variants = false;
  }

  try {
    const newAnswerFromDb = await QuestionAndAnswer.create({
      category_id: id,
      question,
      answer,
      variants,
    });
    const newAnswer = JSON.parse(JSON.stringify(newAnswerFromDb));
    if (variants) {
      for (let variant of variantsArr) {
        await Variant.create({ variant, question_id: newAnswer.id });
      }
    }
    res.json({ message: 'Вопрос добавлен' });
  } catch (error) {
    console.log({ ERROR_ADD_QUESTION_DB: error });
  }
});

router.delete('/categories/:id', async (req, res) => {
  const id = req.params.id;
  const question_id = req.body.id;
  try {
    const categoryFromDb = await Category.findByPk(id);
    const category = JSON.parse(JSON.stringify(categoryFromDb));
    if (category.user_id === res.locals.user.id) {
      const variants = await Variant.findAll({
        where: {
          question_id,
        },
      });
      if (variants.length != 0) {
        await Variant.destroy({ where: { question_id } });
      }

      await QuestionAndAnswer.destroy({ where: { id: question_id } });
      res.json({ message: 'Элемент успешно удалён' });
    } else {
      res
        .status(403)
        .json({ message: 'У вас нет прав доступа для удаления вопроса' });
    }
    
  } catch (error) {
    console.log({ ERROR_DELETE_ANSWER_AND_QUESTION_DB: error });
  }
});

module.exports = router;
