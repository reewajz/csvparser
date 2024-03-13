var express = require('express');
var router = express.Router();
const passport = require('passport');
// const GoogleStrategy = require('passport-local').Strategy;

// /* GET users listing. */
// router.get('/', function(req, res, next) {
//   res.render('login');
// });
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
