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
    const queryUser = {"userMail": userMail};
    console.log("Requested user to reset password: ", userMail);
    
    const payload = {
        "userName": userMail,
        "type": "change-pass",
    };

    const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, {expiresIn: RESET_TOKEN_LIFE});

    try {
            await SFDriveUsers.findOneAndUpdate(queryUser, {$set: {"resetToken": resetToken}}, {returnNewDocument: true}, (err, doc) => {
                if (doc) {
                    console.log("Found");
                    res.status(200).send({"message": "Reset password request has been acepted", "isOK": true});
                } else if (!doc) {
                    console.log("Not found");
                    res.status(501).send({"message": "Something went wrong...", "isOK": false});
                } else if (err) {
                    console.log("Error", err);
                    res.status(501).send({"message": "Something went wrong...", "isOK": false});
                }
            });
    }
    catch (error) {
        console.log("Error", error);
        res.status(501).send({"message": "Something went wrong...", "isOK": false});
    }
});

module.exports = resetPass;