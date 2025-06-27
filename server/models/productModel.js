const db = require('./db');

exports.createProduct = (product, callback) => {
    const sql = 'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)';
    db.query(sql, [product.name, product.price, product.quantity], callback);
};


exports.getAllProducts = (callback) => {
    db.query('SELECT * FROM products', callback);
};


exports.getProductById = (id, callback) => {
    db.query('SELECT * FROM products WHERE id = ?', [id], callback);
};


exports.updateProduct = (id, product, callback) => {
    const sql = 'UPDATE products SET name = ?, price = ?, quantity = ? WHERE id = ?';
    db.query(sql, [product.name, product.price, product.quantity, id], callback);
};


exports.deleteProduct = (id, callback) => {
    db.query('DELETE FROM products WHERE id = ?', [id], callback);
};

