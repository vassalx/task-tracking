const db = require("../models");
const config = require("../config/user.config")
const User = db.user;

exports.updateUser = (req, res) => {
    User.update({
        first_name: req.body.first_name,
        last_name: req.body.last_name
    },
    {
        where: {
            user_id: req.params.user_id
        }
    }
    ).then(user => {
        if (!user[0]) {
            return res.status(404).json({ message: "User Not found." });
        }
        console.log(user);

        res.status(200).json({message:"User updated successfully!"})
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}

exports.deleteUser = (req, res) => {
    User.destroy({
        where: {
            user_id: req.params.user_id
        }
    }).then(num => {
        if(!num){
            return res.status(404).json({ message: "User Not found." });
        }

        res.status(200).json({
            message: "User deleted successfully!"
        });
    }).catch(err => {
        res.status(500).json({message: err.message})
    })
}

exports.getUser = (req, res) => {
    User.findOne({
        where: {
            user_id: req.params.user_id
        },
        attributes: {
            exclude:["password"]
        }
    }).then(user => {
        if(!user){
            return res.status(404).json({ message: "User Not found." });
        }

        res.status(200).json(user)
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}

exports.getAllUsers = (req, res) => {
    const page = parseInt(req.query.page);
    if(!Number.isInteger(page) || page < 1){
        return res.status(400).json({ message: "Page number is incorrect" });
    }
    User.findAll({
        offset: config.MAX_USERS * (page - 1),
        limit: config.MAX_USERS,
        attributes: {
            exclude:["password"]
        }
    }).then(users => {
        if(!users){
            return res.status(404).json({ message: "Users Not found" });
        }

        res.status(200).json(users)
    }).catch(err => {
        res.status(500).json({message: err.message});
    })
}