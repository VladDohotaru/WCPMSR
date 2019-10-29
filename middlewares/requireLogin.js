'use strict';

const jwt = require("jsonwebtoken");
  
const  requireLogin = (req, res, next) => {
  const token = req.cookies["Authorization"];
  if (!token) return res.status(401).send("Access denied. No token provided.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = requireLogin;