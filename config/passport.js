var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const config = require('../config/database');


module.exports = function(passport){
    let opts = {};
    console.log("Hittt")
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('JWT');
    opts.secretOrKey = 'secret';
    passport.use(new JwtStrategy(opts, (jwt_payload, done)=>{
        console.log(jwt_payload);
        User.getUserById(jwt_payload._id,(err,user)=>{
            if(err){
                return done(err, false);
            }

            if(user){
                return done(null, user);
            }else{
                return done(null, false);
            }
        })
    }))
}