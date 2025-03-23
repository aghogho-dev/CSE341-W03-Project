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
                message: "Account validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};


const saveCustomer = (req, res, next) => {

    const validationRule  = {
        username: "required|string",
        name: "required|string",
        address: "required|string",
        birthdate: "required|date",
        email: "required|email",
        accounts: "required|array|min:1",
        "accounts.*": "integer",
        tier_and_details: "object",
        "tier_and_details.*": "object",
        "tier_and_details.*.tier": "string|in:Bronze,Silve,Gold,Platinum",
        "tier_and_details.*.benefits": "array|min:1",
        "tier_and_details.*.benefits.*": "string",
        "tier_and_details.*.active": "boolean",
        "tier_and_details.*.id": "string"
    };

    validator(req.body, validationRule, {}, (err, status) => {

        if (!status) {
            res.status(400).send({
                success:false,
                message: "Customer validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};

module.exports = {
    saveAccount,
    saveCustomer
}