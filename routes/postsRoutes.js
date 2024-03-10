const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');
const { checkAuth } = require('../middleware/helpers/auth');
const {
  dashboardValidation,
} = require('../middleware/validations/dashboardValidation');

router.get('/dashboard', checkAuth, PostController.dashboard);
router.post(
  '/add',
  checkAuth,
  dashboardValidation,
  PostController.createPostSave,
);
router.get('/edit/:id', checkAuth, PostController.updatePost);
router.post('/edit/', checkAuth, PostController.updatePostSave);
router.post('/remove', checkAuth, PostController.removePost);
router.get('/', checkAuth, PostController.showPosts);

module.exports = router;
