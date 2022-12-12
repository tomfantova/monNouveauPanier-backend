const mongoose = require('mongoose')

const labelsSchema = mongoose.Schema({
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

const Label = mongoose.model('labels', labelsSchema)

module.exports = Label