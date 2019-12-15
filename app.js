const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParse = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv/config')

//Middleware
app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());
app.use(cookieParser(process.env.COOKIE_PARSER_SECRET));

//CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://sharing-and-learning-3381c.firebaseapp.com/');
  res.header('Access-Control-Allow-Credentials', 'true')
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  )
  if(req.method === 'OPTIONS'){
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATH, DELETE');
    return res.status(200).json({})
  };
  next();
})

//Routes
const authRouter = require('./routes/auth');

app.use('/api/v1/user', authRouter);
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
app.listen(process.env.PORT || 3000);
