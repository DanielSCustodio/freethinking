const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(_req, res) {
    res.render('auth/login');
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
        'message',
        'Ops! Houve um pequeno desentendimento entre a senha e a sua confirmação. Tente novamente!',
      );
      res.render('auth/register');
      return;
    }

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('message', 'Email já cadastrado');
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
      req.flash('message', 'Cadastro realizado com sucesso');
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
