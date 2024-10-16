import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
    try {
        const trans = await Transaction.find();
        res.status(200).json(trans);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

