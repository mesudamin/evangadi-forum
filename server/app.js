const express = require('express');
const app = express();
const userRoute = require('./Router/userRoute');
const questionRoute = require('./Router/questionRoute');
const answerRoute = require('./Router/answerRoute');
const authmiddleware = require('./authMiddleware/authmiddleware');
const db = require('./db/dbConfig');
const cors = require('cors');
app.use(cors())


app.use(express.json());




app.use("/api/users", userRoute)

app.use("/api/questions", authmiddleware, questionRoute)

app.use("/api/answers", authmiddleware, answerRoute)











app.listen(3000, () => {
    console.log('Server is running on port 3000');
});