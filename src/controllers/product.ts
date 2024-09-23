
import CategoriModel from "../models/CategoriModel";
import ProductModel from "../models/ProductModel";
import SupplierModel from "../models/SupplierModel";

const getProduct = async (req: any, res: any) => {
    try {
        res.status(200).json({
            message: "Product",
            data: []
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};

const addCategory = async (req: any, res: any) => {
    const body = req.body;
    const { parentId, title, description, slug } = body;

    try {
        const category = await CategoriModel.find({
            $and: [{ parentId: { $eq: parentId } }, { slug: { $eq: slug } }],
        });

        if (category.length > 0) {
            throw new Error("Category already exists!");
        }

        const newCategory = new CategoriModel(body);
        await newCategory.save();

        res.status(200).json({
            message: "Category added successfully",
            data: newCategory
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message
        });
    }
};

const getCategories = async (req: any, res: any) => {
    const { page, pageSize } = req.query;
    try {
        const skip = (page - 1) * pageSize;

        const categories = await CategoriModel.find({
            $or: [
                { isDeleted: false },
                { isDeleted: null }
            ]
        })
            .skip(skip)
            .limit(pageSize);

        res.status(200).json({
            message: 'Categories retrieved successfully',
            data: categories,
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};
const findAndRemoveCategoryInProducts = async (id: string) => {
    // const item = await CategoryModel.findById(id);
    const items = await CategoriModel.find({ parentId: id });

    if (items.length > 0) {
        items.forEach(
            async (item: any) => await findAndRemoveCategoryInProducts(item._id)
        );
    }

    await handleRemoveCategoryInProducts(id);
    // const cats = await CategoryModel.find({ parentId: id });
    // if (cats.length > 0) {
    // 	cats.forEach(async (item: any) => {
    // 		const values: any = await getCategoriesIds([], item._id);
    // 		if (values.length > 0) {
    // 			console.log(values);
    // 		} else {
    // 			data.push(item._id);
    // 		}
    // 	});
    // }
    // return data;
};

const handleRemoveCategoryInProducts = async (id: string) => {
    await CategoriModel.findByIdAndDelete(id);
    const products = await ProductModel.find({ categories: { $all: id } });

    if (products && products.length > 0) {
        products.forEach(async (item: any) => {
            const cats = item._doc.categories;

            const index = cats.findIndex((element: string) => element === id);

            if (index !== -1) {
                cats.splice(index, 1);
            }

            await ProductModel.findByIdAndUpdate(item._id, {
                categories: cats,
            });
        });
    }
};

const deleteCategories = async (req: any, res: any) => {
    const { id, isDeleted } = req.query;

    try {
        await findAndRemoveCategoryInProducts(id);

        if (isDeleted) {
            await CategoriModel.findByIdAndDelete(id);
        } else {
            await CategoriModel.findByIdAndUpdate(id, {
                isDeleted: false,
            });
        }
        await res.status(200).json({
            message: 'Category deleted!!!',
        });
    } catch (error: any) {
        res.status(404).json({
            message: error.message,
        });
    }
};

const updateCategories = async (req: any, res: any) => {
	const { id } = req.query;
	const body = req.body;

	try {
		await CategoriModel.findByIdAndUpdate(id, body);

		const item = await CategoriModel.findById(id);

		res.status(200).json({
			message: 'Category deleted!!!',
			data: item,
		});
	} catch (error: any) {
		res.status(404).json({
			message: error.message,
		});
	}
};

export { getProduct, addCategory, getCategories, deleteCategories, updateCategories };
