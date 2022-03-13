const pool = require('../../config/database');

exports.createPost = (data, callback) => {
    pool.query(`INSERT INTO posts(id, pseudo, date, message) 
    values(?,?,?,?)`,
        [
            data.id,
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