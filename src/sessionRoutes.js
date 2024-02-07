
const express = require('express');
const router = express.Router();
const passport = require('./passport');

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  if (req.user) {
    res.json({ success: true, user: req.user });
  } else {
    res.status(401).json({ success: false, message: 'Usuario no autenticado' });
  }
});

module.exports = router;
