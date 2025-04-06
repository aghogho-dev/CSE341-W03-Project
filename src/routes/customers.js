const router = require("express").Router();
const customersController = require("../controllers/customers");
const validation = require("../middleware/validate");
const { auth, requiresAuth } = require("express-openid-connect");

router.get("/", requiresAuth(),customersController.getAll);

router.get("/:id", requiresAuth(), customersController.getOne);

router.post("/", requiresAuth(), validation.saveCustomer, customersController.create);

router.put("/:id", requiresAuth(), validation.saveCustomer, customersController.update);

router.delete("/:id", requiresAuth(), customersController.remove);

module.exports = router;