const express = require("express");
const bodyParser = require('body-parser');
const fs = require("fs");
const bcrypt = require('bcrypt');
const SFDriveUsers = require("./DB");
const { logWrite } = require("./log_write");
const resetLog = "./log/reset_pass.log";

const saltRounds = 10;
const userLogInfoLength = 390; // 390 is approximately length of one string
const resetTokenNameLogInfoLength = 13; // 13 is a length of "resetToken" + 1 next symbol
const dateAndTimePrevSimbolLogInfoLength = 3; // 3 is a length of "," symbol before "dateAndTime"


const changePass = express.Router();

changePass.use(bodyParser.json());

changePass.post("/", async (req, res) => {
  const userMail = req.body.userMail;
  const userPassword = req.body.userPassword;

  let newUserData = {
    "userPassword": "",
    "resetToken": "",
  };
  let queryUser = {
    "userMail": userMail,
  };
  let queryResetToken = {
    "resetToken": "",
  };

  newUserData.userPassword = bcrypt.hashSync(userPassword, saltRounds);

  console.log("Requested user to change password: ", userMail);

  fs.readFile(resetLog, "utf8", async (err, data) => {
    if (err) {
      console.log("Error on reading log", err);
      res.status(501).send({ "message": "Something went wrong...", "isOK": false });
    }
    if (data.includes(userMail)) {
      const userInfo = data.substr(data.lastIndexOf(userMail), userLogInfoLength);
      const resetTokenStart = userInfo.lastIndexOf("resetToken") + resetTokenNameLogInfoLength;
      const resetTokenLenght = userInfo.lastIndexOf("dateAndTime") - resetTokenStart - dateAndTimePrevSimbolLogInfoLength;
      const resetToken = userInfo.substr(resetTokenStart, resetTokenLenght);
      queryResetToken.resetToken = resetToken;

      try {
        await SFDriveUsers.findOneAndUpdate({ $and: [queryUser, queryResetToken] }, { $set: newUserData }, { returnNewDocument: true }, (err, doc) => {
          if (doc) {
            console.log("Found");
            res.status(200).send({ "message": "Reset password request has been done", "isOK": true });
            logWrite(2, userMail, "resetToken", "");
          } else if (!doc) {
            console.log("Not found");
            res.status(501).send({ "message": "User have NOT been found", "isOK": false });
          } else if (err) {
            console.log("Error", err);
            res.status(501).send({ "message": "Something went wrong...", "isOK": false });
          }
        });
      }
      catch (error) {
        console.log("Error", error);
        res.status(501).send({ "message": "Something went wrong...", "isOK": false });
      }
    } else {
      console.log("Error", err);
      res.status(501).send({ "message": "Something went wrong...", "isOK": false });
    }
  })
});

module.exports = changePass;