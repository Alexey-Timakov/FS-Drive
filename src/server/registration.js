const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Import DB:
const SFDriveUsers = require("./DB");

// Import functions:
const { generateToken } = require("./gen_token");

// Main part:
let newUserData = {};

const registration = express.Router();

registration.use(bodyParser.json());

registration.post("/", async (req, res) => { 
    let resCode = 0; // newUser's email is OK
    const checkVal = await SFDriveUsers.find({"userMail": newUserData.userMail})
    
    if (checkVal.length == 0) {
        const saltRounds = 10;
        
        Object.entries(req.body).forEach(async([key, value]) => {
            if (key === "userPassword") {
                newUserData.userPassword = bcrypt.hashSync(value, saltRounds);
            } else {
                newUserData[key] = value;
            }
        });

        const tokens = await generateToken(newUserData.userMail);
        newUserData.accessToken = tokens.accessToken;
        newUserData.refreshToken = tokens.refreshToken;
        console.log(newUserData);

        const newUser = new SFDriveUsers(newUserData);
        await newUser.save();
        res.send({"code": resCode, "message": "New user has been saved.", "isOK": true, tokens})
    } else {
        resCode = 1; // newUser's email is NOT OK
        res.send({"code": resCode, "message": "User with this email is already exist.", "isOK": false,})
    }
});

module.exports = registration;