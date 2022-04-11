const pool = require('../../config/database');

exports.createComment = (data, callback) => {
    pool.query(`INSERT INTO comments(userId, pseudo, date, comment, postId)
    values(?,?,?,?,?)`,
        [
            data.userId,
            data.pseudo,
            data.date,
            data.comment,
            data.postId,
        ],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.deleteComment = (data, callback) => {
    pool.query(`DELETE FROM comments WHERE Id = ?`,
    [data],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        }
    )
}

exports.getCommentsByPost = (data, callback) => {
    pool.query(`SELECT * FROM comments WHERE postId = ?`,
        [data],
        (error, results, fields) => {
            if (error) {
                return callback(error)
            }
            return callback(null, results)
        })
}