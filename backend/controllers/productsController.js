const Product = require('../models/productModel');

exports.getProducts = async (req, res) => {
  const queryObj = { ...req.query };
  const excludedFields = ['page', 'sort', 'limit', 'fields'];

  excludedFields.forEach((el) => delete queryObj[el]);

  let queryStr = JSON.stringify(queryObj);
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`);

  const query = Product.find(JSON.parse(queryStr));

  if (queryObj.sort) {
    const sortBy = queryObj.sort.split(',').join(' ');
    query.sort(sortBy);
  }

  const products = await query;

  res.status(200).json({
    status: 'success',
    length: products.length,
    data: {
      products,
    },
  });
};

exports.createProduct = async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
};

exports.updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  res.status(200).json({
    status: 'success',
    message: `Product id: ${id} successfully updated`,
    data: {
      product,
    },
  });
};

exports.getProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
};

exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  res.status(200).json({
    status: 'success',
    message: `Product ${id} successfully deleted`,
    data: null,
  });
};
