'use strict'

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')


// Signup page
router.get('/signup', (req, res, next) => {
  res.render('auth/signup')
})

router.post('/signup', (req, res, next) => {
  const { username, password } = req.body

  bcrypt.hash(password, 10)
    .then(hash => {
      return User.create({
        username: username,
        password: hash
      })
      .then(user => {
        res.render('lists/newlist', user)
      })
    })
})

module.exports = router;