import express from 'express'
import Products from '../Models/Product.js'

// Creating a product
export const createProduct = async (req, res) => {
    try {
        const newProduct = new Products(req.body);
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error detected!" });
    }
};

// Get all products
export const getAllProducts = async (req, res) => {
    try {
        const products = await Products.find();
        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ message: "Internal server error detected!" });
    }
};

// Update a product
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json(updatedProduct);
    } catch (error) {
        console.error("Error updating product:", error);
        res.status(500).json({ message: "Internal server error detected!" });
    }
};

// Delete a Product
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Products.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        console.error("Error deleting product:", error);
        res.status(500).json({ message: "Internal server error detected!" });
    }
};
