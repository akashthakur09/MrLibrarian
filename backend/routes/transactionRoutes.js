const express = require('express');
const router = express.Router();
const Transaction = require('../models/Transactions');
const User = require('../models/Users');
const Book = require('../models/Books');

router.post('/issue', async (req, res) => {
    const { name, userId, bookId, issueDate } = req.body;
    const newTransaction = new Transaction({ name, userId, bookId, issueDate});
    try {
        const savedTransaction = await newTransaction.save();
        res.status(200).json({savedTransaction,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.post('/return', async (req, res) => {
    const { name, userId, bookId, returnDate } = req.body;
    try {
        const transaction = await Transaction.findOne({ name, userId, bookId, returnDate: null });
        if (!transaction) return res.status(400).json({ message: 'No active issue found' });

        transaction.returnDate = returnDate;
        const rentDays = Math.ceil((new Date(returnDate) - new Date(transaction.issueDate)) / (1000 * 60 * 60 * 24));
        const book = await Book.findById(bookId);
        transaction.rent = rentDays * book.rentPerDay;
        await transaction.save();

        res.status(200).json({transaction,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.get('/rent/:bookId', async (req, res) => {
    try {
        const transactions = await Transaction.find({ bookId: req.params.bookId });
        console.log(transactions);
        const totalRent = transactions.reduce((sum, transaction) => {
            return sum + (transaction.rent || 0);
        }, 0);
        console.log(totalRent);
        res.status(200).json({ totalRent,success:true });
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});


router.get('/book', async (req, res) => {
    const { bookName } = req.query;

    try {
        const book = await Book.findOne({ name: bookName });
        if (!book) {
            return res.status(404).json({ message: 'Book not found', success: false });
        }

        const transactions = await Transaction.find({ bookId: book._id }).populate('userId', 'name email'); // Populate user details

        const issuedUsers = transactions.map((t) => ({
            userId: t.userId._id,
            name: t.userId.name,
            email: t.userId.email,
            issueDate: t.issueDate,
            returnDate: t.returnDate,
        }));

        const currentlyIssued = transactions.find((t) => !t.returnDate);

        const issuedCount = transactions.length;

        res.status(200).json({
            issuedCount,
            currentlyIssued: currentlyIssued
                ? {
                    userId: currentlyIssued.userId._id,
                    name: currentlyIssued.userId.name,
                    email: currentlyIssued.userId.email,
                    issueDate: currentlyIssued.issueDate,
                }
                : 'Not currently issued',
            issuedUsers, 
            success: true,
        });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});


router.get('/user', async (req, res) => {
    const { userId } = req.query;
    try {
       
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found', success: false });
        }
        
        const transactions = await Transaction.find({ userId });
        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found for this user', success: false });
        }

        res.status(200).json({ transactions, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

router.get('/daterange', async (req, res) => {
    const { startDate, endDate } = req.query;
    try {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const transactions = await Transaction.find({
            issueDate: { $gte: start, $lte: end }
        }).populate('userId', 'name'); 

        if (!transactions.length) {
            return res.status(404).json({ message: 'No transactions found in this date range', success: false });
        }

        res.status(200).json({ transactions, success: true });
    } catch (err) {
        res.status(500).json({ message: err.message, success: false });
    }
});

module.exports = router;
