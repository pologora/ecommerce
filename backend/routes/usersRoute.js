const express = require('express');

const {
  getAllUsers,
  deleteUserById,
  getUserById,
  updateUser,
} = require('../controllers/userController');

const router = express.Router();

router.route('/').get(getAllUsers);
router.route('/:id').get(getUserById).delete(deleteUserById).patch(updateUser);

module.exports = router;
