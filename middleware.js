const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';


const withAuth = async (req, res, next) => {
  const token =
    req.body.token ||
    req.query.token ||
    req.headers['x-access-token'] ||
    req.cookies.token;
  if (!token) {
    res.status(401).send('Unauthorized: No token provided');
  } else {
      try {
        const decoded = await jwt.verify(token, secret);
        req.email = decoded.email;
        next()
      } catch (error) {
        res.status(401).send('Unauthorized: Invalid token');
      }
  }
}
module.exports = withAuth;