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
  const listId = "5e9772eea4eabc196878ee34"
  const list = List.findById(listId)
  const item = Item.find({listId: listId})
  Promise.all([list, item])
  .then(values => {
    res.render('explore/baby-feeding', {values, user });
  })
  .catch(e => next(e))
});

module.exports = router;