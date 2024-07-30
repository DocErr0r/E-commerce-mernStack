import serverHandler from "../middlewares/serverhandler.js";
import Category from "../models/category.js";

export const creactCategory = serverHandler(async (req, res) => {
    try {
        const { name } = req.body

        const exist = await Category.findOne({ name })
        if (exist) {
            return res.status(400).send({ message: "category already exist" })
        }
        const category = new Category(req.body)
        category.user=req.user._id
        await category.save()
        res.status(200).send({ date: category })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

export const updateCategory = serverHandler(async (req, res) => {
    try {
        const { name } = req.body
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).send({ message: "category not found" })
        }
        if(req.user._id.toString()!==category.user.toString()){
            return res.status(400).send({ message: "This category is not create by you" })
        }
        const exist = await Category.findOne({ name })
        if (exist) {
            return res.status(400).send({ message: "category already exist" })
        }
        // category.name=name
        const newCategory = await Category.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })

        res.status(200).send({ date: newCategory })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

export const removeCategory = serverHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) {
            return res.status(400).send({ message: "category not found" })
        }
        if (req.user._id.toString() !== category.user.toString()) {
            return res.status(400).send({ message: "This category is not create by you" })
        }

        const remove = await Category.findByIdAndDelete(req.params.id)

        res.status(200).send({ data: remove, message: "Category Deleted" })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

export const getCategories = serverHandler(async (req, res) => {
    try {
        const categories = await Category.find()
        if (!categories) return res.status(400).send({ message: 'no such category found' });
        res.status(200).send({ data: categories })
    } catch (error) {
        console.log(error);
        res.status(500).send(error)
    }
})

export const getCategory = serverHandler(async (req, res) => {
    try {
        const category = await Category.findById(req.params.id)
        if (!category) return res.status(400).send({ message: 'no such category found' });
        res.status(200).send({ data: category })
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message)
    }
})
