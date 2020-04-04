'use strict'

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcrypt')
const User = require('../models/user')
const passport = require('passport')


// Signup with username and password
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
      .then((user) => {
        req.login(user, function(err) {
          if (err) { return next(err); }
          return res.redirect('/');
        });
      })
      .catch(e => next(e))
    })
})

//Login with username and password
router.get('/login', (req, res, next) => {
  res.render('auth/login', {message: req.flash('error')})
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/auth/login',
  failureFlash: true
}))

//Google login (and signup)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email"
    ]
  })
)

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: '/',
    failureRedirect: "/auth/login"
  })
)

//Logout
router.get('/logout', (req, res, next) => {
  req.session.destroy(() =>{
    res.redirect('/auth/login')
  })
})

module.exports = router;