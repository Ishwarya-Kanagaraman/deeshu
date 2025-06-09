// routes/index.js
const express = require('express');
const router = express.Router();
const userRoutes = require('./user.routes')

router.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the Deeshu Ecommerce API!' });
});

router.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
});
// Add more routes here
router.use('/users', userRoutes );

module.exports = router;
