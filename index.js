const express = require('express');
const exphbs = require('express-handlebars');
const sessions = require('express-session');
const FileStore = require('session-file-store')(sessions);
const flash = require('express-flash');
require('custom-env').env('development.local');

const app = express();

const connection = require('./db/connection');

connection.sync().then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Aplicação em execução na porta ${process.env.PORT}`);
  });
});
