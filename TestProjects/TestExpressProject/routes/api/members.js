import members from "../../public/Members.js";
import { Router } from "express";
import { v4 } from "uuid";

const router = new Router();

router.get("/", (req, res) => {
    res.json(members);
});
router.get("/:id", (req, res) => {
    const found = members.some(
        (member) => member.id === parseInt(req.params.id)
    );
    if (found) {
        res.json(
            members.filter((member) => member.id === parseInt(req.params.id))
        );
    } else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` });
    }
});
router.post("/", (req, res) => {
    const newMember = {
        id: v4(),
        name: req.body.name,
        email: req.body.email,
        status: "active",
    };

    if (!newMember.name || !newMember.email)
        return res.status(400).send({ msg: "Please enter name and email." });

    members.push(newMember);
    res.redirect("/");
});
router.put("/:id", (req, res) => {
    const member = members.find(
        (member) => member.id === parseInt(req.params.id)
    );
    const updateMember = req.body;
    if (member) {
        member.name = updateMember.name ? updateMember.name : member.name;
        member.email = updateMember.email ? updateMember.email : member.email;
        res.json(members);
    } else {
        res.status(400).json({ msg: `No member with id of ${req.params.id}` });
    }
});
router.delete("/:id", (req, res) => {
    const reqMember = members.find(
        (member) => member.id === parseInt(req.params.id)
    );
    if (reqMember) {
        res.json(members.filter((member) => member != reqMember));
    } else {
        res.json({ msg: `No member with id of ${req.params.id}` });
    }
});
export default router;
