const db = require("../models");
const User = db.user;

checkDuplicateEmail = (req, res, next) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(user){
            res.status(400).send({
                message: `Failed! Email ${req.body.email} is already taken!`
            });
            return;
        }
        next();
    })
}

const verifySignUp = {
    checkDuplicateEmail: checkDuplicateEmail
}

module.exports = verifySignUp;