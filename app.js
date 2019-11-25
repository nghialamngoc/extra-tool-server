const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
require('dotenv/config')

//Middleware
app.use(bodyParse.json())

//Routes
const authRouter = require('./routes/auth');

app.use('/api/v1/user', authRouter)
//Connect to Db
const mongoseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true
}
mongoose.connect(process.env.DB_URL, mongoseConfig)
  .then(
    () => { console.log("mongoDB connect is success") },
    err => { console.log('can\'t connect to mongoDB ', err) }
  );
//Listen to sever
app.listen(3000, ()=> {
  console.log('Sever is running on post 3000')
});
