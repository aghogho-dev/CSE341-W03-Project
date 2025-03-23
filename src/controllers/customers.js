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

const create = async (req, res) => {

    const customer = {
        username: req.body.username,
        name: req.body.name,
        address: req.body.address,
        birthdate: req.body.birthdate,
        email: req.body.email,
        accounts: req.body.accounts,
        tier_and_details: req.body.tier_and_details
    };

    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).insertOne(customer);

    if (result.acknowledged) {

        res.setHeader("Content-Type", "application/json");
        res.status(201).json(
            {
                _id: result.insertedId,
                ...customer
            }
        );
    } else {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ message: "Error creating customer" });
    }
};

const update = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must be a valid id to update customer");
    }

    const userId = ObjectId.createFromHexString(req.params.id);
    const updatedCustomer = req.body;

    if (Object.keys(updatedCustomer).length === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({ messsage: "No data to update" });
    }

    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).updateOne({ _id: userId }, { $set: updatedCustomer });

    if (result.matchedCount === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({message: "No customer matched the id you want to update"});
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({ message: "Customer updated successfully" });

}

const remove = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must be a valid id to delete account");
    }

    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({error: "No customer matched the id you want to delete"});
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({message: "Customer deleted successfully"});
}


module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
}