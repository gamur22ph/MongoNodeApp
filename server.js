// Modules
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

// Initialization
const app = express();
const PORT = process.env.PORT | 5000;
app.use(cors());
app.use(express.json());

// Program Flow
// app.get("/", (req, res) => {
//     res.send("this is the server of the website");
// })

// API Route
app.use("/posts", require('./routes/posts'));
app.use("/api", require('./routes/api/index'));

// Client Route
// UNCOMMENT THE CODE BELOW TO WORK WITH BUILD
// // START
// app.use(express.static(path.join(__dirname, 'client', 'build')));
// app.use("/*", async(req, res) => {
//     try {
//         res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
//     } catch (error) {
//         console.error(error);
//     }
// })
// // END

mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("MongoDB is working");
})

// Listen
app.listen(PORT, () => {
    console.log(`Listening to PORT ${PORT}`)
})