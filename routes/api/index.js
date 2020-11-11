const express = require('express');
const router = express.Router();

// Users Route
router.use("/users/login", require("./user/login"));
router.use("/users/register", require("./user/register"));

// Protected Route
router.use("/protected", require('./protected/index'));

// Products Route
router.use("/products", require('./products/index'));

module.exports = router;