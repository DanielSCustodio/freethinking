/* const Post = require('../models/Post');
const User = require('../models/User'); */

module.exports = class PostController {
  static async showPosts(_req, res) {
    res.render('posts/home');
  }

  static async dashboard(_req, res) {
    res.render('posts/dashboard');
  }

  static createPost(_req, res) {
    res.render('posts/create');
  }
};
