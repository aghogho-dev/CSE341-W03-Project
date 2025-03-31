const router = require("express").Router();
const accountsController = require("../controllers/accounts");
const validation = require("../middleware/validate")
const { auth, requiresAuth } = require("express-openid-connect");


router.get("/", requiresAuth(),accountsController.getAll);

router.get("/:id", requiresAuth(),accountsController.getOne);

router.post("/", requiresAuth(),validation.saveAccount, accountsController.create);

router.put("/:id", requiresAuth(),validation.saveAccount, accountsController.update);

router.delete("/:id", requiresAuth(),accountsController.remove);

module.exports = router;