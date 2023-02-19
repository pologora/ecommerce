const fs = require('fs');
const connectBase = require('../utils/connectBase');
const Product = require('../models/productModel');

connectBase().catch((err) => console.log(err));

const products = JSON.parse(
  fs.readFileSync(
    'C:\\Users\\zloil\\Documents\\praca_inzynierska\\ecommerce\\backend\\data\\products\\json\\products10.json',
    'utf-8',
  ),
);

const importData = async () => {
  try {
    await Product.create(products);
    console.log('Data successfully loaded');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Product.deleteMany();
    console.log('Data deleted from base');
    process.exit();
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv === '--delete') {
  deleteData();
}
