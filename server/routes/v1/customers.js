const express = require("express");
const { isAuthed, isAdmin } = require("../../middleware/auth");
const Customer = require("../../models/Customer");
const router = express.Router();

router.get("/", isAuthed, async (req, res) => {
    try {
        const allCustomers = await Customer.getAll();
        res.send(allCustomers);
    } catch (err) {
        res.send({ error: err });
    }
})

router.get("/:id", isAuthed, async (req, res) => {
    try {
        const idCustomer = await Customer.findById(req.params.id);
        res.send(idCustomer);
    } catch (err) {
        res.send({ error: err });
    }
})

router.post("/", isAuthed, async (req, res) => {
    if (!req.body.first_name || !req.body.last_name) return res.send({ error: "Invalid body parameters!" });

    try {
        const newCustomer = await Customer.createNew(req.body);
        res.send({ message: "Successfully created new customer!" });
    } catch (err) {
        res.send({ error: err });
    }
})

router.put("/", isAuthed, async (req, res) => {
    if (!req.body.id) return res.send({ error: "No ID specified for update!" });

    try {
        const updCustomer = await Customer.update(req.body);
        res.send({ message: `Successfully updated user: ${req.body.id}` });
    } catch (err) {
        res.send({ error: err });
    }
})

router.delete("/", isAuthed, isAdmin, async (req, res) => {
    if (!req.body.id) return res.send({ error: "No ID specified for deletion!" });

    try {
        const delCustomer = await Customer.remove(req.body.id);
        res.send({ message: `Successfully deleted user: ${req.body.id}` });
    } catch (err) {
        res.send({ error: err });
    }
})

module.exports = router;