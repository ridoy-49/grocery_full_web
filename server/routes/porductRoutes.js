import  express  from 'express';
import authSeller from '../middleware/authSeller.js';
import authUser from '../middleware/authUser.js';
import { addProduct, changeStock, productById, productList } from '../controllers/productController.js';
import { upload } from '../config/multer.js';

const productRouter=express.Router();

productRouter.post("/add-product", upload.array(["images"]) ,authSeller, addProduct)
productRouter.get("/list", productList)
productRouter.get("/produst-details", productById)
productRouter.post("/change-stock",authSeller, changeStock)





export default productRouter;