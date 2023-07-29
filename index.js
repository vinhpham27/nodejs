const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');
const cors = require('cors');

const app = express();
const port = 8080;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());
app.use(router);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});