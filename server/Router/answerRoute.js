const express = require('express');
const Router = express.Router();
const { get_answer, post_answer } = require('../controller/answerController')




Router.get("/:question_id", get_answer)

Router.post("/", post_answer)


module.exports = Router;