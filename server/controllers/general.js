import Book from "../models/Book.js";


export const getAllBooks = async (req, res) => {
    try {
        const book = await Book.find();

        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

