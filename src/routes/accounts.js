const router = require("express").Router();
const accountsController = require("../controllers/accounts");

router.get("/", accountsController.getAll);

router.get("/:id", accountsController.getOne);

router.post("/", accountsController.create);

router.put("/:id", accountsController.update);

// router.delete("/:id", accountsController.remove);

module.exports = router;