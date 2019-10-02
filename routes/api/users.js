const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../auth');
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/register', auth.optional, (req, res, next) => {

  if(!req.body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!req.body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  if(!req.body.username) {
    return res.status(422).json({
      errors: {
        username: 'is required',
      },
    });
  }

  const finalUser = new Users(req.body);
  finalUser.setPassword(req.body.password);
  
  finalUser.save(function(err) {
    if (err) {
      if (err.name === 'MongoError' && err.code === 11000) {
        return res.status(422).send({ success: false, message: 'User is not unique!' });
      }

      // Some other error
      return res.status(422).send(err);
    }
  res.json({ user: finalUser.toAuthJSON() });
  });

});

//POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {

  if(!user.body.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.body.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate('local', { session: false }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ user: user.toAuthJSON() });
    }

    return status(400).info;
  })(req, res, next);
});

//GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }

      return res.json({ user: user.toAuthJSON() });
    });
});

//Edit user balance
//Todo proper data validity check
router.put('/', auth.required, (req, res, next) => {
  const { payload: { id } } = req;
  
  Users.findById(id, function (err, user){
    user.balance = req.body.balance;
    if (err) return res.send(err);
    user.save(function (err) {
      if (err) return res.status(400);
      res.json({balance: user.balance});
    });
  }); 
});

module.exports = router;