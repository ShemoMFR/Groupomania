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

exports.isLiked = (data, callback) => {
    pool.query(`SELECT * FROM likes WHERE postId = ? AND userId = ?`,
    [data.postId, data.userId],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            };

            if (results.length > 0) {
                return callback(null, false)
            } else {
                return callback(null, true)
            }
        })
}

/* exports.getLikeNbr = (data, callback) => {
    pool.query(`SELECT likes FROM posts WHERE ID = ?`,
    [data],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            };

            return callback(null, results[0].likes)
        }
    )
} */

exports.getPosts = (callback) => {
    pool.query(`SELECT idUser, pseudo, date, message, likes, ID FROM posts`,
    [], (error, results, fields) => {
        if (error) {
            return callback(error); 
        }
        return callback(null, results);
    })
}