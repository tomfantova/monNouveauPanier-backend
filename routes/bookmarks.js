const express = require("express");
const router = express.Router();

const User = require("../models/users");

// PUT Nouveau favori //

router.put("/add", async (req, res) => {
  const user = await User.findOne({ token: req.body.token });
  user.bookmarks.push(req.body.id);
  user.save().then(() => {
    res.json({ result: true });
  });
});

// PUT Supprimer un favori //

router.put("/delete", async (req, res) => {
  await User.updateOne(
    { token: req.body.token },
    {
      $pull: { bookmarks: req.body.id },
    }
  );
  res.json({ result: true });
});

module.exports = router;

module.exports = router;
