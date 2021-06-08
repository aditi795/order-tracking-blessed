const {Strategy, ExtractJwt} = require('passport-jwt');

require('dotenv').config();

const secret = process.env.AUTH_SECRET

const User = require('./models/user')

const cookieExtractor = req => {
  let jwt = null 

  if (req && req.cookies) {
      jwt = req.cookies['jwt']
  }

  return jwt
}


const opts = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: secret
}

module.exports = passport => {
  passport.use(
    new Strategy(opts, (payload, done) =>{
      User.findByPk(payload.id)
        .then(user=>{
          if(user){
            return done(null, user)
            }
          else{
            return done(null, false)
          }
        })
        .catch(err => console.error(err));
      })
  )
}