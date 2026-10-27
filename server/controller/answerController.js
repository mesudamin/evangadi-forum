const db = require("../db/dbConfig");





async function get_answer(req, res) {
    const questionid = req.params.question_id || req.params.questionid;

    // Validation check
    if (!questionid || !questionid.trim()) {
        return res.status(400).json({ message: "Invalid or missing question ID" });
    }



    try {
        const [answer] = await db.query(
            "SELECT answers.*, users.username FROM answers LEFT JOIN users ON answers.userid = users.userid WHERE answers.questionid = ? ORDER BY answers.answerid DESC",
            [questionid]
        );
        if (answer.length === 0) {
            return res.status(200).json({ answers: [] });
        }

        return res.status(200).json({ answers: answer });



    } catch (error) {
        return res.status(500).json({ message: error.message })
    }


}


async function post_answer(req, res) {
    const { questionid, answer } = req.body
    const userid = req.user.userid;



    if (!questionid || !answer) {
        return res.status(400).json({ message: "All required fields are missing" });
    }

    try {
        const [newanswer] = await db.query("INSERT INTO answers (questionid,answer,userid) VALUES (?,?,?)", [questionid, answer, userid])

        return res.status(200).json({ message: "Answer posted successfully", newanswer })



    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

}





module.exports = { get_answer, post_answer }