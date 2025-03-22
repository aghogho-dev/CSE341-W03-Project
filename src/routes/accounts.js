const router = require("express").Router();
const accountsController = require("../controllers/accounts");
const validation = require("../middleware/validate")

router.get("/", accountsController.getAll);

router.get("/:id", accountsController.getOne);

router.post("/", validation.saveAccount, accountsController.create);

router.put("/:id", validation.saveAccount, accountsController.update);

router.delete("/:id", accountsController.remove);

module.exports = router;