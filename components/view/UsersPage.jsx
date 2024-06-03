const React = require('react');
const Layout = require('../Layout');

module.exports = function Profile({ user, categories }) {
  return (
    <>
      <Layout title="User page" user={user}>
        <h1 className="title_page">Привет, {user.username}!</h1>
        <div className="wrapper_user_page">
          {categories.map((category) => (
            <div className="card_category">
              {' '}
              <a
                id={`${category.id}`}
                className="category_link"
                href={`/users/categories/${category.id}`}
              >
                {category.title}
              </a>
              <a
                className="category_link_remove"
                href={`#`}
                data-id={`${category.id}`}
              >
                x
              </a>
              <a
                className="category_link_patch"
                href={`#`}
                data-id={`${category.id}`}
              >
                редактировать
              </a>
            </div>
          ))}
          <a className="category_link" id="addCategory" href="#">
            <div className="card_category">Добавить</div>
          </a>
        </div>
      </Layout>
    </>
  );
};
