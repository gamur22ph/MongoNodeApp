const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');

const router = express.Router();

router.post("/", async(req, res) => {
    try {
        const {username, email, password, isAdmin} = req.body;
        const getEmail = await User.findOne({email: email.toLowerCase()});
        if(getEmail != null){
            return res.json({message: "Email already exists"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username: username,
            email: email.toLowerCase(),
            password: hashedPassword,
            isAdmin: isAdmin
        })
        await newUser.save();
        return res.json({successMessage: "User successfully registered"});
    } catch (err) {
        console.error(err);
        res.json(err);
    }
})

module.exports = router;