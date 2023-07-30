const Post = require('../models/Post');
const User = require('../models/User');

module.exports = class PostController {
  static showPosts(_req, res) {
    res.render('posts/home');
  }

  static async dashboard(req, res) {
    const { userid } = req.session;

    let user = await User.findOne({
      where: {
        id: userid,
      },
      include: Post,
    });

    user = user.get({ plain: true });
    let emptyDashboard = false;

    if (user.Posts.length === 0) {
      emptyDashboard = true;
    }

    res.render('posts/dashboard', {
      posts: user.Posts.reverse(),
      emptyDashboard,
    });
  }

  static async createPostSave(req, res) {
    const post = {
      content: req.body.content,
      UserId: req.session.userid,
    };

    try {
      await Post.create(post);
      req.flash('created-post', 'Post criado com sucesso');
      req.session.save(() => {
        res.redirect('/posts/dashboard');
      });
    } catch (error) {
      console.log('Ocorreu um erro ==>', error);
    }
  }

  static async removePost(req, res) {
    const { id } = req.body;
    const { userid } = req.session;

    try {
      await Post.destroy({ where: { id: id, UserId: userid } });
      req.flash('destroy-post', 'Post removido com sucesso');
      req.session.save(() => {
        res.redirect('/posts/dashboard');
      });
    } catch (error) {
      console.log('Ocorreu um erro ==>', error);
    }
  }
};
