const { createUser, getUserByUserId, getUsers, updateUser, deleteUser } = require("./controllers");
const router = require('express').Router();

router.post('/createUser', createUser);
router.get('/', getUsers);
router.get('/:id', getUserByUserId);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;