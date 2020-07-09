const { authJwt, verifyTask } = require("../middleware");
const controller = require("../controllers/task.controller");

module.exports = function (app){
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.post(
        "/api/task",
        [
            authJwt.verifyToken,
            verifyTask.checkTaskStatus
        ],
        controller.createTask
    )

    app.put(
        "/api/task",
        [
            authJwt.verifyToken, 
            verifyTask.checkAssociatedUser,
            verifyTask.checkTaskStatus
        ],
        controller.updateTask
    )

    app.delete(
        "/api/task/:id",
        [authJwt.verifyToken],
        controller.deleteTask
    )

    app.get(
        "/api/task",
        [authJwt.verifyToken],
        controller.getAllTasks
    )
};