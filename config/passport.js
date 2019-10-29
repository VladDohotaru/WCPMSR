'use strict';

const passport = require('passport');
const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
const { getAccountAdmin } = require('../models/index.js');

let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
  let accountAdmin = getAccountAdmin({ id: jwt_payload.id });
  if (accountAdmin) {
    next(null, accountAdmin);
  } else {
    next(null, false);
  }
});

passport.serializeUser((accountAdmin, done) => {
  done(null, accountAdmin);
});

passport.deserializeUser((accountAdmin, done) => {
  done(null, accountAdmin);
});

passport.use(strategy);

module.exports = passport;