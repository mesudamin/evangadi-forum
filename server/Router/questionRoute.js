const express = require('express');
const Router = express.Router();


Router.get("/all-questions", (req, res) => {
    res.send("allquestions");
});

module.exports = Router;