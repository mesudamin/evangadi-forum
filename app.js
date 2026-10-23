const express = require('express');
const app = express();
const userRoute = require('./Router/userRoute');
const questionRoute = require('./Router/questionRoute');
const authmiddleware = require('./authMiddleware/authmiddleware');
const db = require('./db/dbConfig');




app.use(express.json());




app.use("/api/users", userRoute)

app.use("/api/questions", authmiddleware, questionRoute)













app.listen(3000, () => {
    console.log('Server is running on port 3000');
});