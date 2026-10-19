const express = require('express');
const Router = express.Router();





Router.post("/api/users/register", (req, res) => {
    res.send("register user");
});


Router.post("/api/users/login", (req, res) => {
    res.send("login user");
});

Router.get("/api/users/check", (req, res) => {
    res.send("check user");

});

module.exports = Router;