const mongoose = require('mongoose')

const interviewsSchema = mongoose.Schema({
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

const Interview = mongoose.model('interviews', interviewsSchema)

module.exports = Interview