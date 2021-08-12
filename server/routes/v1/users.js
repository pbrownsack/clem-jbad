const express = require("express");
const passport = require("passport");
const User = require("../../models/User");
const router = express.Router();
const { isAuthed, isAdmin } = require("../../middleware/auth");

router.get("/", isAuthed, isAdmin, async (req, res) => {
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

router.get("/id/:id", isAuthed, isAdmin, async (req, res) => {
    try {
        const idUser = await User.findById(req.params.id);
        res.send(idUser);
    } catch (err) {
        res.send({ error: err });
    }
})

router.put("/", isAuthed, isAdmin, async (req, res) => {
    try {
        const updUser = await User.update(req.body);
        res.send({ message: `Successfully edited user with ID: ${req.body.id}` });
    } catch (err) {
        res.send({ error: err });
    }
})

router.post("/login", passport.authenticate("local", { failureRedirect: "/v1/users/login/error" }), (req, res) => {
    res.send({ message: "Successfully logged in!", redirect: "/hours", user: req.user });
})

router.get("/login/error", (req, res) => {
    res.send({ error: "Failed to login! Please try another username/password combination." });
})

router.get("/logout", (req, res) => {
    req.logout();
    res.send({ message: "Successfully logged out!", redirect: "/" });
})

router.post("/password/change", isAuthed, async (req, res) => {
    try {
        const results = await User.changePassword(req.body.id, req.body.new_password);
        res.send({ message: "Password changed successfully!" });
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:userId", isAuthed, isAdmin, async (req, res) => {
    try {
        const idUser = await User.find(req.params.userId);
        res.send(idUser);
    } catch (err) {
        res.send({ error: err });
    }
})

module.exports = router;