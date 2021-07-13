const express = require("express");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const jwtDecode = require("jwt-decode");
const SFDriveUsers = require("./DB");
const sendEmail = require("./send_email");
const { logWrite } = require("./log_write");

const {RESET_TOKEN_SECRET} = require("./variables");
const {RESET_TOKEN_LIFE} = require("./variables");
const {EVENT} = require("./log_write");

const resetPass = express.Router();

resetPass.use(bodyParser.json());

resetPass.post("/", async (req, res) => {
    const userMail = req.body.userMail;
    const queryUser = {"userMail": userMail};
    console.log("Requested user to reset password: ", userMail);
    
    const payload = {
        "userName": userMail,
        "type": EVENT[0],
    };

    const resetToken = jwt.sign(payload, RESET_TOKEN_SECRET, {expiresIn: RESET_TOKEN_LIFE});
    try {
            await SFDriveUsers.findOneAndUpdate(queryUser, {$set: {"resetToken": resetToken}}, {returnNewDocument: true}, (err, doc) => {
                if (doc) {
                    console.log("Found");
                    logWrite(0, userMail, "resetToken", resetToken);
                    sendEmail(userMail, resetToken);
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

resetPass.use(express.static(__dirname + "/reset_pass_page"));

resetPass.get("/:id", async (req, res) => {
    let tokenData = {};
    const id = req.params.id;
    console.log("Requested reset password form");
    try {
        const idToRest =  await SFDriveUsers.findOne({"resetToken": id});
        if (idToRest != null) {
            try {
                tokenData = jwtDecode(id);
                console.log("Token has been found", tokenData);
                const currentTime = Math.round(Date.now() / 1000);
                const diffTime = tokenData.exp - currentTime;
                const isResetTokenExpired = diffTime > 0;
    
                if (isResetTokenExpired) {
                    logWrite(1, tokenData.userName, "resetToken", id);
                    res.status(200).sendFile(__dirname + "/reset_pass_page/reset_pass_page_from_server.html");
                } else {
                    res.status(401).send({"message": "ResetToken is expired", "isOK": false});
                }
            } catch (error) {
                console.log("Error", error);
                res.status(401).send({"message": "ResetToken is invalid", "isOK": false});
            }
        } else {
            console.log("Token has NOT been found", error);
            res.status(401).send({"message": "Unauthorised", "isOK": false});
        }
    } catch (error) {
        console.log("Token has NOT been found", error);
        res.status(401).send({"message": "Unauthorised", "isOK": false});
    }
});

module.exports = resetPass;