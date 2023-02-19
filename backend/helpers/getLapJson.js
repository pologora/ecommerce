/* eslint-disable no-console */
// get laptops data from API
const axios = require('axios');
const fs = require('fs');

const pageSize = 10;
const pagesQuantityGet = 1;

const baseUrl = `https://api.device-specs.io/api/laptops?populate=*&pagination[pageSize]=${pageSize}`;
const token = '9915dd9dc4f6d4daf2636abc91559ff210e8ed860f6fd077048fa23791ad1efd866a23ced557c47e7ebaba4c2decc2866bb183f7e576e41e06f440e2afa1531b67d6d3e07e3e1eee03ae84a7b31ab2bd47e84ffd75c200193095feea2e9f85b929c99cc5913e778c19ccec3eed07d244e9d599eff300207fada5b372b6894788';

const options = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

const results = [];

async function getPage(page) {
  const url = `${baseUrl}&pagination[page]=${page}`;
  const response = await axios.get(url, options);
  results.push(...response.data.data);
  console.log(`Saved page ${page}`);
}

async function main() {
  for (let page = 1; page <= pagesQuantityGet; page++) {
    // eslint-disable-next-line no-await-in-loop
    await getPage(page);
  }
  fs.writeFileSync('laptops_10.json', JSON.stringify(results, null, 2));
  console.log('Done');
}

main();
