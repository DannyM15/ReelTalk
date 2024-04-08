const express = require('express');
const router = express.Router();

// Dummy database to store reviews
let reviews = [];

// Route to add a new review
router.post('/reviews', (req, res) => {
    const { customerId, productId, rating, comment } = req.body;

    // Validate input
    if (!customerId || !productId || !rating || !comment) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    // Save the review to the database
    const newReview = {
        id: reviews.length + 1,
        customerId,
        productId,
        rating,
        comment,
        createdAt: new Date()
    };
    reviews.push(newReview);

    // Return the newly created review
    res.status(201).json(newReview);
});

// Route to get all reviews
router.get('/reviews', (req, res) => {
    res.json(reviews);
});

module.exports = router;
