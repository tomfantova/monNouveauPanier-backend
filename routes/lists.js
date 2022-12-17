const express = require("express");
const router = express.Router();

const User = require("../models/users");

// PUT Nouvelle liste //

router.put("/add", async (req, res) => {
  const user = await User.findOne({ token: req.body.token });
  user.lists.push(req.body.list);
  user.save().then(() => {
    res.json({ result: true });
  });
});

// PUT Archiver une liste //

router.put("/archive", async (req, res) => {
  await User.updateOne(
    { "lists.id": req.body.listId },
    {
      $set: {
        "lists.$.active": false,
        "lists.$.date": req.body.date,
      },
    }
  );
  res.json({ result: true });
});

// PUT Réactiver une liste //

router.put("/restart", async (req, res) => {
  await User.updateOne(
    { "lists.id": req.body.listId },
    {
      $set: {
        "lists.$.active": true,
        "lists.$.date": req.body.date,
      },
    }
  );
  res.json({ result: true });
});

// DELETE Supprimer une liste //

router.put("/delete", async (req, res) => {
  await User.updateOne(
    { token: req.body.token },
    {
      $pull: { lists: { id: req.body.listId } },
    }
  );
  res.json({ result: true });
});

module.exports = router;
