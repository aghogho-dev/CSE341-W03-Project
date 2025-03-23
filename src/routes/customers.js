const router = require("express").Router();
const customersController = require("../controllers/customers");
const validation = require("../middleware/validate");

router.get("/", customersController.getAll);

router.get("/:id", customersController.getOne);

// router.post("/", validation.saveCustomer, customersController.create);

// router.put("/:id", validation.saveCustomer, customersController.update);

// router.delete("/:id", customersController.remove);

module.exports = router;