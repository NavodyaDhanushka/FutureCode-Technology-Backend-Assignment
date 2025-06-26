const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');          // << Add this line
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
require('./models/db');

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',   // React app URL, adjust if different
    credentials: true                  // if you use cookies/auth headers
}));

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
