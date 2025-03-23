require("dotenv").config();
mongodb = require("../models/database");
const ObjectId = require("mongodb").ObjectId;

const getAll = async (req, res) => {

    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).find();

    result.toArray()
        .then((lists) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(lists);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};


const getOne = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Must be a valid id to get a customer." });
    }

    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).find({ _id: userId });

    result.toArray()
        .then((list) => {
            res.setHeader("Content-Type", "application/json");
            res.status(200).json(list[0]);
        })
        .catch((err) => {
            res.status(400).json({ message: err.message });
        });
};

// const create = async (req, res) => {

//     const customer = {
//         username,
//         name,
//         address,
//         birthdate,
//         email,
//         account,
//         tier_and_details
//     }
// }


module.exports = {
    getAll,
    getOne
}