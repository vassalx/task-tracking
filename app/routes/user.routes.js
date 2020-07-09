const { authJwt} = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.put(
        "/api/user",
        [authJwt.verifyToken],
        controller.updateUser
    )

    app.delete(
        "/api/user",
        [authJwt.verifyToken],
        controller.deleteUser
    )
    
    app.get(
        "/api/user",
        [authJwt.verifyToken],
        controller.getUser
    );

    app.get(
        "/api/users",
        [authJwt.verifyToken],
        controller.getAllUsers
    )
};