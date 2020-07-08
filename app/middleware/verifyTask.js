const db = require("../models");
const Task = db.task;
const User = db.user;

checkTaskStatus = (req, res, next) => {
    if(!(db.TASK_STATUSES.includes(req.body.status))){
        res.status(400).send({
            message: `Failed! Incorrect status of task "${req.body.status}"!`
        });
        return;
    }
    next();
}

checkAssociatedUser = (req, res, next) => {
    User.findOne({
        where: {
            user_id: req.body.user_id
        }
    }).then(user => {
        if (!user) {
            return res.status(404).json({ message: `User Not found with id ${req.body.user_id}.` });
        }
        next()
    }).catch(err => {
        return res.status(500).json({ message: err.message });
    });
}

const verifyTask = {
    checkTaskStatus: checkTaskStatus,
    checkAssociatedUser: checkAssociatedUser
}

module.exports = verifyTask;