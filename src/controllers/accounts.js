require("dotenv").config();
const mongodb = require("../models/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).find();
        const accounts = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(accounts);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving accounts", error: err.message });
    }
};

const getOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to get an account." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: "Account not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving account", error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const account = {
            account_id: req.body.account_id,
            limit: req.body.limit,
            products: req.body.products
        };

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).insertOne(account);

        if (result.acknowledged) {
            res.setHeader("Content-Type", "application/json");
            return res.status(201).json({ _id: result.insertedId, ...account });
        } else {
            throw new Error("Failed to create account");
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating account", error: err.message });
    }
};

const update = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must be a valid id to update account" });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const updatedAccount = req.body;

        if (Object.keys(updatedAccount).length === 0) {
            return res.status(400).json({ error: "No data to update" });
        }

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).updateOne({ _id: userId }, { $set: updatedAccount });

        if (result.matchedCount === 0) {
            return res.status(404).json({ error: "No account matched the id you want to update" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Account updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating account", error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must be a valid id to delete account" });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.ACCOUNT_COLLECTION).deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ error: "No account matched the id you want to delete" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Account deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting account", error: err.message });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
