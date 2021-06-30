const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Import Routers
const authorize = require("./autorize");

// Import DB
const {SFDriveUsers} = require ("./DB");

const app = express();

let newUserData = {};

function hashPass(passToHash) {
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, function(err, salt) {
        newUserData.userSalt = salt;
        // console.log(salt);
        bcrypt.hash(passToHash, salt)
            .then(function(hash){
            newUserData.userPassword = hash;
            // console.log(newUserData.userPassword);
        });
    })
}

// mongoose.connect('mongodb://localhost/sfdrive', {useNewUrlParser: true, useUnifiedTopology : true})
//     .then(() => console.log("Connection to DB has been established"));

// const SFDriveUsersSchema = new mongoose.Schema({
//     userName: String,
//     userBirth: String,
//     userMail: String,
//     userPhone: String,
//     userPassport: String,
//     userPassportDate: String,
//     userPassportEmit: String,
//     userPassportEmitNum: String,
//     userLicId: String,
//     userLicIdDate: String,
//     userPassword: String,
//     userSalt: String,
// });

// const SFDriveUsers = mongoose.model("SFDriveUsers", SFDriveUsersSchema);

app.use((req, res, next) => {
    res.append("Access-Control-Allow-Origin", ["http://localhost:8080"]);
    res.append("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.append("Access-Control-Allow-Headers", "Content-Type");
    next();
});

app.use("/login", authorize);

app.use(bodyParser.json());

app.get("/", async (req, res) => {
    const usersData = await SFDriveUsers.find();
    // res.json(JSON.stringify(usersData));
    res.json(usersData);
});

app.post("/", async (req, res) => {    
    let resCode = 0; // newUser's email is OK
    Object.entries(req.body).forEach(([key, value]) => {
        if (key === "userPassword") {
            hashPass(value);
        } else {
            newUserData[key] = value;
        }
    });
    const checkVal = await SFDriveUsers.find({"userMail": newUserData.userMail})
    // console.log("checkVal = ", checkVal, checkVal.length);

    if (checkVal.length == 0) {
        const newUser = new SFDriveUsers(newUserData);
        await newUser.save();
        res.send({"code": resCode, "message": "New user has been saved."})
        // res.send({"code": resCode, "message": tempVal})
    } else {
        resCode = 1; // newUser's email is NOT OK
        res.send({"code": resCode, "message": "User with this email is already exist."})
    }
});

app.listen(8000, () => {
    console.log("Server is listening on port 8000");
});