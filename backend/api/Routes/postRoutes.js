const { createPost, getPosts, getLikes, addLike, isLiked } = require('../Controllers/postControllers');

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth');

/* ROUTER POST */ 
router.post('/createPost', checkToken, createPost);
router.post('/getLikes', checkToken, getLikes);
router.put('/addLike', checkToken, addLike);
router.get('/', checkToken, getPosts);

module.exports = router;  