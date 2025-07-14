import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connetDb from "./config/db.js";
import  "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import productRouter from "./routes/porductRoutes.js";
import cartRouter from "./routes/cartRouters.js";
import addressRouter from "./routes/addressRoutes.js";
import orderRouter from "./routes/ordersRoutes.js";


const app=express();
const port=process.env.PORT|| 4000;

await connetDb();
await connectCloudinary();


//multiple allowed origin
const allowedOrigin=["http://localhost:5173"]

//MiddleWare
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:allowedOrigin,
    credentials:true
}))

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})