const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(req, res) {
    if (req.session.userid) {
      res.redirect('/');
      return;
    }
    res.render('auth/login');
  }

  static async loginUser(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email: email } });

    if (!user) {
      req.flash('error-login', 'Usuário não encontrado. Verifique seu e-mail.');
      res.render('auth/login');
      return;
    }

    const passwordMatch = bcrypt.compareSync(password, user.password);

    if (!passwordMatch) {
      req.flash(
        'error-login',
        'Parece que o seu teclado está jogando contra você. Verifique sua senha.',
      );
      res.render('auth/login');
      return;
    }

    req.session.userid = user.id;
    req.flash('message', `Olá, ${user.name}!`);
    req.session.save(() => {
      res.redirect('/');
    });
  }

  static register(req, res) {
    if (req.session.userid) {
      res.redirect('/');
      return;
    }
    res.render('auth/register');
  }

  static async registerUser(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      req.flash(
        'error-register',
        'Ops! Houve um pequeno desentendimento entre a senha e a sua confirmação. Tente novamente!',
      );
      res.render('auth/register');
      return;
    }

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('error-register', 'Email já cadastrado');
      res.render('auth/register');
      return;
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const user = {
      name,
      email,
      password: hashedPassword,
    };

    try {
      const createdUser = await User.create(user);
      req.session.userid = createdUser.id;
      req.flash('message', 'Deu tudo certo, aproveite o Freethinking!');
      req.session.save(() => {
        res.redirect('/');
      });
    } catch (err) {
      console.log(err);
    }
  }

  static logout(req, res) {
    req.session.destroy();
    res.redirect('/login');
  }
};
