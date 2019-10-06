const jwt = require('jsonwebtoken');
const config = require('../config/database');


module.exports.validateToken = function(req, callback){
    var token = req.headers['x-access-token'];
    //if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    const isValid = false;
    jwt.verify(token, config.secret, function(err, decoded) {
    if (err)
    {
        callback(false, "Failed to authenticate token.");
    }else{
        callback(true, "Validated");
    }
    
    // return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // res.status(200).send("dsfdsfds");
  });
}