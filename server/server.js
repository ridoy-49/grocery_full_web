import cookieParser from "cookie-parser";
import express from "express"
import cors from "cors"
import connetDb from "./config/db.js";
import  "dotenv/config";
import userRouter from "./routes/userRoutes.js";
import sellerRouter from "./routes/sellerRoutes.js";


const app=express();
const port=process.env.PORT|| 4000;

await connetDb();


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

app.listen(port, ()=>{
    console.log(`Server is running on http://localhost:${port}`)
})