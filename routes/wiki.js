'use strict';
var express = require('express');
var wikiRouter = express.Router();
var models = require('../models');
var Page = models.Page;
var User = models.User;


  wikiRouter.get('/', function(req, res, next) {
    //res.render('index/');
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
        tags: req.body.tags.split(' '),
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

  wikiRouter.get('/search', function(req, res, next){
    var tags = req.query.tag;
    Page.findByTag(tags).then(function(pages){
      res.render('index', {pages: pages});
    });
  });

  wikiRouter.get('/:pageurl', function(req,res,next){
    Page.findOne({
      where: {
        urlTitle: req.params.pageurl
      },
      include:[
        {model: User, as: 'author'}
      ]
    })
    .then(function(page){
      if (page === null) {
        res.status(404).send();
      } else {
        console.log(page.author.name);
        var tagsString = page.tags.join(' ');
        res.render('wikipage', {page: page, tagsString: tagsString});
      }
    })
    .catch(next);

  });

  wikiRouter.get('/:pageUrl/similar', function(req, res, next){
    var url = req.params.pageUrl;
    Page.findOne({
      where:{
        urlTitle: url
      }
    }).then(function(pageFound){
      var tags = pageFound.tags;
      pageFound.findSimilar(tags).then(function(pages){
        res.render('index', {pages});
      });
    })
    .catch(next);
  });



module.exports = wikiRouter;
