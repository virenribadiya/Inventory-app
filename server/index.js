import express from "express";
import { connectDB } from "./db/index.js";
import dotenv from "dotenv";
import cors from "cors";
import { loginRegisterRouter,userRouter,productRouter } from "./routes/index.js";
import {Product } from "./models/index.js";

dotenv.config();
const PORT = process.env.PORT || 5000;


const app = express();
// app.use(cors({
//     origin: 'http://localhost:5173',
//     credentials: true
// }));

app.use(cors());

app.use(express.json());

app.use("/api/v1/auth", loginRegisterRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/product",productRouter);

app.get("/api/v1/", (req, res) => {
    res.status(403).json({ message: "unauthenticated" });
})

app.post('/categories', async (req, res) => {
    try {
      // Extract categories from the request body
      const categories = req.body.categories;
  
      // Insert categories into the database
      //await CategoryLookup.insertMany(categories);
  
      // Send a success response
      res.status(201).json({ message: 'Categories inserted successfully' });
    } catch (error) {
      // Handle errors
      console.error('Error inserting categories:', error);
      res.status(500).json({ error: 'An error occurred while inserting categories' });
    }
  });



app.post('/products',async (req, res) => {
    try {
        const products = req.body.products; // Get the products from the request body

        // Insert all products into the database
        const insertedProducts = await Product.insertMany(products);

        // If successful, return the inserted products
        return res.status(201).json({ success: true, message: 'Products inserted successfully', data: insertedProducts });
    } catch (error) {
        // If an error occurs, return an error response
        console.error('Error inserting products:', error);
        return res.status(500).json({ success: false, message: 'Failed to insert products', error: error.message });
    }
});
  

const start = async () => {
    try {
        await connectDB(process.env.URI);
        app.listen(PORT, () => {
            console.log(`http://localhost:${PORT}`);
        })
    } catch (error) {
        console.log(error);
    }
}

start();

