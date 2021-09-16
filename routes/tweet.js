const router = require('express').Router();
const ctrl = require('../controllers');

const authRequired = require('../middleware/authRequired');

// router.get('/', authRequired, ctrl.tweet);

module.exports = router;