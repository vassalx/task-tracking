const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.signup = (req, res) => {
    User.create({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        res.json({ message: "User was registered successfully!" });
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
}

exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(user => {
        if(!user){
            return res.status(404).json({message: "User Not found."});
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )

        if(!passwordIsValid){
            return res.status(401).json({
                accessToken: null,
                message: "Invalid Password!"
            })
        }

        var token = jwt.sign({id: user.user_id}, config.secret, {
            expiresIn: 86400
        })

        res.status(200).json({
            user_id: user.user_id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            accessToken: token
        })
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
}