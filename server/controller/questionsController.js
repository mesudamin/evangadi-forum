const db = require('../db/dbConfig');
const crypto = require('crypto');



async function get_question(req, res) {
    try {
        const [questions] = await db.query(
            `SELECT questions.*, users.username FROM questions LEFT JOIN users ON questions.userid = users.userid ORDER BY questions.id DESC`
        );

        if (questions.length === 0) {
            return res.status(200).json({
                message: "No questions found",
                data: []
            });
        }

        return res.status(200).json({
            message: "Questions fetched successfully",
            data: questions
        });





    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}

async function get_question_with_id(req, res) {
    const questionid = req.params.questionid


    // Validation check
    if (!questionid || !questionid.trim()) {
        return res.status(400).json({ message: "Invalid or missing question ID" });
    }

    try {
        const [question] = await db.query(
            `SELECT questions.*, users.username FROM questions LEFT JOIN users ON questions.userid = users.userid WHERE questions.questionid = ?`,
            [questionid]
        );

        if (question.length === 0) {
            return res.status(404).json({
                message: "No question found"
            })
        }

        return res.status(200).json({
            message: "Question fetched successfully",
            data: question
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }
}


async function post_question(req, res) {

    const { title, description } = req.body;
    const userid = req.user.userid;

    if (!title || !description) {
        return res.status(400).json({
            message: "Please provide title and description"
        })
    }


    try {
        const questionid = crypto.randomUUID();
        const [question] = await db.query(
            `INSERT INTO questions (questionid, userid, title, description) VALUES (?, ?, ?, ?)`,
            [questionid, userid, title, description]
        );

        return res.status(201).json({
            message: "Question posted successfully",
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message
        })

    }


}


module.exports = { get_question, post_question, get_question_with_id }