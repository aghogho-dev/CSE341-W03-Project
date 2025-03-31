const router = require("express").Router();
const accountsController = require("../controllers/accounts");
const validation = require("../middleware/validate")
const { auth, requireAuth } = require("express-openid-connect");


router.get("/", requireAuth(),accountsController.getAll);

router.get("/:id", requireAuth(),accountsController.getOne);

router.post("/", requireAuth(),validation.saveAccount, accountsController.create);

router.put("/:id", requireAuth(),validation.saveAccount, accountsController.update);

router.delete("/:id", requireAuth(),accountsController.remove);

module.exports = router;