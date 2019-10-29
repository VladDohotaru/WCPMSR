'use strict';

const Sequelize = require('sequelize');
const connection = require('../config/db.js');
const encryption = require('../config/passwordEncryption.js');

const accountAdminOptions = {
  username: {
    type:      Sequelize.STRING,
    unique:    true,
    allowNull: false,
    validate:  {
      len: {
        args: [6, 25],
        msg:  'Minimum 6, maximum 25 charachters'
      }
    }
  },
  password: {
    unique:    true,
    allowNull: false,
    type:      Sequelize.STRING,
    validate:  {
      len: {
        args: [6,1024],
      }
    }
  }
};

let AccountAdmin = connection.define('accountAdmin', accountAdminOptions);
AccountAdmin.sync()
  .then(() => console.log('Oh yeah! accountAdmin table created successfully'))
  .catch(err => console.log('BTW, did you enter wrong database credentials?'));

const createAccountAdmin = async ({ username, password, type }) => {
  try {
    console.log('Create AccountAdmin', username, password)
    let securedPassword = encryption(password);
    await AccountAdmin.create({ username, password: securedPassword });
  } catch (createUserError) {
    return Promise.reject(createAccountAdminError);
  }
};

const getAllAccountAdmins = async () => {
  try {
    const {
      count,
      rows
    } = await AccountAdmin.findAndCountAll();
    return {
      count,
      rows
    }
  } catch (error) {
    return Promise.reject(error);
  }
};

const getAccountAdmin = async obj => {
  return await AccountAdmin.findOne({
    where: obj,
  });
};

module.exports = {
	AccountAdmin,
	createAccountAdmin,
	getAllAccountAdmins,
	getAccountAdmin,
};