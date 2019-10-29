'use strict';

require('dotenv').config()
const express = require('express');
const passportJWT = require('passport-jwt');;
let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
const bodyParser = require('body-parser');
const passport = require('./config/passport');
const cookieParser = require('cookie-parser')
const app = express();
const router = express.Router();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser())
app.use(express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/public/html');
app.use(passport.initialize());
app.use(router);

require('./routes/index.js')( router, passport);

app.listen(process.env.SERVER_PORT, function() {
  console.log(`Express is running on port ${process.env.SERVER_PORT}`);
});