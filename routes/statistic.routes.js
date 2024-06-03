const router = require('express').Router();
const StatisticPage = require('../components/view/StatisticPage');
const { Statistic } = require('../db/models');

router.get('/', async (req, res) => {
  const statistics = await Statistic.findAll();
  
  res.renderComponent(StatisticPage, {
    user: res.locals.user,
    statistics,
  });
});

module.exports = router;
