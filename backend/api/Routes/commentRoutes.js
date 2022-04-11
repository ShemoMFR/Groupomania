const { createComment, getCommentsByPost, deleteComment } = require('../Controllers/commentControllers');

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth');

/* ROUTER COMMENTS */ 
router.post('/createComment', checkToken, createComment);
router.get('/getCommentsByPost/:id', checkToken, getCommentsByPost);
router.delete('/deleteComment', checkToken, deleteComment);

module.exports = router;  