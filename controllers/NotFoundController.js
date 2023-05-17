module.exports = class NotFoundController {
  static async notfound(_req, res) {
    res.render('404');
  }
};
