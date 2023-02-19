/* eslint-disable no-await-in-loop */
/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
const axios = require('axios');
const fs = require('fs');
const jsonData = require('../data/products/json/laptops_10.json');

const apiResponse = jsonData;

async function downloadImage(url, filename) {
  const response = await axios({
    method: 'GET',
    url,
    responseType: 'stream',
  });
  response.data.pipe(fs.createWriteStream(filename));
}

async function main() {
  const products = [];
  for (const laptop of apiResponse) {
    let i = 1;
    const images = [];
    if (!laptop.images) laptop.images = [];
    for (const image of laptop.images) {
      const { url } = image;
      const filename = `${laptop.name.trim().replaceAll(' ', '_')}_${i}.jpg`;
      // await downloadImage(url, `${__dirname}/../data/products/images/${filename}`);
      i += 1;
      console.log(`Downloaded image ${filename}`);
      images.push(`${filename}`);
    }
    laptop.images = images;
    products.push(laptop);
  }
  fs.writeFileSync(
    `${__dirname}/../data/products/json/products10.json`,
    JSON.stringify(products, null, 2),
  );
  console.log('JSON data file updated with local image paths');
}

main();
