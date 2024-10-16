import mongoose from "mongoose";

const BookSchema = new mongoose.Schema(
    {
        bookID: { type: Number, require: true },
        title: { type: String, required: true },
        authors: { type: String, required: true },
        average_rating: { type: Number },
        isbn: { type: String },
        isbn13: { type: Number },
        language_code: { type: String },
        ratings_count: { type: Number },
        publisher: { type: String },
        publication_date: { type: String },

        quantity: { type: Number, default: 5 },
    },

);

const Book = mongoose.model("books", BookSchema);
export default Book;