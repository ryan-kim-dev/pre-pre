const express = require('express');
const app = express();
const port = 5000;
const cors = require('cors');
// 몽고디비 연결
const mongoose = require('mongoose');
// 몽고디비 환경변수 연결
const db = require('./config/keys');

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  // useNewUrlParser, useUnifiedTopology, useFindAndModify, and useCreateIndex are no longer supported options. Mongoose 6 always behaves as if useNewUrlParser, useUnifiedTopology, and useCreateIndex are true, and useFindAndModify is false. Please remove these options from your code.
  mongoose
    .connect(db.mongoURI)
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(`${err}`));
});
