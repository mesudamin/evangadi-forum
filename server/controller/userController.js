const db = require('../db/dbConfig');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');




async function register(req, res) {

    const { username, firstName, lastName, email, password } = req.body

    if (!username || !firstName || !lastName || !email || !password.trim()) {
        return res.status(400).json({
            error: "Please fill all the fields"
        })
    }

    if (password.length <= 8) {
        return res.status(400).json({
            error: "Password must be at least 8 characters long"
        })
    }
    try {
        const [user] = await db.query(" SELECT username,userid from users where username = ? or email =? ", [username, email])

        if (user.length > 0) {
            return res.status(400).json({
                error: "User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt);
        const result = await db.query("INSERT INTO users (username,firstName,lastName,email,password) VALUES (?,?,?,?,?)", [username, firstName, lastName, email, hashedPassword])
        return res.status(200).json({
            message: "User registered successfully",
            result
        })


    } catch (error) {
        return res.status(500).json({
            error: error.message
        })
    }

}

async function login(req, res) {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({
            error: "Please fill all the fields"
        })
    }
    try {
        const [user] = await db.query(" SELECT username,userid,password from users where email = ? ", [email])
        if (user.length === 0) {
            return res.status(400).json({
                error: "User not found"
            })

        }


        const correctPassword = await bcrypt.compare(password, user[0].password);

        if (!correctPassword) {
            return res.status(400).json({
                error: "Incorrect password"
            })
        }

        const token = await jwt.sign({ userid: user[0].userid, username: user[0].username }, process.env.jwt_secret, { expiresIn: "30d" });



        return res.status(200).json({
            message: "User logged in successfully", token
        })


    } catch (error) {
        return res.status(500).json({
            error: "Internal Server Error",
            message: error.message
        })
    }

}

async function check(req, res) {
    // const username = req.user.username;
    // const userid = req.user.userid;

    res.status(200).json({
        message: "Authorized",
        // username,
        // userid
    })
}

module.exports = {
    register,
    login,
    check
}