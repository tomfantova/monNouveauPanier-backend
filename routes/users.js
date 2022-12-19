const express = require('express')
const router = express.Router()

const User = require('../models/users')

const { formatName } = require('../modules/formatName')



// GET Tous les utilisateurs

router.get('/all', async (req, res) => {
  const allUsersData = await User.find({})
  res.json({ result: true, allUsers: allUsersData })
})


// POST Nouvel utilisateur

router.post('/new', async (req, res) => {

  // Créer ici le check du formulaire et des utilisateurs déjà existants

  const newUser = new User({
    firstname: formatName(req.body.firstname),
    lastname: formatName(req.body.lastname),
    email: req.body.email.toLowerCase(),
    password: req.body.password, // Changer cette ligne : utiliser bcrypt
    token: 'À DÉFINIR', // Changer cette ligne : utiliser uid2
    preferences: {
      type: req.body.preferences.type, // Je rajouterai les autres préférences, pour l'instant on laisse seulement "type"
    },
    bookmarks: [],
    lists: [],
  })

  const savedUserData = await newUser.save()
  res.json({ result: true, newUser: savedUserData })

})


// DELETE Tous les utilisateurs

router.delete('/reset', async (req, res) => {
  const deleteReportData = await User.deleteMany({})
  res.json({ result: true, deleteReport: deleteReportData })
})



module.exports = router
