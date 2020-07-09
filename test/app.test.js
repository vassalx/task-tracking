const app = require("../app");
const chai = require("chai");
const chaiHttp = require("chai-http");
const { MAX_USERS } = require("../app/config/user.config");
const { TASK_STATUSES } = require("../app/config/task.config");

const { expect } = chai;
chai.use(chaiHttp);

const randomStr = (length = 6) => Math.random().toString(20).substr(2, length)


describe("Task-tracker tests", () => {
    const randName = randomStr();
    const randTask = randomStr();
    const randEmail = randName + "@gmail.com";
    let user = {};

    describe("Authentication", () => {

        it("should sign up", done => {
            chai
                .request(app)
                .post("/api/auth/signup")
                .send({
                    first_name: randName,
                    last_name: randName,
                    email: randEmail,
                    password: "123456"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                });
        });

        it("should sign in", done => {
            chai
                .request(app)
                .post("/api/auth/signin")
                .send({
                    email: randName + "@gmail.com",
                    password: "123456"
                })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.user_id).to.be.a('number');
                    expect(res.body.accessToken).to.be.a('string');
                    expect(res.body.first_name).to.equals(randName);
                    expect(res.body.last_name).to.equals(randName);
                    expect(res.body.email).to.equals(randEmail);
                    user = res.body;
                    done();
                });
        });

        it("should not sign in (incorrect password)", done => {
            chai
                .request(app)
                .post("/api/auth/signin")
                .send({
                    email: randName + "@gmail.com",
                    password: "1234567"
                })
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.accessToken).to.be.null;
                    expect(res.body.message).to.equals("Invalid Password!");
                    done();
                });
        });
    })

    describe("User functions", () => {
        it("should get user by id", done => {
            chai
                .request(app)
                .get("/api/user")
                .set("x-access-token", user.accessToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body.user_id).to.equals(user.user_id);
                    expect(res.body.password).to.be.undefined;
                    done();
                });
        });

        it("should not get user (incorrect accessToken)", done => {
            chai
                .request(app)
                .get("/api/user")
                .set("x-access-token", "bruh")
                .end((err, res) => {
                    expect(res).to.have.status(401);
                    expect(res.body.message).to.equals("Unauthorized!");
                    done();
                });
        });

        it("should get users with pagination", done => {
            chai
                .request(app)
                .get("/api/users/")
                .query({ page: 1 })
                .set("x-access-token", user.accessToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body).to.have.lengthOf.at.most(MAX_USERS)
                })
            chai
                .request(app)
                .get("/api/users/")
                .query({ page: 2 })
                .set("x-access-token", user.accessToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.a("array");
                    expect(res.body).to.have.lengthOf.at.most(MAX_USERS)
                    done();
                });
        });

        it("should update user", done => {
            chai
                .request(app)
                .put("/api/user")
                .send({
                    first_name: randomStr(),
                    last_name: randomStr()
                })
                .set("x-access-token", user.accessToken)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    done();
                })
        });
    })

    describe("Task functions", () => {
        it("should create task", done => {
            chai
            .request(app)
            .post("/api/task")
            .set("x-access-token", user.accessToken)
            .send({
                title: randTask,
                description: randTask,
                status: TASK_STATUSES[0]
            })
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
        });
    })

});