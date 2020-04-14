const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const List = require('../models/list');
const Item = require('../models/item')

// //Create new item
// router.get('/newitem/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
//   // const list = List.findById(req.params.id)
//   // const listId = req.params.id
//   const user = req.user
//   List.find({
//     owner: req.user._id
//   })
//   .then(lists => {
//     console.log(list)
//     res.render('items/newitem', { lists, user, list});
//   })
//   .catch(e => next(e))
// });

//Create new item
router.get('/newitem/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  const currentList = List.findById(req.params.id)
  const allLists = List.find({ owner: req.user._id })
  Promise.all([currentList, allLists])
  .then(values => {
    res.render('items/newitem', { values, user });
  })
  .catch(e => next(e))
});

router.post('/newitem', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const listId = req.body.listId
  Item.create({
    itemName: req.body.itemName,
    itemNotes: req.body.itemNotes,
    itemUrl: req.body.itemUrl,
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
  const list = List.findById(req.params.id)
  const item = Item.find({listId: req.params.id})
  Promise.all([list, item])
  .then(values => {
    res.render('items/listview', {values, user });
  })
  .catch(e => next(e))
});

//Delete item by id
router.get('/listview/:listId/delete/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const listId = req.params.listId
  Item.deleteOne({_id:req.params.id})
  .then(() => {
      res.redirect('/items/listview/' + listId)
  })
  .catch(e => {
      console.log(e)
  })
})

//Edit list by id
router.get('/edit/:id', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  Item.findById(req.params.id)
  .then(item => {
      res.render('items/edititem', { item, user })
  })
})

module.exports = router;