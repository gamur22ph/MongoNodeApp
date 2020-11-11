const express = require('express');
const User = require('../../../models/User');
const authorization = require('../../../middlewares/authorization');
const router = express.Router();
require('dotenv').config();

router.get("/", authorization, async(req, res) => {
    try {
        const getUser = await User.findById(req.user);
        res.json(getUser);
    } catch (err) {
        res.json(err);
    }
})


module.exports = router;