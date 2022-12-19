const express = require('express')
const router = express.Router()

const Guide = require('../models/guides')



// GET Guides généraux

router.get('/generalities', async (req, res) => {
    const allGeneralitiesData = await Guide.find({ category: 'generalities' })
    res.json({ result: true, allGeneralities: allGeneralitiesData })
})



// GET Fiches produits

router.get('/products', async (req, res) => {
    const allProductsData = await Guide.find({ category: 'products' })
    res.json({ result: true, allProducts: allProductsData })
})



// GET Labels & co

router.get('/labels', async (req, res) => {
    const allLabelsData = await Guide.find({ category: 'labels' })
    res.json({ result: true, allLabels: allLabelsData })
})



// GET Entretiens

router.get('/interviews', async (req, res) => {
    const allInterviewsData = await Guide.find({ category: 'interviews' })
    res.json({ result: true, allInterviews: allInterviewsData })
})



// Fonction pour créer un nouveau guide (sans thunder client)

const createNewGuide = async (content) => {

    // 1. Vérifie la validité de "category"

    const validCategories = ['generalities', 'products', 'labels', 'interviews']

    if (!validCategories.includes(content.category)) {
        console.log('Error: your category is invalid')
        return
    }

    // 2. Vérifie la validité du contenu

    if (
        typeof content.title !== "string"
        || !(content.date instanceof Date && !isNaN(content.date))
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

    const newGuide = new Guide({
        title: content.title,
        date: content.date,
        category: content.category,
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
// 2. Paramétrez la variable ci-dessous ("newGuideContent")
// 3. Dé-commentez l'appel de fonction plus bas ("createNewGuide(newGuideContent)")
// 4. Démarrez le serveur 1 fois (ça y est, le guide est créé!)
// 5. Re-commentez l'appel de fonction plus bas dans la foulée pour éviter de créer des doublons par inadvertance

const newGuideContent = {
    title: 'Titre',
    date: new Date(),
    category: 'products',
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

// createNewGuide(newGuideContent)



module.exports = router
