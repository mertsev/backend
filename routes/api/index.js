const express = require('express');
const router = express.Router();

router.use('/users', require('./users'));
router.use('/maps', require('./maps'));
router.use('/ya-maps', require('./ya-maps'));

module.exports = router;