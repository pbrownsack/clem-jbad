const express = require("express");
const Hours = require("../../models/Hours");
const router = express.Router();
const { isAuthed, isAdmin } = require("../../middleware/auth");

router.get("/", isAuthed, isAdmin, async (req, res) => {
    try {
        const allHours = await Hours.getAll();
        res.send(allHours);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/user/:id/total", isAuthed, async (req, res) => {
    try {
        const userTotal = await Hours.getUserTotal(req.params.id);
        res.send(userTotal);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/user/:id", isAuthed, async (req, res) => {
    try {
        const userHours = await Hours.getAll(req.params.id);
        res.send(userHours);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/project/:id", isAuthed, async (req, res) => {
    try {
        const projectHours = await Hours.getByProject(req.params.id);
        res.send(projectHours);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/date", isAuthed, async (req, res) => {
    if (!req.query.start) return res.send({ error: "Invalid 'start' query parameter" });

    try {
        if (req.query.start && req.query.end) {
            const withinHours = await Hours.getWithinDate(new Date(req.query.start), new Date(req.query.end), req.query.userId || undefined);
            res.send(withinHours);
        } else {
            const afterHours = await Hours.getAfterDate(new Date(req.query.start), req.query.userId || undefined);
            res.send(afterHours);
        }
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:id", isAuthed, async (req, res) => {
    try {
        const idHours = await Hours.findById(req.params.id);
        res.send(idHours);
    } catch (err) {
        res.send({ error: err });
    }
})

router.put("/", isAuthed, async (req, res) => {
    if (!(req.body.time_in || req.body.time_out) || !req.body.id) return res.send({ error: "Incorrect body parameters!" });

    if (req.body.time_in)
        req.body.time_in = new Date(req.body.time_in);
    
    if (req.body.time_out)
        req.body.time_out = new Date(req.body.time_out);

    try {
        await Hours.adjust(req.body);
        res.send({ message: `Successfully adjusted hour with id: ${req.body.id}` });
    } catch (err) {
        res.send({ error: err });
    }
})

router.delete("/", isAuthed, async (req, res) => {
    if (!req.body.id) return res.send({ error: "You must specify an ID to delete!" });

    try {
        await Hours.remove(req.body.id);
        res.send({ message: `Successfully deleted hour with id: ${req.body.id}` });
    } catch (err) {
        res.send({ error: err });
    }
})

router.post("/", isAuthed, async (req, res) => {
    if (!req.body.user_id || !req.body.time_in) return res.send({ error: "Missing 'user_id', 'time_in' body parameters!" });

    req.body.time_in = new Date(req.body.time_in);

    if (req.body.time_out)
        req.body.time_out = new Date(req.body.time_out);

    try {
        await Hours.createNew(req.body);
        res.send({ message: `Successfully created new hour for user with id: ${req.body.user_id}` });
    } catch (err) {
        res.send({ error: err });
    }
})

// TESTING ONLY
router.get("/time/now", isAuthed, isAdmin, (req, res) => {
    res.send(new Date().toISOString());
})

module.exports = router;