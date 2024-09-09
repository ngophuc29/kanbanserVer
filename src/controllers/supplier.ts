import SupplierModel from "../models/SupplierModel"

const getProduct =async(req:any,res:any) =>{


    try {
        res.status(200).json({
            message : "Product",
            data :[]
        })
    } catch (error:any) {

       
        res.status(404).json({
            message: error.message
        })
    }
}

const addNew =async(req:any,res:any) =>{
    const body=req.body

    try {

        const newSupplier= await new SupplierModel(body)
        newSupplier.save()
        res.status(200).json({
            message : "Add new Supplier successfully !!!",
            data :newSupplier
        })
    } catch (error:any) {

       
        res.status(404).json({
            message: error.message
        })
    }
}

export {getProduct,addNew}