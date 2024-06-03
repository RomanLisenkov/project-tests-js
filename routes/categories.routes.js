const router = require('express').Router();
const { query } = require('express');
const CategoryPage = require('../components/view/CategoryPage');
const QuestionPage = require('../components/view/QuestionPage');
const {
  QuestionAndAnswer,
  Variant,
  Category,
  Statistic,
} = require('../db/models');

router.get('/:category_id/questions/:questionNumber', async (req, res) => {
  const { category_id, questionNumber } = req.params;
  const questionsAndAnswersFromDb = await QuestionAndAnswer.findAll({
    where: { category_id },
  });
  const questionsAndAnswers = JSON.parse(
    JSON.stringify(questionsAndAnswersFromDb)
  );
  const categoryFromDb = await Category.findByPk(Number(category_id));

  const category = JSON.parse(JSON.stringify(categoryFromDb));

  const variantsFromDb = await Variant.findAll();
  const variants = JSON.parse(JSON.stringify(variantsFromDb));
  const quantityQuestions = questionsAndAnswers.length;
  if (res.locals.user) {
    if (questionNumber > quantityQuestions) {
      await Statistic.create({
        user: res.locals.user.email,
        category: category.title,
        rightanswers: req.app.locals.trueAnswers,
        questions: quantityQuestions,
      });
    }
  }

  res.renderComponent(QuestionPage, {
    category,
    user: res.locals.user,
    question: questionsAndAnswers[questionNumber - 1] ?? null,
    variants: variants.filter(
      (variant) =>
        variant.question_id === questionsAndAnswers[questionNumber - 1]?.id
    ),
    questionNumber,
    quantityQuestions,
    trueAnswers: req.app.locals.trueAnswers,
  });
});

router.post('/:category_id/questions/:questionNumber', async (req, res) => {
  const { answer, question_id } = req.body;
  const { category_id, questionNumber } = req.params;

  const questionAndAnswerFromDb = await QuestionAndAnswer.findByPk(
    Number(question_id)
  );
  const questionAndAnswer = JSON.parse(JSON.stringify(questionAndAnswerFromDb));
  if (answer.toLowerCase() === questionAndAnswer.answer.toLowerCase()) {
    req.app.locals.trueAnswers += 1;
    res.json({ message: true });
    return;
  } else {
    res.json({ message: false });
  }
});

router.get('/:category_id', async (req, res) => {
  const { category_id } = req.params;
  req.app.locals.trueAnswers = 0;
  const questionsAndAnswersFromDb = await QuestionAndAnswer.findAll({
    where: { category_id },
  });
  const questionsAndAnswers = JSON.parse(
    JSON.stringify(questionsAndAnswersFromDb)
  );

  const categoryFromDb = await Category.findByPk(Number(category_id));
  const category = JSON.parse(JSON.stringify(categoryFromDb));

  const quantityQuestions = questionsAndAnswers.length;
  res.renderComponent(CategoryPage, {
    user: res.locals.user,
    category,
    quantityQuestions,
  });
});

module.exports = router;
