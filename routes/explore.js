const express = require('express');
const router  = express.Router();

//Explore section
router.get('/explore', (req, res, next) => {
  req.user
  res.render('explore/explore', { user: req.user });
});

module.exports = router;