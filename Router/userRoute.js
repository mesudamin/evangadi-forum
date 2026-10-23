const express = require('express');
const Router = express.Router();
const { register, login, check } = require('../controller/userController')
const authmiddleware = require('../authMiddleware/authmiddleware')

// user register
Router.post("/register", register);

// user login
Router.post("/login", login);

// user check
Router.get("/check", check);

module.exports = Router;