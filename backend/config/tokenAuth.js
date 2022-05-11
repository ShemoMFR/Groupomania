const jwt = require('jsonwebtoken');

exports.checkToken = (req, res, next) =>{
    let token = req.get('Authorization');

    if (token) {
        token = token.slice(7);
        jwt.verify(token, "secretkey", (err, decoded) => {
            if (err) {
                res.json({
                    success: 0,
                    message: "Token invalid"
                })
            } else {
                next();
            }

        })
    } else {
        res.json({
            success: 0,
            message: 'Access denied !'
        })
    }
}

exports.checkTokenS = (req, res, next) => {
    let token = req.get('Authorization');

    const id = req.body.userId;
    const method = req.method;

    if (token) {
        token = token.slice(7);
        jwt.verify(token, "secretkey", (err, decoded) => {

            if (method === "DELETE") {

                if (decoded.result.id == id || decoded.result.groupe === 'admin') {
                    next();
                    
                } else {
                    res.json({
                        success: 0,
                        message: "Access Token invalid"
                    })
                }

            } else {
                res.json({
                    success: 0,
                    message: "Access Token invalid"
                })
            };

            if (err) {
                res.json({
                    success: 0,
                    message: "Token invalid"
                })
            }
        })
    } else {
        res.json({
            success: 0,
            message: 'Access denied !'
        })
    }
}

