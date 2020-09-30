// Impot our article model
const Article = require('../models/articleModel');

// Naming convention by MDN
// (1)article_index
// (2) article_details
// (3) article_create_get
// (4) article_create_post
// (5) article_edit_get
// (6) article_edit_put
// (7) article_delete

// (1)
const article_index = (req, res) => {
    Article.find().sort({ createdAt: -1 })// Sort them descendingly
    .then(result => {
        res.render('articles/index', { title: 'Home page',  articles: result });
    })
    .catch(err => console.log(err));
};
// (2)
const article_details = (req, res) => {
    const slug = req.params.slug
    Article.findOne({ slug: slug })
        .then(result => {
            if(result === null) res.redirect('/articles')
            res.render('articles/details', { title: 'Details', article: result })
        })
        .catch(err => console.log(err));
};

// (3)
const article_create_get = (req, res) => {
    res.render('articles/create', { title: 'New Article' })
};

// (4)
const article_create_post = (req, res) => {
    // Create an instance (Article)
    const article = new Article(req.body);
    article.save()
        .then(result => res.redirect(`/articles/${article.slug}`))
        .catch(err => console.log(err));
};

// (5)
const article_edit_get = (req, res) => {
    Article.findById(req.params.id)
    .then(result => {
        res.render('articles/edit', { title: 'Edit', article: result });
    })
    .catch(err => console.log(err));
};

// (6) 
const article_edit_put = (req, res) => {
    let id = req.params.id;
    Article.findByIdAndDelete(id)
    .then(result => {
        const article = new Article(req.body)
        article.save()
            .then(result => {
                if(result === null) res.redirect('/articles');
                res.render('articles/details', { title: 'Details', article: result })
            })
            .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
}

// (7)
const article_delete = (req, res) => {
    const id = req.params.id;
    Article.findByIdAndDelete(id)
        .then(result => res.redirect('/articles'))
        .catch(err => console.log(err));
};


module.exports = {
    article_index,
    article_details,
    article_create_get,
    article_create_post,
    article_edit_get,
    article_edit_put,
    article_delete
};