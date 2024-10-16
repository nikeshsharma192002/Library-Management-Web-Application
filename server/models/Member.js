//schema for user that represent model of data
import mongoose from "mongoose";


const memberSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            min: 2,
            max: 100,
        },
        email: {
            type: String,
            required: true,
            max: 50,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            min: 5,
        },

        city: String,
        state: String,
        country: String,
        occupation: String,
        phoneNumber: String,
        bookIssued: Array,
        outstanding: { type: Number, default: 0 }
    },
    { timestamps: true }
);

const Member = mongoose.model("Member", memberSchema);
export default Member;