const db = require("../models");
const validator = require("email-validator");
const config = require("../config/user.config")
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if (user) {
            res.status(400).send({
                message: `Failed! Email ${req.body.email} is already taken!`
            });
            return;
        }
        next();
    })
}

checkCorrectEmail = (req, res, next) => {
    const email = req.body.email;
    if (!email || !validator.validate(email)) {
        res.status(400).send({
            message: `Failed! Email ${req.body.email} is incorrect!`
        });
        return;
    }
    next();
}

checkCorrectPassword = (req, res, next) => {
    const password = req.body.password;
    if (!password || password.length < config.MAX_PASSWORD_LEN) {
        res.status(400).send({
            message: `Failed! Password ${req.body.email} is too short!`
        });
        return;
    }
    next();
}

checkCorrectName = (req, res, next) => {
    const regName = /^[A-Z][a-z]+$/
    const first_name = req.body.first_name;
    const last_name = req.body.last_name;
    if (!first_name || !regName.test(first_name)) {
        res.status(400).send({
            message: `Failed! First name ${first_name} is incorrect!`
        });
        return;
    }
    if (!last_name || !regName.test(last_name)) {
        res.status(400).send({
            message: `Failed! Last name ${last_name} is incorrect!`
        });
        return;
    }   
    next()
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail,
    checkCorrectEmail: checkCorrectEmail,
    checkCorrectPassword: checkCorrectPassword,
    checkCorrectName: checkCorrectName
}

module.exports = verifySignUp;