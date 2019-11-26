const router = require('express').Router();
const User = require('../models/User');
const message = require('../common/message');

//VALIDATION
const Joi = require('@hapi/joi');

const schema = Joi.object({
  name: Joi.string().min(6).required(),
  email: Joi.string().min(6).required().email(),
  password: Joi.string().min(6).required()
})

router.post('/register',async (req, res)=> {

  //LETS VALIDATE THE DATA
  const { error } = schema.validate(req.body)
  if(error) return res.status(400).json(error.details[0].message);

  const use = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  });

  try{
    const savedUser = await use.save();
    message.requesMessage('POST', '/api/v1/user/register', req.body);
    res.json(savedUser)
  }catch(err){
    res.status(400).json(err)
  }
})

module.exports = router;