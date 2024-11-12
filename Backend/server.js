import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import dns from 'dns';
import AuthRoute from './Routes/AuthRoute.js';
import ProductRoute from './Routes/ProductRoute.js'

dns.setServers(['8.8.8.8']);

const app = express();
dotenv.config();
app.use(cors());

const PORT = process.env.PORT || 4000;
const URI = process.env.Mongodb_URI

mongoose.connect(URI, { 
useNewUrlParser: true, 
useUnifiedTopology: true, 
}) 
.then(() => console.log('Database Connected')) 
.catch(err => console.error('Database connection error:', err));

app.use(cors())
app.use(express.json());

// API FOR TESTING USERS
app.use('/user',AuthRoute)

//API FOR TESTING PRODUCTS
app.use('/products',ProductRoute)


app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});
