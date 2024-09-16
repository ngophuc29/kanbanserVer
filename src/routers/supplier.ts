import { Router } from "express";
import { addNew, getForm, getSupplier, removeSuppplier, updateSuppplier } from "../controllers/supplier";
 

const router=Router()

router.get('/',getSupplier )
router.post('/add-new',addNew )
router.put('/update',updateSuppplier )
router.delete('/remove',removeSuppplier )
router.get('/get-form',getForm )




export default router