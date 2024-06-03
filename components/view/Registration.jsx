const React = require('react');
const Layout = require('../Layout');

module.exports = function Registration({user}) {
  return (
    <Layout title="Registration" user = {user}>
      <h1 className="title_page" >Регистрация</h1>

      <form
        name="register"
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: '10px',
        }}
      >
        <label> Имя:</label>
        <input type="text" name="username" />
        <label> E-mail:</label>
        <input type="text" name="email" />
        <label>Пароль:</label>
        <input type="text" name="password" />
        <input className='auth_submit' type="submit" value="Зарегистрировать" />
      </form>
    </Layout>
  );
};
