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

router.get("/", (req, res) => res.send({ version: "1.0.0" }));

router.get("*", (req, res) => {
    res.send({ error: "Please specify a valid endpoint!" });
})

module.exports = router;