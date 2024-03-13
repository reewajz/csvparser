var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

const passport = require('passport');
const User = require('../models/User');
const config= require('../config.json');

/* GET users listing. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err || !user) {
          return res.status(400).json({
              message: info ? info.message : 'Login failed',
              user   : user
          });
      }

     req.login(user, {session: false}, (err) => {
         if (err) {
             res.send(err);
         }

         // generate a signed son web token with the contents of user object and return it in the response

         const token = jwt.sign(user.toJSON(), config.secrete);
         console.log(token);
         return res.redirect('/rest/v1/customer');
      });
  })(req, res);
});


// passport.use(new LocalStrategy(
//     function(username, password, done) {
//       User.findOne({ username: username }, function (err, user) {
//         if (err) { return done(err); }
//         if (!user) {
//           return done(null, false, { message: 'Incorrect username.' });
//         }
//         if (!user.validPassword(password)) {
//           return done(null, false, { message: 'Incorrect password.' });
//         }
//         return done(null, user);
//       });
//     }
//   ));
// app.post('/login',
//   passport.authenticate('local',{
//       successRedirect:'/rest/v1/customer',
//       failureRedirect:'/login',
//       failureFlash:true
//   }),
//   function(req, res) {
//     res.redirect('/users/' + req.user.username);
//   });
module.exports = router;
