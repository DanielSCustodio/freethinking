const express = require('express');
const router = express.Router();
const PostController = require('../controllers/PostController');

//Controller

router.get('/', PostController.showPosts);

module.exports = router;
