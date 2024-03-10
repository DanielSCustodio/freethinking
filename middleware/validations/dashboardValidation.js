const Post = require('../../models/Post');
const User = require('../../models/User');

module.exports.dashboardValidation = async function (req, res, next) {
  const { content } = req.body;
  const { userid } = req.session;

  let user = await User.findOne({
    where: {
      id: userid,
    },
    include: Post,
  });

  user = user.get({ plain: true });

  user.Posts = user.Posts.map((post) => {
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

  if (content.length < 5) {
    req.flash('validation', 'Este campo deve conter pelo menos 5 caracteres.');
    res.render('posts/dashboard', {
      posts: user.Posts.reverse(),
    });
    return;
  }
  next();
};
