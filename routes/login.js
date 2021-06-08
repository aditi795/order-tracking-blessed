const express = require('express');
var loginController = require('../controllers/loginController')

var LoginRouter = express.Router();

const User = require('../models/user');

require('dotenv').config();
const secret = process.env.AUTH_SECRET;

const passport = require('passport');
const jwt = require('jsonwebtoken');

//function authenticate(req, res, next)

LoginRouter.route('/')
    .get(loginController.loginHome)
    
LoginRouter.route('/authenticate')
    .post((req, res) => {
        const email = req.body.email;
        const password = req.body.password;
            const user = User.authenticateUser(email, password)
            .then( (user) => {
                console.log("LOGIN ROUTE")
                console.log(user)
                    const token = jwt.sign({email: user.email}, secret, {expiresIn: 36000}, 
                    (err, token) => {
                          if(err){
                              res.status(500).json({error: "error signing token", raw: err});
                          }
                          res.cookie('jwt',token, {
                                  httpOnly: true,
                                  secure: false //--> SET TO TRUE ON PRODUCTION
                              }
                          )
                          res.redirect('/dashboard')
                    });
                })
            .catch( (err) => {
                res.status(401).json({error: "STOP RIGHT THERE CRIMINAL SCUM"})
            })
            
            })

module.exports = LoginRouter;