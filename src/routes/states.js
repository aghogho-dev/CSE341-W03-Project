const router = require('express').Router();
const statesController = require('../controllers/states');
const validation = require('../middleware/validate');
const { auth, requiresAuth } = require('express-openid-connect');

router.get('/', requiresAuth(), statesController.getAll);

router.get('/:id', requiresAuth(), statesController.getOne);

router.post('/', requiresAuth(), validation.saveState, statesController.create);

router.put('/:id', requiresAuth(), validation.saveState, statesController.update);

router.delete('/:id', requiresAuth(), statesController.remove);

module.exports = router;