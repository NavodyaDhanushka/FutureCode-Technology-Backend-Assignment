const productModel = require('../models/productModel');


exports.createProduct = (req, res) => {
    const { name, price, quantity } = req.body;
    if (!name || !price || !quantity) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    productModel.createProduct({ name, price, quantity }, (err, result) => {
        if (err) return res.status(500).json({ message: 'Error creating product', error: err });
        res.status(201).json({ message: 'Product created successfully', productId: result.insertId });
    });
};


exports.getAllProducts = (req, res) => {
    productModel.getAllProducts((err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching products', error: err });
        res.status(200).json(results);
    });
};

exports.getProductById = (req, res) => {
    const id = req.params.id;
    productModel.getProductById(id, (err, results) => {
        if (err) return res.status(500).json({ message: 'Error fetching product', error: err });
        if (results.length === 0) return res.status(404).json({ message: 'Product not found' });
        res.status(200).json(results[0]);
    });
};


exports.updateProduct = (req, res) => {
    const id = req.params.id;
    const { name, price, quantity } = req.body;

    productModel.updateProduct(id, { name, price, quantity }, (err) => {
        if (err) return res.status(500).json({ message: 'Error updating product', error: err });
        res.status(200).json({ message: 'Product updated successfully' });
    });
};

exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    productModel.deleteProduct(id, (err) => {
        if (err) return res.status(500).json({ message: 'Error deleting product', error: err });
        res.status(200).json({ message: 'Product deleted successfully' });
    });
};
