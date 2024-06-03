const React = require('react');
const Layout = require('../Layout');

module.exports = function StatisticPage({ statistics, user }) {
  return (
    <>
      <Layout title="Statistic" user={user}>
        <h1 className="title_page">Статистика</h1>
        <div className="statistic_wrapper">
          <div className="statistic_row row_head">
            <div className="statistic_cell">Пользователь</div>{' '}
            <div className="statistic_cell">Категория</div>
            <div className="statistic_cell">Правильных ответов</div>
            <div className="statistic_cell">Всего вопросов</div>
            <div className="statistic_cell">Дата</div>
          </div>
          {statistics.map((statistic) => (
            <div className="statistic_row">
              <div className="statistic_cell">{statistic.user}</div>
              <div className="statistic_cell">{statistic.category}</div>
              <div className="statistic_cell">{statistic.rightanswers}</div>
              <div className="statistic_cell">{statistic.questions}</div>
              <div className="statistic_cell date_cell">
                {statistic.createdAt
                  .toString()
                  .slice(0, statistic.createdAt.toString().indexOf('GMT'))}
              </div>
            </div>
          ))}
        </div>
      </Layout>
    </>
  );
};
