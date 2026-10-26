const express = require('express');
const Router = express.Router();
const { get_question, post_question, get_question_with_id } = require('../controller/questionsController')




Router.get("/", get_question);
Router.get("/:questionid", get_question_with_id);

Router.post("/", post_question);

module.exports = Router;