const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const authorize = express.Router();

const SFDriveUsers = require("./DB");
const { generateToken } = require("./gen_token");

authorize.use(bodyParser.json());

authorize.post("/", async (req, res) => {
    const userMail = req.body.userMail;
    const userPassword = req.body.userPassword;
    console.log("Requested data: ", userMail, userPassword);

    const userToLogin =  await SFDriveUsers.findOne({"userMail": userMail});

    if (userToLogin != null) {
        console.log("User have been found!", userToLogin.userMail);
        bcrypt.compare(userPassword, userToLogin.userPassword, function(err, isMatch) {
            if (err) {
                console.log("WOW!", err);
                res.status(401).send({"message": err, "isOK": false});
            } else if (isMatch) {
                console.log("Password matches!");
                const tokens = generateToken(userMail);
                res.status(200).send({"message": "Login and password match!", "isOK": true, tokens});
            } else {
                console.log("Password does NOT match!");
                res.status(401).send({"message": "Login and password do NOT match!", "isOK": false});
            }
        })
    } else {
        console.log("User have NOT been found!", userToLogin.userMail);
        res.status(401).send({"message": "User have NOT been found!", "isOK": false});
    }
});

module.exports = authorize;