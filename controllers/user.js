const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

//SIGNUP
exports.signup = (request, response, next) =>{
    bcrypt.hash(request.body.password, 10)
    .then(hash =>{
        const user = new User({
            email: request.body.email,
            password : hash
        });
        user.save()
            .then(() => response.status(201).json({message: "utilisateur créé !"}))
            .catch(error => response.status(400).json({error}));
    })
    .catch(error => response.status(500).json({error}));
};

//LOGIN
exports.login = (request, response, next) =>{
    User.findOne({email: request.body.email})
    .then(user => {
        if(!user){
            response.status(401).json({message:"identifiant/mot de passe incorecte"})
        }
        else{
            bcrypt.compare(request.body.password, user.password)
            .then(valid =>{
                if(!valid){
                    response.status(401).json({message:"identifiant/mot de passe incorecte"})
                }
                else{
                    const newToken = jwt.sign(
                        { userId: user._id },
                        process.env.TOKEN_KEY,
                        { expiresIn: '24h' }
                    );
                    response.status(200).json({
                        userId :user._id,
                        token: newToken
                    });
                }
            })
            .catch(error => response.status(500).json({error}))
        } 
    })
    .catch(error => {response.status(500).json({error})})
};