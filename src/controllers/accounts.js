require("dotenv").config()
mongodb = require("../models/database");
const ObjectId = require("mongodb").ObjectId;


const getAll = async (req, res) => {

    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).find();
    
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
        res.status(400).json({ message: "Must use a valid id to get an account." });
    }

    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).find({ _id: userId });

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

    const account = {
        account_id: req.body.account_id,
        limit: req.body.limit,
        products: req.body.products
    };

    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).insertOne(account);

    if (result.acknowledged) {
        
        res.setHeader("Content-Type", "application/json");
        res.status(201).json(
            {
                _id: result.insertedId,
                ...account
            }
        );
    } else {
        res.setHeader("Content-Type", "application/json");
        res.status(500).json({ message: "Error creating account" });
    }
};

const update = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must be a valid id to update account");
    }

    const userId = ObjectId.createFromHexString(req.params.id);
    const updatedAccount = req.body;

    if (Object.keys(updatedAccount).length === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({error: "No data to update"});
    }

    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).updateOne({ _id: userId }, { $set: updatedAccount });

    if (result.matchedCount === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({error: "No account matched the id you want to update"});
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({message: "Account updated successfully"});
};

const remove = async (req, res) => {

    if (!ObjectId.isValid(req.params.id)) {
        res.status(400).json("Must be a valid id to delete account");
    }

    const userId = ObjectId.createFromHexString(req.params.id);
    const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).deleteOne({ _id: userId });

    if (result.deletedCount === 0) {
        res.setHeader("Content-Type", "application/json");
        return res.status(400).json({error: "No account matched the id you want to delete"});
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json({message: "Account deleted successfully"});
};



module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove,
}