import { Router } from "express";
import { addCategory, deleteCategories, getCategories, updateCategories } from "../controllers/product";

const router = Router();

router.post('/add-category', addCategory)
router.get('/get-categories', getCategories)
router.delete('/delete-categories', deleteCategories)
router.put('/update-categories', updateCategories)

export default router