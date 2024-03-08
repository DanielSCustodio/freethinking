const Post = require('../models/Post');
const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = class PostController {
  static async showPosts(req, res) {
    let search = '';
    let order = 'DESC';

    if (req.query.search) {
      search = req.query.search;
    }

    if (req.query.order === 'old') {
      order = 'ASC';
    }

    let posts = await Post.findAll({
      include: User,
      where: {
        content: { [Op.like]: `%${search}%` },
      },
      order: [['createdAt', order]],
    });

    posts = posts.map((result) => {
      const post = result.get({ plain: true });

      // Função para adicionar zeros à esquerda para números menores que 10
      const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);

      const createdAt = new Date(post.createdAt);
      const formattedDate =
        addLeadingZero(createdAt.getDate()) +
        '/' +
        addLeadingZero(createdAt.getMonth() + 1) +
        '/' +
        createdAt.getFullYear();
      post.createdAt = formattedDate;
      return post;
    });

    let seacrhLength = posts.length;
    res.render('posts/home', { posts, search, seacrhLength });
  }

  static async dashboard(req, res) {
    const { userid } = req.session;
    let emptyDashboard = false;

    let user = await User.findOne({
      where: {
        id: userid,
      },
      include: Post,
    });

    user = user.get({ plain: true });

    user.Posts = user.Posts.map((post) => {
      // Função para adicionar zeros à esquerda para números menores que 10
      const addLeadingZero = (number) => (number < 10 ? `0${number}` : number);

      const createdAt = new Date(post.createdAt);
      const formattedDate =
        addLeadingZero(createdAt.getDate()) +
        '/' +
        addLeadingZero(createdAt.getMonth() + 1) +
        '/' +
        createdAt.getFullYear();

      post.createdAt = formattedDate;
      return post;
    });

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

  static async updatePost(req, res) {
    const { id } = req.params;

    const post = await Post.findOne({ where: { id: id }, raw: true });

    res.render('posts/edit', { post });
  }

  static async updatePostSave(req, res) {
    const id = req.body.id;
    const content = {
      content: req.body.content,
    };

    try {
      await Post.update(content, { where: { id: id } });
      req.flash('update-post', 'Post atualizado com sucesso');
      req.session.save(() => {
        res.redirect('/posts/dashboard');
      });
    } catch (error) {
      console.log('Ocorreu um erro ==>', error);
    }
  }
};
