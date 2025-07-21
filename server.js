import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './confg/db.js';
import authRoute from './route/authRoute.js';
import CategoryRoute from './route/CategoryRoute.js';
import cors from 'cors';
import productRoute from './route/productRoute.js'
import cartRoute from './route/cartRoute.js';



dotenv.config();

connectDB(); // db config

const app = express(); // rest obj

// middlewares
app.use(cors())
app.use(express.json());
app.use(morgan('dev'));


//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',CategoryRoute)
app.use('/api/v1/product',productRoute)
app.use('/api/v1/cart', cartRoute);


//rest api
app.get('/', (req, res) => {
    res.send('<h1>welcome to ecommerce<h1>');
});

const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`);
});
