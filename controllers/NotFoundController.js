module.exports = class NotFoundController {
  static async notfound(req, res) {
    res.render('404');
  }
};
