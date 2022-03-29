const { createPost, getPosts, getLikes, addLike } = require('../Controllers/postControllers');

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth');

/* ROUTER POST */ 
router.post('/createPost', checkToken, createPost);
router.post('/getLikes', checkToken, getLikes);
router.post('/addLike', checkToken, addLike);
/* router.get('/getLikesNbr', checkToken, getLikesNbr); */
router.get('/', checkToken, getPosts);

module.exports = router;  