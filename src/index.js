// Load environment variables from .env file
dotenv.config();
import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/index.js";

const app = express();
 

connectDB()
.then(()=>{
    app.on("error",(error) => {
        console.log("ERRR:",error);
        throw error;
    })
    app.listen(process.env.PORT || 3000,()=>{
        console.log(`Server is running at port ${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("MONGO db connection failed !!!",err);
})







// import mongoose from "mongoose";
// import { DB_NAME } from "./constants.js";

// (async () => {
//     try {
//         await mongoose.connect(`${process.env.MONOGO_DB_URL}/${DB_NAME}`);
//         app.listen(process.env.PORT, () => {
//             console.log(`App is listening on port ${process.env.PORT}`);
//         });
//     } catch (error) {
//         console.error("ERROR:", error);
//         throw error;
//     }
// })();
