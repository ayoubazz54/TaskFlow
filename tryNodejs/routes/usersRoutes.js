const express = require("express");
const router = express.Router();
const { getMe } = require("../controllers/usersController");
const authMiddleware = require("../middlewares/authMiddleware");

router.get("/users/me", authMiddleware, getMe);

module.exports = router;