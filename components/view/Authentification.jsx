const React = require('react');
const Layout = require('../Layout');

module.exports = function Authentification({ user }) {
  return (
    <Layout title="Authentification" user={user}>
      <h1 className="title_page">Войти</h1>

      <form
        name="auth"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <label > E-mail:</label>
        <input type="text" name="email" />
        <label >Пароль:</label>
        <input type="text" name="password" />
        <input className='auth_submit' type="submit" value="Войти" />
      </form>
    </Layout>
  );
};
