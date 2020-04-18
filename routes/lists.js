const express = require('express');
const router  = express.Router();
const ensureLogin = require("connect-ensure-login");
const List = require('../models/list')

// Unsplash API >>>
const fetch = require('node-fetch');
global.fetch = fetch;
const Unsplash = require('unsplash-js').default;
const toJson = require('unsplash-js').toJson;
const unsplash = new Unsplash({
  accessKey: process.env.UNSPLASH_ACCESS_KEY, 
});
// <<<

//Create new list
router.get('/newlist', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  // req.user
  res.render('lists/newlist', { user: req.user });
});

router.post('/newlist', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const newList = List.create({
    listName: req.body.listName,
    listDescription: req.body.listDescription,
    listImage: req.body.listImage,
    owner: req.user._id
  })
  .then(newList => {
    // res.redirect('mylists')
    res.redirect('/lists/listimage/' + newList.id)
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

//START: SELECT AND CHANGE LIST IMAGE WITH UNSPLASH API
//Render page with search form for Unsplash API
router.get('/listimage/:listId', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  const listId = req.params.listId
  res.render('lists/listimage', { listId, user })
})

//Search image with Unsplash API
router.post('/listimage', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  const listId = req.body.listId
  unsplash.search.photos(req.body.searchImage, 1, 30, { orientation: "landscape" })
  .then(toJson)
  .then(json => {
    res.render('lists/listimage', { json, user, listId } )
  })
})

//Udate list with selected image
router.get('/updatelistimage', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  List.updateOne({_id:req.query.id}, {listImage:req.query.imageurl})
  .then(() => {
      res.redirect('/lists/mylists')
  })
  .catch(e => {
      console.log(e)
  })
})
//END: SELECT AND CHANGE LIST IMAGE WITH UNSPLASH API

//START: Alternative solution for unsplash.hbs - not finished
router.post('/unsplash', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const listName = req.body.listName
  unsplash.search.photos(req.body.theInput, 1, 10, { orientation: "landscape" })
  .then(toJson)
  .then(json => {
    // res.render('lists/unsplash', { json })
    res.render('lists/unsplash', { json, listName } )
  });
})

router.get('/unsplash/:listId', ensureLogin.ensureLoggedIn('/auth/login'), (req, res, next) => {
  const user = req.user
  const listId = req.params.listId
  res.render('lists/unsplash', { listId, user })
})
//END: Alternative solution for unsplash.hbs - not finished

module.exports = router;