require('dotenv').load();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const port = process.env.APP_PORT;
const routes = require('./server/routes');
const models = require('./server/models');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'app')));

routes(app);

app.use('*', (req, res) => {
  return res.sendFile(__dirname, 'app/index.html');
});

models.sequelize.sync().then(() => {
  console.log('database tables migrated');
});

app.listen(port, () => {
  console.log('Application listening on port ' + port);
});
