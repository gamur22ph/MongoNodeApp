// Modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// Initialization
const app = express();
const PORT = process.env.PORT | 5000;
app.use(cors());
app.use(express.json());

// Program Flow
app.get("/", (req, res) => {
    res.send("this is the server of the website");
})

// Posts Route
app.use("/posts", require('./routes/posts'));
app.use("/api", require('./routes/api/index'));

// Error Page if not found
app.use("*", (req, res) => {
    res.status(404).send("Error 404: Not Found.");
})

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("MongoDB is working");
})

// Listen
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})