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
        'content',
        'Ops! Houve um pequeno desentendimento entre a senha e a sua confirmação. Tente novamente!',
      );

      req.flash('test', 'Teste');
      res.render('auth/register');

      return;
    }
  }
};
