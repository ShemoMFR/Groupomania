const { createPost, getPosts } = require('../Controllers/postControllers');

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth');

/* ROUTER POST */ 
router.post('/createPost', checkToken, createPost);
router.get('/', checkToken, getPosts);

module.exports = router; 