const { createComment, getCommentsByPost } = require('../Controllers/commentControllers');

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth');

/* ROUTER COMMENTS */ 
router.post('/createComment', checkToken, createComment);
router.get('/getCommentsByPost/:id', checkToken, getCommentsByPost);

module.exports = router;  