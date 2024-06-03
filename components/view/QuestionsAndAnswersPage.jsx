const React = require('react');
const Layout = require('../Layout');

module.exports = function QuestionsAndAnswersPage({
  user,
  category,
  questionsAndAnswers,
}) {
  return (
    <>
      
      <Layout title="Category" user={user}>
      <h2>{category.title}</h2>
        {questionsAndAnswers.length != 0 ? (
          questionsAndAnswers.map((elem, index) => (
            <div className="question_and_answer">
              <div className="question_number_remove">
                <div> Вопрос № {index + 1} </div>{' '}
                <a
                  href="#"
                  className="question_remove_link"
                  data-id={`${elem.id}`}
                >
                  x
                </a>
              </div>
              <div className="question">{elem.question}</div>
              {elem.variants ? (
                <>
                  <div>Варианты ответа:</div>
                  <ul>
                    {elem.Variants.map((variant) => (
                      <li>{variant.variant}</li>
                    ))}
                  </ul>
                </>
              ) : (
                <></>
              )}
              <div>Правильный ответ:</div>
              <div className="rightanswer">{elem.answer}</div>
              <a
                className="question_patch_link"
                href="#"
                data-id={`${elem.id}`}
              >
                Редактировать
              </a>
            </div>
          ))
        ) : (
          <div> В данной категории пока нет вопросов </div>
        )}

<div> Форма для добавления нового вопроса:</div>

        <form
          class="form_add_new_question"
          name="newQuestion"
          data-id={`${category.id}`}
          action="#"
        >
          <label>Вопрос:</label>
          <input className="question_area" type="text" name="question" />
          <label>Правильный ответ:</label>
          <input type="text" name="answer" />
          <label>
            Если предусмотрены варианты ответа, впишите их в поля ниже. Если
            нет, просто оставьте их пустыми
          </label>
          <label>Вариант 1:</label>
          <input type="text" name="variant1" />
          <label>Вариант 2:</label>
          <input type="text" name="variant2" />
          <label>Вариант 3:</label>
          <input type="text" name="variant3" />
          <label>Вариант 4:</label>
          <input type="text" name="variant4" />
          <input className='button_new_question' type="submit" value="Добавить новый вопрос" />
        </form>
      </Layout>{' '}
    </>
  );
};
