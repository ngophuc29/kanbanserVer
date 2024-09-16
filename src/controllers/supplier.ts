import SupplierModel from "../models/SupplierModel"

const getSupplier = async (req: any, res: any) => {

    const { page, pageSize } = req.query

    console.log(page, pageSize)
    try {

        const skip = (page - 1) * pageSize

        const tong = await SupplierModel.countDocuments()
        console.log(tong)
        const items = await SupplierModel.find({ isDeleted: false })
            .skip(skip)
            .limit(pageSize)

        const total = await SupplierModel.countDocuments()
        res.status(200).json({
            message: "Supplier",
            // data: {items,total}
            data: { items, total }

        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}

const addNew = async (req: any, res: any) => {
    const body = req.body

    try {

        const newSupplier = await new SupplierModel(body)
        newSupplier.save()
        res.status(200).json({
            message: "Add new Supplier successfully !!!",
            data: newSupplier
        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}

const updateSuppplier = async (req: any, res: any) => {
    const body = req.body
    const { id } = req.query
    try {


        await SupplierModel.findByIdAndUpdate(id, body)

        res.status(200).json({
            message: "  Supplier updated !!!",
            data: []
        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}

const removeSuppplier = async (req: any, res: any) => {

    const { id } = req.query
    try {


        await SupplierModel.findByIdAndDelete(id)

        res.status(200).json({
            message: "  Supplier Remove !!!",
            data: []
        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}
const getForm = async (req: any, res: any) => {
    try {
        const form = {
            title: 'Supplier',
            layout: 'horizontal',
            labelCol: 6,
            wrapperCol: 18,
            formItems: [
                {
                    key: 'name',
                    value: 'name',
                    label: 'Supplier Name',
                    placeholder: "Enter your supplier name",
                    type: 'default',
                    required: true,
                    message: 'Enter your supplier name'
                },
                {
                    key: 'name',
                    value: 'name',
                    label: 'Supplier Name',
                    placeholder: "Enter your supplier name",
                    type: 'default',
                    required: true,
                    message: 'Enter your supplier name'
                }
                ,
                {
                    key: 'name',
                    value: 'name',
                    label: 'Supplier Name',
                    placeholder: "Enter your supplier name",
                    type: 'default',
                    required: true,
                    message: 'Enter your supplier name'
                }
                ,
                {
                    key: 'name',
                    value: 'name',
                    label: 'Supplier Name',
                    placeholder: "Enter your supplier name",
                    type: 'default',
                    required: true,
                    message: 'Enter your supplier name'
                }
            ]
        }
        res.status(200).json({
            message: '',
            data: form
        }

        )
    } catch (error: any) {
        res.status(404).json({

            message: error.message,
        }

        )
    }
}
export { getSupplier, addNew, updateSuppplier, removeSuppplier,getForm }