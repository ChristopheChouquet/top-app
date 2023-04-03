//jsonwebtoken permet créer et viérifier des tokens d'authentifications.
//On importe jsonwebtoken (npm install jsonwebtoken pour l'obtenir).
import jwt from 'jsonwebtoken';

//Importation du model requis pour les nouveaux tops
import Top from "../models/TopModel.js";
 
 
export const getAllTops = (req, res, next) => {
    Top.find()
    .then(tops => res.status(200).json(tops))
    .catch(error => res.status(400).json({ error }));
};

export const saveTop = (req, res, next) => {
    
    //On récupère le token du header
    const tokenHeader = req.headers.authorization.split(' ')[1];
    //On le décode
    const decodedToken = jwt.verify(tokenHeader, 'RANDOM_TOKEN_SECRET_kfjhfsdjfhsdhfdsj6767232300YYHDBD');
    //On en extrait le userId
    const userId = decodedToken.userId;
    //On cré le nouveau top 
    const newTop = new Top({
        userId: userId,
        titre: req.body.titre,
        motCle: req.body.motCle,
        choix: {}
    });
    
    //On aprcours tous les choix
    for (let i = 1; i <= 10; i++) {
        newTop.choix[`choix${i}`] = req.body.choix[`choix${i}`];
    }
    //on l'ajoute dans la badd
    newTop.save()
    .then((top) => res.status(201).json({ message: 'Top Créé !', top }))
    .catch(error => res.status(400).json({ error }));
    
};
