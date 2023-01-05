const express = require("express");
const router = express.Router();

const User = require("../models/users");

const { formatName } = require("../modules/formatName");
const { checkBody } = require("../modules/checkBody");

const uid2 = require("uid2");
const bcrypt = require("bcrypt");

// GET Tous les utilisateurs

router.get("/all", async (req, res) => {
  const allUsersData = await User.find({});
  res.json({ result: true, allUsers: allUsersData });
});

// POST Nouvel utilisateur

router.post("/new", async (req, res) => {
  // Créer ici le check du formulaire et des utilisateurs déjà existants
  if (!checkBody(req.body, ["firstname", "lastname", "email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }
  console.log(req.body);
  User.findOne({ email: { $regex: new RegExp(req.body.email, "i") } }).then(
    (emailData) => {
      if (emailData === null) {
        const hash = bcrypt.hashSync(req.body.password, 10);

        const newUser = new User({
          firstname: formatName(req.body.firstname),
          lastname: formatName(req.body.lastname),
          email: req.body.email.toLowerCase(),
          date: new Date(),
          password: hash,
          token: uid2(32),
          preferences: {
            type: req.body.preferences.type,
            dietetique: req.body.preferences.dietetique,
            bilan: req.body.preferences.bilan,
            ethique: req.body.preferences.ethique,
            local: req.body.preferences.local,
            agriculture: req.body.preferences.agriculture,
          },
          bookmarks: [],
          lists: [],
        });
        console.log("entered");
        newUser.save().then((savedUserData) => {
          res.json({ result: true, newUser: savedUserData });
        });
      } else {
        // Utilisateur déjà existant
        res.json({ result: false, error: "User already exist" });
      }
    }
  );
});

// POST SE CONNECTER

router.post("/signin", (req, res) => {
  if (!checkBody(req.body, ["email", "password"])) {
    res.json({ result: false, error: "Missing or empty fields" });
    return;
  }

  User.findOne({ email: req.body.email }).then((data) => {
    if (data && bcrypt.compareSync(req.body.password, data.password)) {
      res.json({ result: true, user: data });
    } else {
      res.json({ result: false, error: "User not found or wrong password" });
    }
  });
});

// DELETE Tous les utilisateurs

router.delete("/reset", async (req, res) => {
  const deleteReportData = await User.deleteMany({});
  res.json({ result: true, deleteReport: deleteReportData });
});

module.exports = router;
