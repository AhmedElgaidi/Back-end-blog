// ODM library
// Object data modelling for mongodb and node.js
// It manages the relation between mongodb driver and node.js (In between)
const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator'); // to add slug feature to the URl
// A library that sanitizes our html, we can give it a dirty html and it will return 
// very clean,So it prevent XSS attacks and it's really fast and it depends on JSDOM library
const createDomPurify = require('dompurify');
const { JSDOM } = require('jsdom');
const dompurify = createDomPurify(new JSDOM().window)

// ===========================
// Initialize slug and my options
let options = {
    separator: "-",
    lang: "en",
    truncate: 120
}
mongoose.plugin(slug, options);

// Define Schema
const Schema = mongoose.Schema;

// Let's structure my article schema (the shape)
const articleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    markdown: {
        type: String
    },
    slug: {
        type: String,
        slug: 'title', 
        unique: true
    },
    sanitizedHtml: {
        type: String
    }
}, { timestamps: true })// to add the live time for making or updating the document(blog).

articleSchema.pre('validate', function(next) {// this hooks (happens) to the document
    // when action happens (insert, update, delete, so on...)
    if (this.markdown) {
        this.sanitizedHtml = dompurify.sanitize( this.markdown );
    }
    next();
})
// create my model
// It's a constructor that takes the schema and create an instance of the article schema
const Article = mongoose.model('Article', articleSchema);

// Exports my model to use it anywhere
module.exports = Article;