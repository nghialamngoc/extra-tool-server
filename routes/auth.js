const router = require('express').Router();
const User = require('../models/User');
const message = require('../common/message');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../common/validation');

//REGISTER
router.post('/register',async ( req, res )=> {

  //LETS VALIDATE THE DATA
  const { error } = registerValidation(req.body);
  if( error ) return res.status(400).json(error.details[0].message);

  //Checking if the user is already in the database
  const emailExist = await User.findOne({ email: req.body.email });
  if( emailExist ) return res.status(400).json({ error_list : ["EMAIL_EXIST"] });

  //Hash passwords
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // validate done - create new user
  const use = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword
  });

  try{
    const savedUser = await use.save();
    message.requesMessage('POST', '/api/v1/user/register', req.body);
    res.status(201).json({ user: use._id });
  }catch(err){
    res.status(400).json(err);
  }
})

//LOGIN
router.post('/login', async ( req, res ) => {
  //Checking if the email doesn't exists
  const user = await User.findOne({ email: req.body.email });
  if( !user ) return res.status(400).json({ error_list : ["EMAIL_DOES_NOT_EXIST"] });

  //Checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if( !validPassword ) return res.status(400).json({ error_list : ["PASSWORD_INCORRECT"] });

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
  res.status(200).header('auth-token', token).json(token)
})

module.exports = router;