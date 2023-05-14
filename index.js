const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
require('custom-env').env('development.local');

const app = express();

//Conexão
const connection = require('./db/connection');

//Models
const Post = require('./models/Post');
const User = require('./models/User');

//Template Engine
app.engine('handlebars', exphbs.engine());

app.set('view engine', 'handlebars');

//Arquivos Estáticos
app.use(express.static('public'));

//Cpaturar body
app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(express.json());

//Sessão
app.use(
  session({
    name: 'session',
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () {},
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 360000),
      httpOnly: true,
    },
  }),
);

//Mensagens Flash
app.use(flash());
app.use((req, res, next) => {
  if (req.session.userid) {
    res.locals.session = req.session;
  }
  next();
});

connection.sync(/* { force: true } */).then(() => {
  app.listen(process.env.PORT, () => {
    console.log(`Aplicação em execução na porta ${process.env.PORT}`);
  });
});
