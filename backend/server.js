const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const connectBase = require('./utils/connectBase');

connectBase().catch((err) => console.log(err));

const port = process.env.PORT;
const server = app.listen(port, () => console.log(`Server running on port: ${port}`));

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
