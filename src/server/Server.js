const express = require("express");
// const bodyParser = require('body-parser');

// Import Routers
const authorize = require("./authorize");
const resetPass = require("./reset_password");
const registration = require("./registration");

// Import DB
const SFDriveUsers = require("./DB");

//Import functions:

// Main part:
const app = express();

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["http://localhost:8080"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/login", authorize);

app.use("/registration", registration);

app.use("/resetpass", resetPass);

//Get list of users:
app.get("/list", async (req, res) => {
    const usersData = await SFDriveUsers.find();
    // res.json(JSON.stringify(usersData));
    res.json(usersData);
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});