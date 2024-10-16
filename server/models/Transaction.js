import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
    {
        bookID: { type: Number, ref: "Book", required: true },
        email: {
            type: String,
            ref: "email",
            required: true,
        },

        outstanding: { type: Number, default: 0 },
        action: { type: String, enum: ["issue", "return"] }
    },
    { timestamps: true }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;
