const express = require("express");
const router = express.Router();

const User = require("../models/users");

// GET Toutes les listes //

// router.get("/:token", (req, res) => {
//   User.find({ token: req.params.token }).then((userData) => {
//     if (userData) {
//       res.json({ result: true, lists: userData[0].lists });
//     } else {
//       res.json({ result: false, error: "User not found" });
//     }
//   });
// });

// POST Nouvelle liste //

router.put("/add", async (req, res) => {
  const user = await User.findOne({ token: req.body.token });
  user.lists.push(req.body.list);
  user.save().then(() => {
    res.json({ result: true });
  });
});

// DELETE Une liste //

// router.delete("/reset", async (req, res) => {
//   const deleteReportData = await User.deleteMany({});
//   res.json({ result: true, deleteReport: deleteReportData });
// });

module.exports = router;
