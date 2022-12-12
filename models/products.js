const mongoose = require('mongoose')

const productsSchema = mongoose.Schema({
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

const Product = mongoose.model('products', productsSchema)

module.exports = Product