const task_config = require("../config/task.config");
module.exports = (sequelize, Sequelize) => {
    const Task = sequelize.define("tasks", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        status: {
            type: Sequelize.ENUM(task_config.TASK_STATUSES),
            allowNull: false
        }
    });

    return Task;
};