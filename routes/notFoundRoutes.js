const express = require('express');
const router = express.Router();
const NotFoundController = require('../controllers/NotFoundController');

//Controller

router.get('/', NotFoundController.notfound);

module.exports = router;
