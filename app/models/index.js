const config = require("../config/db.config.js");
const task_config = require("../config/task.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./user.mode")(sequelize, Sequelize);
db.task = require("./task.model")(sequelize, Sequelize);

db.task.belongsTo(db.user,{
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'user_id',
    allowNull: false
  }
})

db.TASK_STATUSES = task_config.TASK_STATUSES;

module.exports = db;