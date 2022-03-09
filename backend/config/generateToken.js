const jwt = require('jsonwebtoken');

exports.tokenSecretgenerateToken = (user) =>{
    const tokenSecret = 'my-token-secret';
    return jwt.sign({data:user}, tokenSecret, {expiresIn: '1h'});
}

