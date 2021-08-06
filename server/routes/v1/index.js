const express = require("express");
const router = express.Router();

const usersRoute = require("./users");
const hoursRoute = require("./hours");
const custRoute = require("./customers");
const projectsRoute = require("./projects");

router.use("/users", usersRoute);
router.use("/hours", hoursRoute);
router.use("/customers", custRoute);
router.use("/projects", projectsRoute);

router.get("*", (req, res) => {
    res.send({ message: "Welcome to the CLEM back-end interface!", version: "1.0.0" });
})

module.exports = router;