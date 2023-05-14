/* const Post = require('../models/Post');
const User = require('../models/User'); */

module.exports = class PostController {
  static async showPosts(req, res) {
    res.render('posts/home');
  }
};
