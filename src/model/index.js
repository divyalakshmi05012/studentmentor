import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const dbURI=`${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`
mongoose.connect(dbURI)
.then((value)=>console.log("mongoose connected"))
.catch((err)=>console.log(err))



export default mongoose