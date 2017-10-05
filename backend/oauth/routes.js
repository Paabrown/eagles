const passport = require('./passport');
const schema = require('./../db/schema.js');
const checkAuth = require('./../checkAuth');
var User = schema.User;

module.exports.login = passport.authenticate('google', {
    accessType: 'offline',
    // scope: [
    //     'https://www.googleapis.com/auth/userinfo.profile',
    //     'https://www.googleapis.com/auth/userinfo.email'
    // ]
  }
);

module.exports.return = passport.authenticate('google', {
  failureRedirect: '/login'
  }
);

module.exports.resolve = function(req, res) {
    console.log('req.user in resolve', req.user);
    let name = req.session.username
    console.log('name', name)

    if (name) {
      User.findOne({ username: name })
      .then((userInDB) => {
        if (userInDB) {
          console.log('userInDB', userInDB)
          if (userInDB.googleID) {
            if (userInDB.googleID === req.user.id) {
              res.send('Signed in to Google! Please continue your browsing experience');
            } else {
              console.log('user does not match. fatal error')
              res.redirect('/logout');
            }
          } else {
            userInDB.googleID = req.user.id;
            userInDB.save((err) => console.log('err updating', err))
            res.send('Success! Google Acct linked to your existing account.');
          }
        } else {
          res.status(404).send('No user exists with your name! A truly fatal error.')
          throw new Error('No user exists with your name! A truly fatal error.')
        }
      })
      .catch((err) => res.status(404).send(err))
    } else {
      User.findOne({ googleID: req.user.id })
      .then((userInDB) => {
        if (userInDB) {
          req.session.username = userInDB.username;
          res.setHeader('Content-Type', 'application/json');
          res.send(JSON.stringify({
            loggedIn: true,
            userData: userInDB
          }))
        } else {
          req.body.username = req.user.id,
          req.body.password = req.user.id,
          req.body.email = req.user.email,
          checkAuth.createAccount(req, res)
          .then(results => console.log('success creating acct!', results))
          .catch(err => console.log('err creating acct!', err))
        }
      })
      .catch((err) => res.status(404).send(err))
    }
};