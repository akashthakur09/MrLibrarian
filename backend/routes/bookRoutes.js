const express = require('express');
const router = express.Router();
const Book = require('../models/Books');

router.get('/', async (req, res) => {
    try {
        const books = await Book.find();
        res.status(200).json({msg:books,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.get('/search', async (req, res) => {
    const { term } = req.query;
    try {
        const books = await Book.find({ name: { $regex: term, $options: 'i' } });
        res.status(200).json({msg:books,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.get('/rent-range', async (req, res) => {
    const { minRent, maxRent } = req.query;
    try {
        const books = await Book.find({ rentPerDay: { $gte: minRent, $lte: maxRent } });
        res.status(200).json({msg:books,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.get('/filter', async (req, res) => {
    const { category, term, minRent, maxRent } = req.query;
    try {
        const books = await Book.find({
            category: category,
            name: { $regex: term, $options: 'i' },
            rentPerDay: { $gte: minRent, $lte: maxRent }
        });
        res.status(200).json({msg:books,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.post('/add', async (req, res) => {
    const { bookName, category, rentPerDay } = req.body;

    if (!bookName || !category || !rentPerDay) {
        return res.status(400).json({ message: 'All fields are required', success: false });
    }

    const newBook = new Book({
        name: bookName,
        category: category,
        rentPerDay: rentPerDay
    });

    try {
        
        const savedBook = await newBook.save();
        res.status(201).json({ msg: 'Book added successfully', book: savedBook, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

module.exports = router;
