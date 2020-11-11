const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../../../models/User');
const jwtGenerator = require('../../../utils/jwtGenerator');
const router = express.Router();
require('dotenv').config();

router.post("/", async(req, res) => {
    try {
        const {email, password} = req.body;
        console.log(email);
        const getEmail = await User.findOne({email: email.toLowerCase()});
        
        if(getEmail == null){
            return res.json(`No such user`).status(401);
        }
        if(await bcrypt.compare(password, getEmail.password)){
            console.log(getEmail._id);
            const jwtToken = jwtGenerator(getEmail._id);
            return res.json({token: jwtToken});
        } else {
            return res.json("Email and Password is incorrect.");
        }
    } catch (err) {
        res.json(err);
    }
})


module.exports = router;