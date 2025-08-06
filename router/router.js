import { getBooks } from "../controllers/controller.js";
import { Router } from "express";

const router = Router()

router.get('/' , getBooks)

export default router