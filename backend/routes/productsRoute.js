const express = require('express');
const { protect } = require('../controllers/authController');

const {
  getProducts,
  createProduct,
  getProduct,
  deleteProduct,
  updateProduct,
} = require('../controllers/productsController');

const router = express.Router();

router.route('/').get(protect, getProducts).post(createProduct);
router.route('/:id').get(getProduct).patch(updateProduct).delete(deleteProduct);

module.exports = router;
