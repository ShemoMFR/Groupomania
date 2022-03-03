const { create, getUsers, getUserById, updateUser, deleteUser } = require('./service');
const bcrypt = require("bcrypt");

exports.createUser = (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);

    create(body, (error, results) => {
        if(error) {
            console.log(error);
            return res.status(500).json({
                success: 0,
                message: "Database connexion error"
            })
        }
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

exports.getUserByUserId = (req, res) => {
    const id = req.params.id;

    getUserById(id, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }

        if (!results) {
            return res.status(500).json({
                success: 0,
                message: "Database connexion error"
            })
        }
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

exports.getUsers = (req, res) => {
    getUsers((error, results) => {
        if (error) {
            console.log(error);
            return;
        }
      
        return res.status(200).json({
            success: 1,
            data: results
        })
    })
}

exports.updateUser = (req, res) => {
    const body = req.body;
    const salt = bcrypt.genSaltSync(10);
    body.password = bcrypt.hashSync(body.password, salt);
    updateUser(body, (error, results) => {
        if (error) {
            console.log(error);
            return;
        }
        return res.status(200).json({
            success: 1,
            message: 'updated successfully'
        })
    })
}

exports.deleteUser = (req, res) => {
    const data = req.params.id;
    deleteUser(data, (err, results) => {

        if (err) {
            console.log(err);
            return;
        }
        if (results.affectedRows == 0) {
            return res.json({
                success: 0,
                message: 'User not found'
            })
        }
        else {
            return res.json({
                success: 1,
                message: 'User successfully deleted'
            })
        }
    })
}