const router = require("express").Router();

router.use("/", require("./swagger"));

router.get("/", (req, res) => res.json({message: "Welcome to CSE 341 Project for Weeks 3 and 4"}));

router.use("/accounts", require("./accounts"));

// router.use("/customers", require("./customers"));

// router.use("/transactions", require("./transactions"));

module.exports = router;