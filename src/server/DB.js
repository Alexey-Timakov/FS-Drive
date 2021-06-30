const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sfdrive', {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => console.log("Connection to DB has been established"));

const SFDriveUsersSchema = new mongoose.Schema({
    userName: String,
    userBirth: String,
    userMail: String,
    userPhone: String,
    userPassport: String,
    userPassportDate: String,
    userPassportEmit: String,
    userPassportEmitNum: String,
    userLicId: String,
    userLicIdDate: String,
    userPassword: String,
    userSalt: String,
});

const SFDriveUsers = mongoose.model("SFDriveUsers", SFDriveUsersSchema);

module.exports = {SFDriveUsers};