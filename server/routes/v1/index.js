const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
router.use("/users", usersRoute);

router.get("*", (req, res) => {
    res.send({ message: "Welcome to the CLEM backend API!", version: "1.0.0" });
})

module.exports = router;