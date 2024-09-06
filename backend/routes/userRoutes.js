const express = require('express');
const router = express.Router();
const User = require('../models/Users');

router.get('/', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({message:"All users Deatails are fetched succesfully",users,success:true});
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

router.post('/add', async (req, res) => {
    const { name, email, phone } = req.body;
    const newUser = new User({ name, email, phone });
    try {
        const savedUser = await newUser.save();
        res.status(200).json({message:'New user Added Succesfully',user:savedUser,success:true})
    } catch (err) {
        res.status(500).json({ message: err.message,success:false});
    }
});

module.exports = router;
