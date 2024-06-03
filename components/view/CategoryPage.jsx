const React = require('react');
const Layout = require('../Layout');

module.exports = function Category({ user, category, quantityQuestions }) {
  return (
    <Layout title="Category" user={user}>
      <h2>Вы выбрали категорию {category.title}</h2>
      <div>
        Количество вопросов в данной категории:
        {quantityQuestions}
      </div>
      <div>Описание категории:</div>
      <div>{category.description}</div>
      <div>Нажмите кнопку "Играть" для начала игры</div>
      <a className='play_link'
        href={`/categories/${category.id}/questions/1`}
        data-id={category.id}
        name="play"
      >
        Играть
      </a>
    </Layout>
  );
};
