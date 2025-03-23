const validator = require("../helpers/validate");

const saveCustomer = (req, res, next) => {

    const validationRule  = {
        username: "required|string",
        name: "required|string",
        address: "required|string",
        birthdate: "required|date",
        email: "required|email",
        accounts: "required|array|min:1",
        "accounts.*": "integer",
        tier_and_details: "required|object",
        "tier_and_details.*": "object",
        "tier_and_details.*.tier": "required|string|in:Bronze,Silve,Gold,Platinum",
        "tier_and_details.*.benefits": "required|array|min:1",
        "tier_and_details.*.benefits.*": "string",
        "tier_and_details.*.active": "required|boolean",
        "tier_and_details.*.id": "required|string"
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
    saveCustomer
}