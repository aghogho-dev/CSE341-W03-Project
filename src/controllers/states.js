require("dotenv").config();
const mongodb = require("../models/database");
const { ObjectId } = require("mongodb");

const getAll = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.STATE_COLLECTION).find();
        const states = await result.toArray();

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(states);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving states", error: err.message });
    }
};

const getOne = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to get a state." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.STATE_COLLECTION).findOne({ _id: userId });

        if (!result) {
            return res.status(404).json({ message: "State not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json(result);
    } catch (err) {
        res.status(500).json({ message: "Error retrieving state", error: err.message });
    }
};

const create = async (req, res) => {
    try {
        const state = {
            isoCode: req.body.isoCode,
            name: req.body.name
        };

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.STATE_COLLECTION).insertOne(state);

        if (result.acknowledged) {
            res.setHeader("Content-Type", "application/json");
            return res.status(201).json({ _id: result.insertedId, ...state });
        } else {
            throw new Error("Failed to create state");
        }
    } catch (err) {
        res.status(500).json({ message: "Error creating state", error: err.message });
    }
};

const update = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to update a state." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const state = {
            isoCode: req.body.isoCode,
            name: req.body.name
        };

        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.STATE_COLLECTION).updateOne({ _id: userId }, { $set: state });

        if (result.modifiedCount === 0) {
            return res.status(404).json({ message: "State not found or no changes made" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ _id: userId, ...state });
    } catch (err) {
        res.status(500).json({ message: "Error updating state", error: err.message });
    }
};

const remove = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Must use a valid id to delete a state." });
        }

        const userId = ObjectId.createFromHexString(req.params.id);
        const result = await mongodb.getDatabase().db(process.env.DB_NAME).collection(process.env.STATE_COLLECTION).deleteOne({ _id: userId });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: "State not found" });
        }

        res.setHeader("Content-Type", "application/json");
        res.status(200).json({ message: "State deleted successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error deleting state", error: err.message });
    }
};

module.exports = { getAll, getOne, create, update, remove };