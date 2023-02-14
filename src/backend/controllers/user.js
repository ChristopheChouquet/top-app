//bcrypt permet de hash les mot de passe.
//On importe bcrypt (npm install bcrypt pour l'obtenir).
const bcrypt = require('bcrypt');

//jsonwebtoken permet créer et viérifier des tokens d'authentifications.
//On importe jsonwebtoken (npm install jsonwebtoken pour l'obtenir).
    const jwt = require('jsonwebtoken');

//On importe le fichier ../models/User.js.
    const User = require('../models/User');


//On créé le middleware permettant de créé un nouvel utilisateur
    exports.signup = (req, res, next) => {
        //On hash le mot de passe recu
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                password: hash
            });
            user.save()
            .then(() => res.status(201).json({ message: 'Utilisateur Créé !'}))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
    };


//On créé le middleware permettant de se log
    exports.login = (req, res, next) => {
        User.findOne({email: req.body.email })
        .then( user => {
            if (user === null) {
                    res.status(401).json({ message: 'Paire identifiant/Mot de passe incorrect'});
            }else{
                bcrypt.compare(req.body.password, user.password)
                .then( valid => {
                    if (!valid) {
                        res.status(401).json({ message: 'Paire identifiant/Mot de passe incorrect'});
                    }else{
                        res.status(200).json({
                            userId: user._id,
                            //On utilise la methode sign() de jsonwebtoken pour chiffrer un token
                                token: jwt.sign(
                                    //On envoie le user ID dans notre token pour bien identifié l'utilisateur a chaque requete
                                        {userId: user._id},
                                    //on créé une chaine aléatoire qui doit etre dur a trouver qui sert a de clé de déchiffrement.
                                        'RANDOM_TOKEN_SECRET',
                                    //On créé une date d'expiration
                                        { expiresIn: '24h'}
                                )
                        });
                    }
                })
                .catch(error => res.status(500).json({ error }));
            }
        })
        .catch(error => res.status(500).json({ error }));
    };