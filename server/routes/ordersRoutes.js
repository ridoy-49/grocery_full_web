import  express from 'express';
import authUser from '../middleware/authUser.js';
import { getAllOrders, getUserOrders, placeOrderCOD } from '../controllers/orderController.js';
import authSeller from '../middleware/authSeller.js';

const orderRouter= express.Router();

orderRouter.post("/place-cod",authUser, placeOrderCOD)
orderRouter.get("/get-user-order",authUser, getUserOrders)
orderRouter.get("/get-all-orders",authSeller, getAllOrders)


export default orderRouter;
