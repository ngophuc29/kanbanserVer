import CategoriModel from "../models/CategoriModel"

const getProduct = async (req: any, res: any) => {


    try {
        res.status(200).json({
            message: "Product",
            data: []
        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}

const addCategory = async (req: any, res: any) => {

    const body = req.body

    const { parentId, title, description, slug } = body
    try {

        const category = await CategoriModel.find({
            $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
        })

        if (category.length > 0) {
            throw new Error("category is existing!!!!")
        }

        const newCategory = new CategoriModel(body)
        await newCategory.save()

        res.status(200).json({
            message: "Category",
            data: newCategory
        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}

const getCaterories = async (req: any, res: any) => {


    try {

        const categories = await CategoriModel.find()
        res.status(200).json({
            message: "Categories",
            data: categories
        })
    } catch (error: any) {


        res.status(404).json({
            message: error.message
        })
    }
}
export { getProduct, addCategory, getCaterories }