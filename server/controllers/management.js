import Member from "../models/Member.js";
import Book from "../models/Book.js";
import Transaction from "../models/Transaction.js";
import fetch from "node-fetch";

export const getMember = async (req, res) => {
    try {
        const { id } = req.params;
        const member = await Member.findById(id);
        res.status(200).json(member);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};
export const getMembers = async (req, res) => {
    try {
        const members = await Member.find().select("-password");
        res.status(200).json(members);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

//delete member
export const deleteMember = async (req, res) => {
    try {
        const { id } = req.params;
        await Member.findByIdAndDelete(id);
        res.status(201).json(id);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const addMember = async (req, res) => {
    const member = req.body;
    const newMember = new Member(member);

    try {
        await newMember.save();

        res.status(201).json(newMember);
    } catch (error) {
        res.status(409).json(error.message);
    }
};

//updating member:
export const editMember = async (req, res) => {
    let member = req.body;
    const { id } = req.params;

    // Log incoming data for troubleshooting
    // console.log(`Editing member with ID ${id} with data`, member);

    try {
        // Try to update the member
        const updatedMember = await Member.findOneAndUpdate({ _id: id }, member, {
            new: true,
        });

        // If successful, return updated member
        res.status(201).json(updatedMember);
    } catch (error) {
        // Log the error details
        console.log("Error details:", error);
        res.status(409).json({ message: error.message });
    }
};


//issue book
export const issueBook = async (req, res) => {
    try {
        const { email, bookID } = req.body;

        const member = await Member.findOne({ email });
        if (!member) {
            return sendErrorResponse(res, 404, "Member Not Found");
        }

        // Check if the member's outstanding debt is >= 500
        if (member.outstanding >= 500) {
            return sendErrorResponse(
                res,
                400,
                "Outstanding debt exceeds Rs. 500. Cannot issue a book."
            );
        }

        const book = await Book.findOne({ bookID });
        const { title } = book;
        if (!book) {
            return sendErrorResponse(res, 404, "Check BookID, book not found.");
        }

        // Check if the book is available for issuing
        if (book.quantity === 0) {
            return sendErrorResponse(res, 400, `"${title}" Book is out of stock.`);
        }

        // Check if the member has already issued the same book
        if (member.bookIssued.includes(bookID)) {
            return sendErrorResponse(
                res,
                400,
                `"${title}" Book has already been issued to this member.`
            );
        }

        // Create a new transaction record
        const transaction = new Transaction({
            email: email,
            bookID: bookID,
            action: "issue",
            outstanding: member.outstanding + 100, // Increase outstanding by 100 per issue
        });
        await transaction.save();

        // Update book quantity
        book.quantity -= 1;
        await book.save();

        // Save changes to the database
        member.bookIssued.push(bookID);
        member.outstanding += 100; // Increase outstanding by 100 per issue
        await member.save();

        sendSuccessResponse(res, `"${title}" Book issued successfully.`);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Error occured while importing");
    }
};

//return book

export const returnBook = async (req, res) => {
    try {
        const { email, bookID } = req.body;

        const member = await Member.findOne({ email });
        const book = await Book.findOne({ bookID });

        if (!member) {
            return sendErrorResponse(res, 404, "Member not found.");
        }
        if (!book) {
            return sendErrorResponse(res, 404, "Book not found.");
        }

        const issuedIndex = member.bookIssued.indexOf(bookID);
        if (issuedIndex === -1) {
            return sendErrorResponse(res, 400, "Book not issued by this member.");
        }

        member.bookIssued.splice(issuedIndex, 1);

        if (member.outstanding >= 100) {
            member.outstanding -= 100;
        } else {
            member.outstanding = 0;
        }

        book.quantity += 1;

        const transaction = new Transaction({
            email: email,
            bookID: bookID,
            action: "return",
            outstanding: member.outstanding,
        });
        await transaction.save();

        await member.save();
        await book.save();

        sendSuccessResponse(res, "Book returned successfully.");
    } catch (error) {
        console.error(error);
        sendErrorResponse(
            res,
            500,
            "Error in Returning Book"
        );
    }
};

//import Book
export const importBook = async (req, res) => {
    const { isbn, quantity } = req.body;
    const id = isbn;

    try {
        // Fetch book data from Frappe API
        const response = await fetch(
            `https://frappe.io/api/method/frappe-library?isbn=${id}`
        );

        if (!response.ok) {
            return sendErrorResponse(
                res,
                400,
                "Error fetching book data from external API"
            );
        }

        const responseData = await response.json(); // Parse response data

        if (responseData.message.length === 0) {
            return sendErrorResponse(
                res,
                404,
                "Check ISBN, book not found in Frappe API"
            );
        }

        const bookData = responseData.message[0]; // Access the first book object

        const {
            bookID,
            title,
            authors,
            average_rating,
            isbn,
            isbn13,
            language_code,
            publication_date,
            publisher,
        } = bookData;

        // Find or create the book in MongoDB
        const existingBook = await Book.findOne({ isbn });

        let book;
        if (existingBook) {
            existingBook.quantity += parseInt(quantity);
            book = existingBook;
        } else {
            book = new Book({
                bookID,
                title,
                authors,
                average_rating,
                isbn,
                isbn13,
                language_code,
                publication_date,
                publisher,
                quantity: parseInt(quantity),
            });
        }
        await book.save();

        sendSuccessResponse(res, `"${title}" Book imported successfully.`);
    } catch (error) {
        console.error(error);
        sendErrorResponse(res, 500, "Error importing book.");
    }
};

//sends message to frontend
const sendSuccessResponse = (res, message) => {
    res.json({ success: true, message: message });
};

const sendErrorResponse = (res, statusCode, errorMessage) => {
    res.json({ success: false, message: errorMessage });
};
