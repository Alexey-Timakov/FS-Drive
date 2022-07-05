const fs = require("fs");

const resetLog = "./log/reset_pass.log";

const EVENT = [
    "Reset password request from user",
    "Change password request from user",
    "Password has been changed",
    "Error",
    "Smth else..."
];

function logWrite (description, name, key, value) {
    let resetData = {
        "descrition": "",
        "userName": "",
        "resetToken": "",
        "dateAndTime": "",
    };
    resetData.descrition = EVENT[description];
    resetData.userName = name;
    resetData.dateAndTime = Date(Date.now()).toString();
    resetData[key] = value;

    fs.appendFileSync(resetLog, JSON.stringify(resetData) + "\r\n");
}

module.exports = {
    EVENT,
    logWrite
};