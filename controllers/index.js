var express = require('express'),
    router = express.Router();

router.use('/login',require('./login'));
router.use('/users',require('./users'));
router.use('/products',require('./products'));
router.use('/sales', require('./sales'));

module.exports = router;