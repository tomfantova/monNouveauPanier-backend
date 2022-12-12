const express = require('express')
const router = express.Router()

const Interview = require('../models/interviews')
const Generality = require('../models/generalities')
const Product = require('../models/products')
const Label = require('../models/labels')



// GET Entretiens

router.get('/interviews/all', async (req, res) => {
    const allInterviewsData = await Interview.find({})
    res.json({ result: true, allInterviews: allInterviewsData })
})



// GET Guides généraux

router.get('/generalities/all', async (req, res) => {
    const allGeneralitiesData = await Generality.find({})
    res.json({ result: true, allGeneralities: allGeneralitiesData })
})



// GET Fiches produits

router.get('/products/all', async (req, res) => {
    const allProductsData = await Product.find({})
    res.json({ result: true, allProducts: allProductsData })
})



// GET Labels & co

router.get('/labels/all', async (req, res) => {
    const allLabelsData = await Label.find({})
    res.json({ result: true, allLabels: allLabelsData })
})



// Fonction pour créer un nouveau guide (sans thunder client)

const createNewGuide = async (category, content) => {

    // 1. Vérifie la validité de "category"

    let newGuideConstructor = ''

    switch (category) {
        case 'interviews':
            newGuideConstructor = newGuideContent => new Interview(newGuideContent)
            break
        case 'generalities':
            newGuideConstructor = newGuideContent => new Generality(newGuideContent)
            break
        case 'products':
            newGuideConstructor = newGuideContent => new Product(newGuideContent)
            break
        case 'labels':
            newGuideConstructor = newGuideContent => new Label(newGuideContent)
            break
    }

    if (newGuideConstructor === '') {
        console.log('Error: your category is invalid')
        return
    }

    // 2. Vérifie la validité de "content"

    if (
        typeof content.title !== "string"
        || !(typeof content.images === "object" && !Array.isArray(content.images) && Object.values(content.images).every(e => typeof e === "string"))
        || !(Array.isArray(content.resume.subtitles) && content.resume.subtitles.every(e => typeof e === "string"))
        || !(Array.isArray(content.resume.paragraphs) && content.resume.paragraphs.every(e => typeof e === "string") && content.resume.subtitles.length === content.resume.paragraphs.length)
        || !(Array.isArray(content.main.subtitles) && content.main.subtitles.every(e => typeof e === "string"))
        || !(Array.isArray(content.main.paragraphs) && content.main.paragraphs.every(e => typeof e === "string") && content.main.subtitles.length === content.main.paragraphs.length)
    ) {
        console.log('Error : your content is invalid')
        return
    }

    // 3. Création du nouveau guide

    const newGuide = newGuideConstructor({
        title: content.title,
        images: content.images,
        resume: {
            subtitles: content.resume.subtitles,
            paragraphs: content.resume.paragraphs,
        },
        main: {
            subtitles: content.main.subtitles,
            paragraphs: content.main.paragraphs,
        }
    })

    const savedGuide = await newGuide.save()
    const response = { result: true, category: category, newGuide: savedGuide }
    console.log(response)
    return response

}



// Création d'un nouveau guide (manuel, pas de Thunder Client) :

// 1. Arrêtez votre serveur (ctrl + C)
// 2. Paramétrez les deux variables ci-dessous ("newGuideCategory" et "newGuideContent")
// 3. Dé-commentez l'appel de fonction ci-dessous ("createNewGuide(newGuideCategory, newGuideContent)")
// 4. Démarrez le serveur 1 fois (ça y est, le guide est créé!)
// 5. Re-commentez l'appel de fonction dans la foulée pour éviter de créer des doublons par inadvertance

const newGuideCategory = 'generalities'

const newGuideContent = {
    title: 'Titre',
    images: {
        main: 'url'
    },
    resume: {
        subtitles: ['Sous-titre 1', 'Sous-titre 2'],
        paragraphs: ['Paragraphe 1', 'Paragraphe 2'],
    },
    main: {
        subtitles: ['Sous-titre 1', 'Sous-titre 2'],
        paragraphs: ['Paragraphe 1', 'Paragraphe 2'],
    }
}

// createNewGuide(newGuideCategory, newGuideContent)



module.exports = router
