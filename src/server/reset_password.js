const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const SFDriveUsers = require("./DB");

const {RESET_TOKEN_SECRET} = require("./variables");
const {RESET_TOKEN_LIFE} = require("./variables");

const resetPass = express.Router();

resetPass.use(bodyParser.json());

resetPass.post("/", async (req, res) => {
    const userMail = req.body.userMail;
    console.log("Requested user to reset password: ", userMail);
    
    const payload = {
        "userName": userMail,
        "type": "change-pass",
    };

    try {
        const userToReset =  await SFDriveUsers.findOne({"userMail": userMail});
        if (userToReset != null) {
            console.log("User have been found!", userToReset.userMail);

            const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, {expiresIn: RESET_TOKEN_LIFE});
            userToReset.update({})
        } 
    } catch (error) {
        console.log("Error", error);
        res.status(401).send({"message": "Something went wrong...", "isOK": false});
    }
});

module.exports = resetPass;