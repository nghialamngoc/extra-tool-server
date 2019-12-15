const router = require('express').Router();
const User = require('../models/User');
const message = require('../common/message');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { registerValidation } = require('../common/validation');
const validateToken = require('../common/verifyToken');

//GET INFO OF USE
router.get('/', validateToken, async (req, res) => {
  const user = await User.findById(req.userid);
  res.status(200).json({
    status: 'success',
    data: {
      name: user.name,
      rol: user.rol,
      avatar: user.avatar
    }
  })
})
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
  if( !user ) return res.status(200).json({
    status: "error",
    error_code : "EMAIL_OR_PASSWORD_INCORRECT"
  });

  //Checking password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if( !validPassword ) return res.status(400).json({
    status: "error",
    error_code : "EMAIL_OR_PASSWORD_INCORRECT"
  });

  //create and assign token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, { expiresIn: '1d' });

  //save to cookie
  res.cookie('_actk', token, {
    maxAge: 24 * 3600000,
    httpOnly: true,
    // secure: true,
    signed: true
  });
  res.status(200).json({
    status: "success",
    data: {
      name: user.name,
      rol: user.rol,
      avatar: user.avatar
    }
  })
})

//LOGOUT
router.get('/logout', ( req, res ) => {
  //Clear cookies
  res.clearCookie('_actk', {
    httpOnly: true,
    signed: true
  });
  res.status(200).json({
    status: "success"
  })
})

module.exports = router;