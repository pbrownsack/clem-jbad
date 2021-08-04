const express = require("express");
const User = require("../../models/User");
const router = express.Router();

// TODO: Add route authentication

router.get("/", async (req, res) => {
    try {
        const users = await User.getAll();
        res.send(users);
    } catch (err) {
        res.send({ error: err });
    }
})

router.post("/", async (req, res) => {
    try {
        const newUser = await User.createNew(req.body);
        res.send({ message: "Successfully created new user!" });
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const idUser = await User.find(req.params.userId);
        res.send(idUser);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/id/:id", async (req, res) => {
    try {
        const idUser = await User.findById(req.params.id);
        res.send(idUser);
    } catch (err) {
        res.send({ error: err });
    }
})

router.post("/password/change", async (req, res) => {
    try {
        const results = await User.changePassword(req.body.id, req.body.new_password);
        res.send({ message: "Password changed successfully!" });
    } catch (err) {
        res.send({ error: err });
    }
})

module.exports = router;