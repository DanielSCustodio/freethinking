module.exports.checkAuth = function (req, res, next) {
  if (!req.session.userid) {
    console.log('pAssou ayui');
    res.redirect('/login');
    return;
  }
  next();
};
