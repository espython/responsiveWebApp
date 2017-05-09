var User = require('../models/users');

module.exports = function(app, passport) {

  app.get('/', isLoggedIn, function(req, res) {

    res.render('home', {
      user: req.user
    });

  });

  app.get('/404', function(req, res) {
    res.render('404', {
      message: req.flash('signupMessage')
    });
  });

  app.get('/upload', function(req, res) {
    res.render('upload');

  });
  app.get('/signup', function(req, res) {
    res.render('signup');

  });

  app.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/',
    failureRedirect: '404',
    failureFlash: true
  }));

  app.get('/login', function(req, res) {
    res.render('login', {
      message: req.flash('loginMessage')
    });
  });
  app.post('/login', passport.authenticate('local-login', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  }));

  app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/login');
  });



}; //End of main function

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();

  } else {
    res.redirect('/login');

  }

}
