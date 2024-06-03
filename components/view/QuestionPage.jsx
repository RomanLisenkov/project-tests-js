const React = require('react');
const Layout = require('../Layout');

module.exports = function QuestionPage({
  question,
  user,
  category,
  variants,
  questionNumber,
  quantityQuestions,
  trueAnswers,
}) {
  return (
    <Layout title="Category" user={user}>
      <h2>{category.title}</h2>

      {question ? (
        <div className="question_wrapper">
          <div className='question_text'>
            Вопрос {questionNumber} из {quantityQuestions}{' '}
          </div>{' '}
          <div className='question_text'>{question.question}</div>
          <form
            action="#"
            className="form_answer"
            name="answer"
            data-category_id={category.id}
            data-question_number={questionNumber}
            data-question_id={question.id}
          >
            {variants.length != 0 ? (
              variants.map((variant) => (
                <div>
                  <input
                    type="radio"
                    name={`answer`}
                    value={`${variant.variant}`}
                  />
                  <label>{variant.variant}</label>
                </div>
              ))
            ) : (
              <div>
                <input name="answer" type="text" />
              </div>
            )}
            <input className='auth_submit' type="submit" value="Ответить" id="btnInput" />
          </form>
        </div>
      ) : (
        <>
          <div> Вопросы закончились</div>
          <div>Правильных ответов: {trueAnswers}</div>
          <div>Всего вопросов: {quantityQuestions}</div>
          {trueAnswers === quantityQuestions ? (
            <div>Поздравляю! Вы молодец!</div>
          ) : (
            <div>
              Не расстраивайтесь! Подучите тему получше и возвращайтесь!
            </div>
          )}
        </>
      )}
    </Layout>
  );
};
