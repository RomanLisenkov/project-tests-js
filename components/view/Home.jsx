const React = require('react');
const Layout = require('../Layout');

module.exports = function Home({ user, categories }) {
  return (
    <>
      <Layout title="Home" user={user}>
        {categories.map((category) => (
          <a className="category_link" href={`categories/${category.id}`}>
            <div className="card_category">{category.title}</div>
          </a>
        ))}
      </Layout>
    </>
  );
};
