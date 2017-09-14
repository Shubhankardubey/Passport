var express = require('express');
var router = express.Router();

var passport = require('passport');

var User = require('../models/user');

router.get('/', function(req, res){
  res.render('index');
});

router.get('/signup', function(req, res){
  msgError = req.flash('msgError')
  res.render('signup', {message: msgError});
});

router.post('/signup', passport.authenticate('local.signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    failureFlash: true
}));

router.get('/login', function(req, res){
  login_error =  req.flash('loginError')
  password_error =  req.flash('passwordError')
  res.render('login', {loginError: login_error, passwordError: password_error});
});

router.post('/login', passport.authenticate('local.login', {
    successRedirect: '/profile',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/profile', isLoggedIn, function(req, res){
  console.log(req.user)
  res.render('profile', {user: req.user});
});

router.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

module.exports = router;


function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }

  res.redirect('/login');
}
