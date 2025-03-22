const validator = require("../helpers/validate");

const saveAccount = (req, res, next) => {

    const validationRule = {
        account_id: "required|integer",
        limit: "required|integer|min:9000",
        products: "required|array|min:1",
        "products.*": "string"
    };

    validator(req.body, validationRule, {}, (err, status) => {

        if (!status) {
            res.status(400).send({
                success: false,
                message: "Validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};


module.exports = {
    saveAccount
}