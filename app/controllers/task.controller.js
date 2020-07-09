const db = require("../models");
const config = require("../config/task.config")
const Task = db.task;
const User = db.user;

exports.createTask = (req, res) => {
    Task.create({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user_id: req.body.decoded_id
    }).then(task => {
        res.json({ message: "Task was created successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}

exports.updateTask = (req, res) => {
    let new_user_id = req.body.user_id;
    if(!new_user_id){
        new_user_id = req.body.decoded_id;
    }
    Task.update({
        title: req.body.title,
        description: req.body.description,
        status: req.body.status,
        user_id: new_user_id
    }, {
        where: {
            id: req.body.id,
            user_id: req.body.decoded_id
        }
    }).then(task => {
        if (!task[0]) {
            return res.status(404).json({ message: "Task Not found or does not belong to user." });
        }

        res.json({ message: "Task was updated successfully!" });
    }).catch(err => {
        res.status(500).json({ message: err.message });
    })
}

exports.deleteTask = (req, res) => {
    Task.destroy({
        where: {
            id: req.params.id,
            user_id: req.body.decoded_id
        }
    }).then(num => {
        if (!num) {
            return res.status(404).json({ message: "Task Not found or does not belong to user." });
        }

        res.status(200).json({
            message: "Task deleted successfully!"
        });
    }).catch(err => {
        res.status(500).json({ message: err.message })
    })
}

exports.getAllTasks = (req, res) => {
    const where = {};
    if(req.query.statusFilter){
        where.status = req.query.statusFilter;
    }
    const order = (req.query.ordNewFirst) ? "ASC" : "DESC";
    Task.findAll({
        where: where,
        include: [{
            model: User,
            attributes: { exclude: ["password"] },
            as: "user"
        }],
        attributes: {
            exclude: [
                "user_id"
            ]
        },
        order: [[User, "createdAt", order]]
    }).then(tasks => {
        if (!tasks) {
            return res.status(404).json({ message: "Tasks Not found" });
        }

        res.status(200).json(tasks)
    })
}