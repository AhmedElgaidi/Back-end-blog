const express = require('express');

// Import my controllers
const articleController = require('../controllers/articleController');

// Create my express Router instance
const router = express.Router();

//===================================
// My article routes
router.get('/', articleController.article_index);
router.get('/create', articleController.article_create_get);
router.post('/create', articleController.article_create_post);
router.get('/edit/:id', articleController.article_edit_get);
router.put('/edit/:id', articleController.article_edit_put);
router.get('/:slug/', articleController.article_details);
router.delete('/:id', articleController.article_delete);


// Export the Router instance
module.exports = router; 