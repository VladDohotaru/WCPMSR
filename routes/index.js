'use strict';

require('dotenv').config()
const jwt = require('jsonwebtoken');
const passportJWT = require('passport-jwt');
let ExtractJwt = passportJWT.ExtractJwt;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = process.env.JWT_SECRET;
const {
  Account,
	createAccount,
	getAllAccounts,
  getAccount,
  AccountAdmin,
	createAccountAdmin,
	getAllAccountAdmins,
	getAccountAdmin,
} = require('../models/index.js');
const passwordCheck = require('../config/checkPassword');
const requireLogin = require('../middlewares/requireLogin');


module.exports = (router, passport) => {
	router.get('/', requireLogin, (req, res) => {
		res.render('index.html')
	});
		
	router.post('/register', async (req, res) => {
		const { username, password } = req.body;
		const AccountAdmin = await createAccountAdmin({ username, password });
		res.json({ AccountAdmin, msg: 'Account Admin created successfully' });	
	});
		
	router.get('/login', (req, res) => {
		res.render('login.html');
	});
		
	router.get('/register', (req, res) => {
		res.render('register.html');
	});
		
	router.post('/login', async (req, res) => {
		const { username, password } = req.body;
		if (username && password) {
      let AccountAdmin = await getAccountAdmin({ username: username });
			if (!AccountAdmin) {
				res.status(401).redirect('/login', { message: 'No such Account Admin found' });
			}
			if (false === passwordCheck(password, AccountAdmin.password)) {
				res.status(401).json({ msg: 'Password is incorrect' });
				return done(null, false);
			} else {
				// from now on we'll identify the user by the id and the id is the 
				// only personalized value that goes into our token
				let payload = { id: AccountAdmin.id };
				let token = jwt.sign(payload, jwtOptions.secretOrKey);
				res.cookie('Authorization', token);
				res.redirect('/');
			}
		}
	});


	router.get('/users', (req, res) => {
		res.render('users.html');
	});
}