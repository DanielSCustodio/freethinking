const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const flash = require('express-flash');
require('custom-env').env('development.local');

//Models
/* const Post = require('./models/Post');
const User = require('./models/User'); */

//Routes
const postsRoutes = require('./routes/postsRoutes');
const authRotes = require('./routes/authRotes');

//middleware
const { checkAuth } = require('./middleware/helpers/auth');

const app = express();

//Conexão
const connection = require('./db/connection');

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

//Seção
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
      maxAge: 360000000,
      expires: new Date(Date.now() + 360000000), // 5 dias
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

//Routes
app.use('/posts', checkAuth, postsRoutes);
app.use('/', authRotes);
app.get('/', checkAuth, (req, res) => {
  res.redirect('/posts');
});
//app.use('/', NotFoundController.notfound);

connection
  .sync({
    /* force: true, */
  })
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Aplicação em execução na porta ${process.env.PORT}`);
    });
  })
  .catch((err) => console.log(err));
