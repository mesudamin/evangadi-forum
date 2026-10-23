const jwt = require("jsonwebtoken");




async function authmiddleware(req, res, next) {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        return res.status(401).json({ message: "Unauthorized0" })
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Unauthorized1" })
    }
    try {
        const { username, userid } = jwt.verify(token, process.env.jwt_secret);
        req.user = { username, userid }
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({
            message: "Unauthorized4"
        })
    }
}


module.exports = authmiddleware;