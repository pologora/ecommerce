const express = require('express');

const { sinup, login } = require('../controllers/authController');

const router = express.Router();

router.route('/sinup').post(sinup);
router.route('/login').post(login);

module.exports = router;
