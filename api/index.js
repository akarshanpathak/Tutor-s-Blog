import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRouter from './routes/auth.route.js'
import cors from "cors"
import postRoutes from './routes/post.route.js';
import cookieParser from 'cookie-parser';
import path from 'path'
import commentRoutes from './routes/comment.route.js'
dotenv.config();
const __dirname=path.resolve();
const app=express();

app.use(cors());
mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("connection successful")
    
}).catch((err)=>{
    console.log("mongodb connection error",err)
})
app.use(express.json())
app.use(cookieParser())
app.use("/api/user",userRoutes);
app.use("/api/auth",authRouter);
app.use('/api/post', postRoutes);
app.use("/api/comment",commentRoutes)
app.get("/hello")

app.use(express.static(path.join(__dirname,'/client/dist')))
app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'))
})
app.listen(3000,()=>{
    console.log('Server is listening!!')
});

app.use((err,req,res,next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || ' Internal server Error ';
    // console.error("Error handling middleware:");
    // res.status(statusCode).json({
    //     success:false,
    //     statusCode: statusCode,
    //     message:message
    // })
    res.status(statusCode).json({
        message,
        statusCode: statusCode,
        success:false
    })
})
