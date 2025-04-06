require("dotenv").config();
const mongodb = require("../models/database");
const { ObjectId } = require("mongodb");


const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.TRANSACTION_COLLECTION).find().limit(100);
        const transactions = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(transactions);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving transactions", error: err.message });
    }
};

const getOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to get a transaction." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.TRANSACTION_COLLECTION).findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving transaction", error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const transaction = {
            account_id: req.body.account_id,
            transaction_count: req.body.transaction_count,
            bucket_start_date: req.body.bucket_start_date,
            bucket_end_date: req.body.bucket_end_date,
            transactions: req.body.transactions
        };

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.TRANSACTION_COLLECTION).insertOne(transaction);

        if (result.acknowledged) {
            res.setHeader("Content-Type", "application/json");
            return res.status(201).json({ _id: result.insertedId, ...transaction });
        } else {
            throw new Error("Failed to create transaction");
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating transaction", error: err.message });
    }
};

const update = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to update a transaction." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const transaction = {
            account_id: req.body.account_id,
            transaction_count: req.body.transaction_count,
            bucket_start_date: req.body.bucket_start_date,
            bucket_end_date: req.body.bucket_end_date,
            transactions: req.body.transactions
        };

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.TRANSACTION_COLLECTION).updateOne({ _id: userId }, { $set: transaction });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ _id: userId, ...transaction });
    } catch (err) {
        res.status(500).json({ message: "Error updating transaction", error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to delete a transaction." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.TRANSACTION_COLLECTION).deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "Transaction not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Transaction deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting transaction", error: err.message });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};