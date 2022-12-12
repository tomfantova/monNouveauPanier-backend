const mongoose = require('mongoose')

const generalitiesSchema = mongoose.Schema({
    title: String,
    date: Date,
    images: {},
    resume: {
        subtitles: [String],
        paragraphs: [String],
    },
    main: {
        subtitles: [String],
        paragraphs: [String],
    }
})

const Generality = mongoose.model('generalities', generalitiesSchema)

module.exports = Generality