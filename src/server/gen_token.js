const jwt = require('jsonwebtoken');

const {ACCES_TOKEN_SECRET} = require("./variables");
const {ACCES_TOKEN_LIFE} = require("./variables");
const {REFRESH_TOKEN_SECRET} = require("./variables");
const {REFRESH_TOKEN_LIFE} = require("./variables");

function generateToken(name) {
    const payload = {
        "userName": name,
        "userRole": "user",
    };
    const accessToken = jwt.sign(payload, ACCES_TOKEN_SECRET, {expiresIn: ACCES_TOKEN_LIFE});
    const refreshToken = jwt.sign(payload, REFRESH_TOKEN_SECRET, {expiresIn: REFRESH_TOKEN_LIFE});

    const tokens = {
        "accessToken": accessToken,
        "refreshToken": refreshToken
    };
    
return tokens;
};

module.exports = {
    generateToken
}