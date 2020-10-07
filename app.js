// Core modules

// 3rd party modules
const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// Custom modules
const articlesRoutes = require('./routes/articlesRoutes');// my routes

// =======================================
// Create my express app instance
const app = express()

//========================================
// Connect to my database
const URI = 'mongodb+srv://elbotanist:elbotanist@cluster0.iujbk.mongodb.net/nodeDatabase?retryWrites=true&w=majority';
mongoose.connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
})// This is an async func. that returns a promise
.then(result => {
    app.listen(8000)
    console.log('Server is running on port 8000...');
})
.catch( err => console.log(err) );

// ========================================
// My middlewares

// (1) Resgister my view engine (ejs)
app.set('view engine', 'ejs');

// (2)It takes the URL enconded data and passes it to an object (body),
// So, we can use it from req.body object.
app.use( express.urlencoded({ extended: true }) ); 

// (3) Sometimes, when we need to override the client method (get,post)
// to send a delete or put method to my server, we need to use an external library to do it
app.use(methodOverride( '_method' ));

//====================================================
// (4) My routes

app.get('/', (req, res) => { // A middleware always run for every request
    res.redirect('/articles');
}); 

app.use('/articles', articlesRoutes);// Article routes

app.use('/about', (req, res) => { // handelling about page
    res.render('about', { title: 'Our page' });
});

app.use((req, res) => { // handelling 404 page
    res.status(404).render('404', { title: 'Not Found' });
});
