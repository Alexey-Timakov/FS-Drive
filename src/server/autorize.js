const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

const authorize = express.Router();
const {SFDriveUsers} = require("./DB");

authorize.use(bodyParser.json());

authorize.post("/", (req, res) => {
    const userMail = req.body.userMail;
    const userPassword = req.body.userPassword;

    const userToLogin =  SFDriveUsers.findOne({"userMail": userMail});

    if (userToLogin != null) {
        console.log("User found!", userMail);
        bcrypt.compare(userPassword, userToLogin.userPassword, function(err, isMatch) {
            if (err) {
                console.log(err);
            } else if (isMatch) {
                console.log("Password matches!");
                res.send({"message": "Password matches!"});
            } else {
                console.log("Password does NOT match!");
                res.send({"message": "Password does NOT match!"});
            }
        })
    }
});