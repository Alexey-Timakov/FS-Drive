const express = require("express");
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');

// Import Routers
const authorize = require("./autorize");

// Import DB
const SFDriveUsers = require("./DB");

const app = express();

let newUserData = {};

function hashPass(passToHash) {
    const saltRounds = 10;

    bcrypt.genSalt(saltRounds, async function(err, salt) {
        newUserData.userSalt = await salt;
        // console.log(newUserData.userSalt);
        bcrypt.hash(passToHash, salt, async function(err, hash) {
            if (hash) {
                newUserData.userPassword = await hash;
                // console.log(newUserData.userPassword);
            }
        });
    })
}

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