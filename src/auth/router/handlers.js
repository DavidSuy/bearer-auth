'use strict';

const { users } = require('../models/index.js');

async function handleSignup(req, res, next) {
  if (!req.body) {
    next('Please include username and password');
  }

  try {
    // console.log(req.body);
    let userRecord = await users.create(req.body);
    const output = {
      user: userRecord,
      token: userRecord.token,
    };
    res.status(201).json(output);
  } catch (e) {
    console.log(e);
    next(e);
  }
}

async function handleSignin(req, res, next) {
  try {
    // console.log(`user: ${req.user.token}`);
    const user = {
      user: req.user,
      token: req.user.token,
    };
    // console.log('xxtnauhnoteuhaoenthuaoethuotehu');

    // console.log(`user: ${user.token}`);
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

async function handleGetUsers(req, res, next) {
  try {
    const userRecords = await users.findAll({});
    const list = userRecords.map((user) => user.username);
    res.status(200).json(list);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

function handleSecret(req, res, next) {
  res.status(200).send('Welcome to the secret area!');
}

module.exports = {
  handleSignup,
  handleSignin,
  handleGetUsers,
  handleSecret,
};