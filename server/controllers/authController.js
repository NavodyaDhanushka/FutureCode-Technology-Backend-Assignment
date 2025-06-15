const User = require('../models/userModel');

exports.registerUser = (req, res) => {
    const { username, email, password } = req.body;

    User.findUserByEmail(email, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length > 0) return res.status(400).json({ message: 'Email already registered' });

        User.createUser(username, email, password, (err) => {
            if (err) return res.status(500).json({ error: err });
            res.status(201).json({ message: 'User registered successfully' });
        });
    });
};

exports.loginUser = (req, res) => {
    const { email, password } = req.body;

    User.findUserByCredentials(email, password, (err, results) => {
        if (err) return res.status(500).json({ error: err });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        res.status(200).json({ message: 'Login successful', user: results[0] });
    });
};
