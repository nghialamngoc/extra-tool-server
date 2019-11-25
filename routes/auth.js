const router = require('express').Router();
const User = require('../models/User');
const message = require('../common/message');

router.post('/register',async (req, res)=> {
  const use = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  })

  try{
    const savedUser = await use.save();
    message.requesMessage('POST', '/api/v1/user/register', req.body);
    res.json(savedUser)
  }catch(err){
    res.status(400).json(err)
  }
})

module.exports = router;