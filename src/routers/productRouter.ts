import { Router } from "express";
import { addCategory, getCaterories } from "../controllers/product";

const router = Router();

router.post('/add-category', addCategory)
router.get('/get-categories', getCaterories)
export default router