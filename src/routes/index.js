const router = require("express").Router();
const { auth, requireAuth } = require("express-openid-connect");

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
};

router.use(auth(config));

router.use("/", require("./swagger"));

router.get("/", (req, res) => {
    res.json({
        message: "Welcome to CSE 341 Project for Weeks 3 and 4",
        authentication: req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out',
        user: req.oidc.user
    })
  }
);

router.use("/accounts", require("./accounts"));

router.use("/customers", require("./customers"));

router.use("/transactions", require("./transactions"));

router.use("/states", require("./states"));

module.exports = router;