const express = require('express');

const { sinup, login } = require('../controllers/authController');
const { getAllUsers } = require('../controllers/userController');

const router = express.Router();

router.route('/sinup').post(sinup);
router.route('/login').post(login);

router.route('/').get(getAllUsers);
// router.route('/:id').get(getUser).delete(deleteUser).update(updateUser);

module.exports = router;
