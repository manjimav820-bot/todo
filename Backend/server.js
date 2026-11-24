const express =require('express');
const cors =require('cors');
const DBConnect =require('./config/db.js');
require('dotenv').config();
const authRoutes=require('./routes/authroutes.js');
const blogRoutes=require('./routes/blogroute.js');



const app=express();

const port=5550;

app.use(cors());
app.use(express.json());

DBConnect();
app.use("/api/auth",authRoutes)
app.use("/api/blog",blogRoutes)
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});