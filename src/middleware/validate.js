const saveAccount = (req, res, next) => {

    const validator = require("../helpers/validate");

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

    const validator = require("../helpers/validate");

    const validationRule  = {
        username: "required|string",
        name: "required|string",
        address: "required|string",
        birthdate: "required|date",
        email: "required|email",
        accounts: "required|array|min:1",
        "accounts.*": "integer",
        tier_and_details: "sometimes",
        "tier_and_details.*": "sometimes",
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

const saveState = (req, res, next) => {
    const validator = require("../helpers/validate");

    const validationRule  = {
        isoCode: "required|string|size:2",
        name: "required|string"
    };

    validator(req.body, validationRule, {}, (err, status) => {

        if (!status) {
            res.status(400).send({
                success:false,
                message: "State validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};


const saveTransaction = (req, res, next) => {
    const validator = require("../helpers/validate");

    const validationRule  = {
        account_id: "required|integer",
        transaction_count: "required|integer",
        bucket_start_date: "required|date",
        bucket_end_date: "required|date",
        transactions: "required|array|min:0",
        "transactions.*": "sometimes",
        "transactions.*.date": "required|date",
        "transactions.*.amount": "required|integer",
        "transactions.*.transaction_code": "required|string|in:buy,sell",
        "transactions.*.symbol": "required|string",
        "transactions.*.price": "required|string",
        "transactions.*.total": "required|string",   
    };

    validator(req.body, validationRule, {}, (err, status) => {

        if (!status) {
            res.status(400).send({
                success:false,
                message: "Transaction validation failed",
                data: err
            });
        } else {
            next();
        }
    });
};



module.exports = {
    saveAccount,
    saveCustomer,
    saveState,
    saveTransaction
}