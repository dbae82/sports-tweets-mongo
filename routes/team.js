const router = require('express').Router();
const ctrl = require('../controllers');

router.get('/', ctrl.team.index);
router.get('/:id', ctrl.team.show);

module.exports = router;