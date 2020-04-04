const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const List = require('../models/list')

//Create new list
router.get('/newlist', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  // req.user
  res.render('lists/newlist', { user: req.user });
});

router.post('/newlist', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  List.create({
    listName: req.body.listName,
    listDescription: req.body.listDescription,
    owner: req.user._id
  })
  .then(list => {
    res.redirect('mylists')
  })
})

//My lists (view all user lists)
router.get('/mylists', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  List.find({
    owner: req.user._id
  })
  .then(lists => {
    res.render('lists/mylists', { lists, user });
  })
  .catch(e => next(e))
});

//Delete list by id
router.get('/delete/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  List.deleteOne({_id:req.params.id})
  .then(() => {
      res.redirect('/lists/mylists')
  })
  .catch(e => {
      console.log(e)
  })
})

//Edit list by id
router.get('/edit/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  List.findById(req.params.id)
  .then(list => {
      res.render('lists/editlist', { list, user })
  })
})

router.post('/edit/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  List.updateOne({_id:req.params.id}, {listName:req.body.listName, listDescription:req.body.listDescription})
  .then(() => {
      res.redirect('/lists/mylists')
  })
  .catch(e => {
      console.log(e)
  })
})

module.exports = router;