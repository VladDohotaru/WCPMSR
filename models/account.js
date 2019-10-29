'use strict';

const Sequelize = require('sequelize');
const connection = require('../config/db.js');

const accountOptions = {
  firstname: {
    type:      Sequelize.STRING,
    unique:    false,
    allowNull: false
  },
  lastname: {
    type:      Sequelize.STRING,
    unique:    false,
    allowNull: false
  },
  username: {
    type:      Sequelize.STRING,
    unique:    false,
    allowNull: false
  },
  email: {
    type:      Sequelize.STRING,
    unique:    false,
    allowNull: false
  },
  phoneNumber: {
    type:      Sequelize.STRING,
    unique:    false,
    allowNull: false
  },
  dateOfBirth: {
    type:      Sequelize.DATE,
    unique:    false,
    allowNull: false
  },
};

let Account = connection.define('Account', accountOptions);
Account.sync()
  .then(() => console.log('Oh yeah! Tabela Account created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

const createAccount = async (response) => {
  try {
    return await Account.create(response);
  } catch (createAccountError) {
    return Promise.reject(createAccountError);
  }
};

const getAllAccounts = async () => {
  try {
    const {
      count,
      rows
    } = await Account.findAndCountAll();
    return {
      count,
      rows
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAccount = async obj => {
  return await Account.findOne({
    where: obj,
  });
};

module.exports = {
	Account,
	createAccount,
	getAllAccounts,
	getAccount,
};