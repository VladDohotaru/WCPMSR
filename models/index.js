'use strict';

const {
  Account,
	createAccount,
	getAllAccounts,
	getAccount,
} = require('./account');

const {
  AccountAdmin,
	createAccountAdmin,
	getAllAccountAdmins,
	getAccountAdmin,
} = require('./accountAdmin');

module.exports = {
  Account,
	createAccount,
	getAllAccounts,
  getAccount,
  AccountAdmin,
	createAccountAdmin,
	getAllAccountAdmins,
	getAccountAdmin,
}