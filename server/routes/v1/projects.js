const express = require("express");
const Project = require("../../models/Project");
const router = express.Router();
const { isAuthed, isAdmin } = require("../../middleware/auth");

// Queries: customerId, start, end
router.get("/", isAuthed, async (req, res) => {
    try {
        if (req.query.customerId) {
            const custProjects = await Project.findByCustomerId(req.query.customerId);
            res.send(custProjects);
        } else {
            if (req.query.start || req.query.end) {
                const projects = await Project.get(req.query.start, req.query.end);
                res.send(projects);
            } else {
                const allProjects = await Project.get();
                res.send(allProjects);
            }
        }
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:id", isAuthed, async (req, res) => {
    try {
        const idProject = await Project.findById(req.params.id);
        res.send(idProject);
    } catch (err) {
        res.send({ error: err });
    }
})

// Queries: userId
router.get("/:id/hours", isAuthed, async (req, res) => {
    try {
        if (req.query.userId) {
            const userHours = await Project.getHoursByUser(req.params.id, req.query.userId);
        } else {
            const allHours = await Project.getAllHours(req.params.id);
            res.send(allHours);
        }
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:id/hours/total", isAuthed, async (req, res) => {
    try {
        const totalHours = await Project.getTotalHours(req.params.id);
        res.send(totalHours);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:id/hours/dist", isAuthed, async (req, res) => {
    try {
        const distHours = await Project.getDistHours(req.params.id);
        res.send(distHours);
    } catch (err) {
        res.send({ error: err });
    }
})

router.post("/", isAuthed, async (req, res) => {

})

router.delete("/", isAuthed, isAdmin, async (req, res) => {

})

module.exports = router;