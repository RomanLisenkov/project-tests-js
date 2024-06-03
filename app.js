require('@babel/register');

const express = require('express');
const serverConfig = require('./config/serverConfig');
require('dotenv').config();
const { sequelize } = require('./db/models');
const app = express();

const indexRouter = require('./routes/index.routes');
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/users.routes');
const categoriesRouter = require('./routes/categories.routes');
const statisticRouter = require('./routes/statistic.routes');
const PORT = process.env.PORT ?? 3000;

serverConfig(app);

app.use('/', indexRouter);
app.use('/', authRouter);
app.use('/:username', usersRouter);
app.use('/categories', categoriesRouter);
app.use('/statistic', statisticRouter);

try {
  sequelize.authenticate();
} catch (error) {
  console.log({ ERROR_AUTHENTICATE: error });
}

app.listen(PORT, () => console.log(`***Server started at port: ${PORT}***`));
