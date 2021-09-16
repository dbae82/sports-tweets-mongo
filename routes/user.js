const router = require('express').Router();
const ctrl = require('../controllers');

const authRequired = require('../middleware/authRequired');

router.get('/', authRequired, ctrl.user.show);
router.put('/:id', ctrl.user.update);
router.delete('/:id', ctrl.user.destroy);

module.exports = router;