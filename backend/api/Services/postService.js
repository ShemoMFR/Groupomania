const pool = require('../../config/database');

exports.createPost = (data, callback) => {
    pool.query(`INSERT INTO posts(idUser, pseudo, date, message) 
    values(?,?,?,?)`,
        [
            data.idUser,
            data.pseudo,
            data.date,
            data.message,
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.getLikes = (data, callback) => {
    pool.query(`SELECT * FROM posts JOIN likes ON posts.ID = likes.postId WHERE likes.postId = ?`,
        [data], 
        (error, results, fields) => {
            if (error) {
                return callback(error)
            };
            
            return callback(null, results)
        }
    )
}

exports.getPosts = (callback) => {
    pool.query(`SELECT idUser, pseudo, date, message, ID FROM posts`,
    [], (error, results, fields) => {
        if (error) {
            return callback(error);
        }
        return callback(null, results);
    })
}