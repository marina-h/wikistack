'use strict';
var express = require('express');
var Promise = require('bluebird');
var router = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
  User.findAll()
  .then(function(users){
    res.render('authorlist', {users});
  })
  .catch(next);
});

router.get('/:userId', function(req, res, next) {
  var id = req.params.userId;
  var userPromise = User.findById(id);
  var pagesPromise = Page.findAll({
    where: {
      authorId: id
    }
  });

  Promise.all([
    userPromise,
    pagesPromise
  ])
  .spread(function(user, pages) {
    res.render('authorpage', { user: user, pages: pages })
  })
  .catch(next);
});




module.exports = router;
