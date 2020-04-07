const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const List = require('../models/list');
const Item = require('../models/item')

//Create new item
router.get('/newitem', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  List.find({
    owner: req.user._id
  })
  .then(lists => {
    res.render('items/newitem', { lists, user });
  })
  .catch(e => next(e))
});

router.post('/newitem', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const listId = req.body.listId
  Item.create({
    itemName: req.body.itemName,
    itemNotes: req.body.itemNotes,
    // itemUrl: req.body.itemUrl,
    // itemPrice: req.body.itemPrice,
    listId: req.body.listId
  })
  .then(() => {
    res.redirect('/items/listview/' + listId)
  })
  .catch(e => next(e))
})

//View items in the list
router.get('/listview/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  // How to get list name?
  List.findById(req.params.id)
  .then()
  // 
  Item.find({
    listId: req.params.id
  })
  .then(items => {
    res.render('items/listview', { items, user });
  })
  .catch(e => next(e))
});

module.exports = router;