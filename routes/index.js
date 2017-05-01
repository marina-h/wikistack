'use strict';
var express = require('express');
var router = express.Router();
const wikiRouter = require('./wiki');
const userRouter = require('./user');
var models = require('../models');
var Page = models.Page;
var User = models.User;

  router.get('/', function(req, res, next) {
    Page.findAll()
    .then(function(pages){
      res.render('index', {pages});
    })
    .catch(next);
    // res.send('hello world')
  })
  router.use('/wiki', wikiRouter);
  // or, in one line: router.use('/wiki', require('./wiki'));
  router.use('/users', userRouter);
  // or, in one line: router.use('/wiki', require('./wiki'));


  module.exports = router;
