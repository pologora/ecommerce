/* eslint-disable consistent-return */
const Product = require('../models/productModel');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.getProducts = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query).filter().sort().pagination()
    .limit();

  const products = await features.query;

  res.status(200).json({
    status: 'success',
    length: products.length,
    data: {
      products,
    },
  });
});

exports.createProduct = catchAsync(async (req, res) => {
  const product = await Product.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });

  if (!product) {
    return next(new AppError(`No product found with that ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Product id: ${id} successfully updated`,
    data: {
      product,
    },
  });
});

exports.getProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new AppError(`No product found with that ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findByIdAndDelete(id);

  if (!product) {
    return next(new AppError(`No product found with that ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    message: `Product ${id} successfully deleted`,
    data: null,
  });
});
