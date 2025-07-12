import { v2 as cloudinary } from "cloudinary"
import Product from "../models/products.js"

//add
export const addProduct = async (req, res) => {
    try {
        const productData = JSON.parse(req.body.productData)
        const images = req.files;

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: "image" });
                return result.secure_url

            })
        )
        await Product.create({ ...productData, images: imagesUrl })
        res.json({ success: true, message: "Product Added" })
        console.log(imagesUrl)
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });

    }


}
//list
export const productList = async (req, res) => {
    try {
        const products = await Product.find({})
        res.json({ success: true, products })
    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}
//produst-details
export const productById = async (req, res) => {

    try {
        const { id } = req.body;
        const product = await Product.findById(id)
        res.json({ success: true, product })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}

//change-stock
export const changeStock = async (req, res) => {
    try {
        const { id, inStock } = req.body;
        await Product.findByIdAndDelete(id, { inStock })
        res.json({ success: true, message: "Stock Updated" })

    } catch (error) {
        console.log(error.message)
        res.json({ success: false, message: error.message });
    }
}