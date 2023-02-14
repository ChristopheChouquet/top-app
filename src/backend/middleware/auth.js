//jsonwebtoken permet créer et viérifier des tokens d'authentifications.
//On importe jsonwebtoken (npm install jsonwebtoken pour l'obtenir).
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try{
        //On récupere le token dans le header (trouvable l'onglet reseau de la console chrome).
        //Il est nécessaire de split  le resultat car cette chaine est composé de 2 mot dont le premier est Bearer qu'on ne veux pas récupérer
            const token = req.headers.authorization.split(' ')[1];
        //On décode le token recu
            const decodedToken = jwt.verify( token, 'RANDOM_TOKEN_SECRET');
        //On récupere le user ID qui a été placé dans le token précédemment
            const userId = decodedToken.userId;
        //On transmet le user ID a la requete qui sera elle transmise au routes en ajoutant un objet auth a la requet
            req.auth = {
                userId: userId
            };
    }catch(error){
        res.status(401).json({ error });
    }
}