const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.header('auth-token');
  if( !token ) return res.status(401).json({ error_list: ["ACCESS_DENIED"] });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified)
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ error_list: ["INVALID_TOKEN"] })
  }
}