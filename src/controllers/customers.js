require("dotenv").config();
const mongodb = require("../models/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).find();
        const customers = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(customers);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving customers", error: err.message });
    }
};

const getOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must be a valid id to get a customer." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: "Customer not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving customer", error: err.message });
    }
};

const create = async (req, res) => {
    try {
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
            return res.status(201).json({ _id: result.insertedId, ...customer });
        } else {
            throw new Error("Failed to create customer");
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating customer", error: err.message });
    }
};

const update = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must be a valid id to update customer" });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const updatedCustomer = req.body;

        if (Object.keys(updatedCustomer).length === 0) {
            return res.status(400).json({ message: "No data to update" });
        }

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).updateOne({ _id: userId }, { $set: updatedCustomer });

        if (result.matchedCount === 0) {
            return res.status(404).json({ message: "No customer matched the id you want to update" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Customer updated successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error updating customer", error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must be a valid id to delete customer" });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.CUSTOMER_COLLECTION).deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "No customer matched the id you want to delete" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "Customer deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting customer", error: err.message });
    }
};

module.exports = {
    getAll,
    getOne,
    create,
    update,
    remove
};
