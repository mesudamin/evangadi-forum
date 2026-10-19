const express = require('express');
const app = express();

app.use(express.json());


app.post("/api/users/register", (req, res) => {
    res.send("register user");
});


app.post("/api/users/login", (req, res) => {
    res.send("login user");
});

app.get("/api/users/check", (req, res) => {
    res.send("check user");

});















app.listen(3000, () => {
    console.log('Server is running on port 3000');
});