// use "import" to import libraries
import express from 'express';
import cors from 'cors';

// use "require" to import JSON files
const admins = require('./data/admins.json');
const superAdmins = require('./data/super-admins.json');
const superAdminsRouter = require('./resources/super-admins').default;

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());
app.use('/super-admins', superAdminsRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.get('/admins', (req, res) => {
  res.status(200).json({
    data: admins,
  });
});
app.get('/SuperAdmins', (req, res) => {
  res.status(200).json({
    data: superAdmins,
  });
});
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening on port ${port}`);
});
