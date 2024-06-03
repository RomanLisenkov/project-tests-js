const React = require('react');

module.exports = function Layout({ children, title, user }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        <link rel="stylesheet" href="/css/style.css" />
        <script defer src="/js/index.js" />
      </head>
      <body>
        <header>
          {' '}
          <div className='header'>
            {' '}
            <a className='header_link' href="/">Главная</a>
            {user ? (
              <>
                <a className='header_link' href={`/users/categories`}>{user.username}</a>
                <a className='header_link' href="/signout">Выйти</a>
                <a className='header_link' href="/statistic">Статистика</a>
              </>
            ) : (
              <>
                <a className='header_link' href="/signin">Войти</a>
                <a className='header_link' href="/signup">Регистрация</a>

                <a className='header_link' href="/statistic">Статистика</a>
              </>
            )}
          </div>
        </header>
        <div className="wrapper">{children}</div>
      </body>
    </html>
  );
};
