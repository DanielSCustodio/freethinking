const Post = require('../models/Post');
/*const User = require('../models/User'); */

module.exports = class PostController {
  static showPosts(_req, res) {
    res.render('posts/home');
  }

  static dashboard(_req, res) {
    res.render('posts/dashboard');
  }

  static createPost(_req, res) {
    res.render('posts/create');
  }

  static async createPostSave(req, res) {
    const post = {
      content: req.body.content,
      UserId: req.session.userid,
    };

    try {
      await Post.create(post);
      req.flash('created-post-success', 'Post criado com sucesso');
      req.session.save(() => {
        res.redirect('/posts/dashboard');
      });
    } catch (error) {
      console.log('Ocorreu um erro ==>', error);
    }
  }
};
