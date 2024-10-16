import express from 'express';
import { getAllBooks } from "../controllers/general.js"
const router = express.Router();


router.get("/dashboard", getAllBooks);



export default router;