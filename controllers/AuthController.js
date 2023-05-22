const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = class AuthController {
  static login(_req, res) {
    res.render('auth/login');
  }

  static register(_req, res) {
    res.render('auth/register');
  }

  static async registerUser(req, res) {
    const { name, email, password, confirmpassword } = req.body;

    if (password !== confirmpassword) {
      req.flash(
        'conflict',
        'Ops! Houve um pequeno desentendimento entre a senha e a sua confirmação. Tente novamente!',
      );

      res.render('auth/register');

      return;
    }

    const checkIfUserExists = await User.findOne({ where: { email: email } });

    if (checkIfUserExists) {
      req.flash('conflict', 'Email já cadastrado');
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
      await User.create(user);
      req.flash('ok', 'Cadasttro realizado com sucesso');
      res.redirect('/');
    } catch (err) {
      console.log(err);
    }
  }
};
