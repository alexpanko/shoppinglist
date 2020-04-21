const express = require('express');
const router  = express.Router();
const List = require('../models/list')
const Item = require('../models/item')

//Explore section
router.get('/explore', (req, res, next) => {
  req.user
  res.render('explore/explore', { user: req.user });
});

//Baby feeding
router.get('/baby-feeding', (req, res, next) => {
  const user = req.user
  const listId = "5e9a00d5aa9a2d0017821c5f"
  const list = List.findById(listId)
  const item = Item.find({listId: listId})
  Promise.all([list, item])
  .then(values => {
    res.render('explore/article', {values, user });
  })
  .catch(e => next(e))
});

//Baby room
router.get('/baby-room', (req, res, next) => {
  const user = req.user
  const listId = "5e9b346ed78f5f001729164d"
  const list = List.findById(listId)
  const item = Item.find({listId: listId})
  Promise.all([list, item])
  .then(values => {
    res.render('explore/article', {values, user });
  })
  .catch(e => next(e))
});

//Mobility: city stroller and car seat
router.get('/city-stroller', (req, res, next) => {
  const user = req.user
  const listId = "5e9b2272d78f5f0017291644"
  const list = List.findById(listId)
  const item = Item.find({listId: listId})
  Promise.all([list, item])
  .then(values => {
    res.render('explore/article', {values, user });
  })
  .catch(e => next(e))
});

//Baby monitors
router.get('/baby-monitors', (req, res, next) => {
  const user = req.user
  const listId = "5e9ed3f063f1af0017f3c3f4"
  const list = List.findById(listId)
  const item = Item.find({listId: listId})
  Promise.all([list, item])
  .then(values => {
    res.render('explore/article', {values, user });
  })
  .catch(e => next(e))
});

module.exports = router;