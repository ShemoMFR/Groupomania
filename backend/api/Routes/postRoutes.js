const { createPost, getPosts, getLikes, addLike, isLiked, deletePost } = require('../Controllers/postControllers');

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth');

/* ROUTER POST */ 
router.post('/createPost', checkToken, createPost);
router.post('/getLikes', checkToken, getLikes);
router.put('/addLike', checkToken, addLike);
router.get('/', checkToken, getPosts);
router.delete('/deletePost', checkToken, deletePost);

module.exports = router;  