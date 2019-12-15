const jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
  const token = req.signedCookies._actk;
  console.log(token)
  if( !token ) return res.json({
    status: "error",
    error_code: "access_denied"
  });

  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userid = verified._id;
    next();
  } catch (error) {
    res.status(400).json({ error_list: ["INVALID_TOKEN"] })
  }
}