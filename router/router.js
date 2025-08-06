import { getBooks } from "../controllers/controller.js";
import { Router } from "express";

const router = Router()

router.get('/api/' , getBooks)

export default router