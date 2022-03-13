const { createUser, getUserByUserId, getUsers, updateUser, deleteUser, authenticateUser } = require("../Controllers/userControllers");

const router = require('express').Router();
const { checkToken } = require('../../config/tokenAuth')

/* ROUTES USER */
router.post('/createUser', createUser);
router.post('/login', authenticateUser)
router.get('/', checkToken, getUsers);
router.get('/:id', checkToken, getUserByUserId);
router.put('/:id', checkToken, updateUser);
router.delete('/:id', checkToken, deleteUser);

module.exports = router; 