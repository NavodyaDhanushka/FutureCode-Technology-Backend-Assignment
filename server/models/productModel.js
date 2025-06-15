const db = require('./db');

// Create Product
exports.createProduct = (product, callback) => {
    const sql = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
    db.query(sql, [product.name, product.price, product.quantity], callback);
};

// Get All Products
exports.getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};

// Get Product by ID
exports.getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};

// Update Product
exports.updateProduct = (id, product, callback) => {
    const sql = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(sql, [product.name, product.price, product.quantity, id], callback);
};

// Delete Product
exports.deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
};

