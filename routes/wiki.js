'use strict';
var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


  wikiRouter.get('/', function(req, res, next) {
    //res.render('index/');
    console.log('hello');
    //res.send('wiki root');
    res.redirect('/');
  });

  wikiRouter.post('/', function(req, res, next){
    User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email
      }
    })
    .then(function(values) {
      var user = values[0];

      var page = Page.build({
        title: req.body.title,
        content: req.body.content
      });

      return page.save().then(function(savedPage) {
        return savedPage.setAuthor(user);
      });
    })
    .then(function(savedPage){
      res.redirect(savedPage.route);
    })
    .catch(next);
  });

  wikiRouter.get('/add', function(req, res, next){
    res.render('addpage');
  });

  wikiRouter.get('/:pageurl', function(req,res,next){
    Page.findOne({
      where: {
        urlTitle: req.params.pageurl
      }
    })
    // .then(function(page) {
    //   return page.getAuthor();
    // })
    .then(function(page){
      res.render('wikipage', {page});
    })
    .catch(next);

  });

module.exports = wikiRouter;
