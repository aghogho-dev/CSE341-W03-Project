const router = require('express').Router();
const transactionsController = require('../controllers/transactions');
const validation = require('../middleware/validate');
const { auth, requiresAuth } = require('express-openid-connect');


router.get('/', requiresAuth(), transactionsController.getAll);

router.get('/:id', requiresAuth(), transactionsController.getOne);

router.post('/', requiresAuth(), validation.saveTransaction, transactionsController.create);

router.put('/:id', requiresAuth(), validation.saveTransaction, transactionsController.update);

router.delete('/:id', requiresAuth(), transactionsController.remove);

module.exports = router;