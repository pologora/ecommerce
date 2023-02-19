const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product must have a name'],
    trim: true,
    unique: true,
  },
  mpn: {
    type: String,
    required: [true, 'Product must have a serial number'],
    trim: true,
  },
  images: [
    {
      type: [String],
      required: [true, 'Product must have an image'],
      trim: true,
    },
  ],
  prices: [
    {
      price: {
        type: Number,
        required: [true, 'Poduct must have a price'],
        min: 0,
      },
      old_price: {
        type: Number,
        min: 0,
      },
      currency: {
        type: String,
        enum: ['EUR', 'USD', 'PLN', 'GBP', 'INR'],
      },
    },
  ],
  info: {
    type: String,
    trim: true,
  },
  main: {
    cpu_type: {
      type: String,
      trim: true,
    },
    cpu_implementation: {
      type: String,
      trim: true,
    },
    cpu_number_of_cores: {
      type: Number,
      min: 1,
      max: 32,
    },
    display_size__inch: {
      type: Number,
      min: 0.1,
      max: 32,
    },
    memory_ram__gb: {
      type: Number,
      min: 1,
    },
    storage_type: {
      type: String,
      trim: true,
    },
    storage_capacity__gb: {
      type: Number,
      min: 1,
    },
    design_color_name: {
      type: String,
      trim: true,
    },
  },
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
