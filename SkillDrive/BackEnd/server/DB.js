const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/sfdrive', {useNewUrlParser: true, useUnifiedTopology : true})
    .then(() => console.log("Connection to DB has been established"));

mongoose.set('useFindAndModify', false);

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
        accessToken: String,
        refreshToken: String,
        resetToken: String,
});

module.exports = mongoose.model("SFDriveUsers", SFDriveUsersSchema);