var express = require('express');
var router = express.Router();

const passport = require('passport');

router.post('/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
      res.json(user)
  })(req, res, next);
});

module.exports = router;
