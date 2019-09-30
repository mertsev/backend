const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/maps', require('./maps'));

module.exports = router;