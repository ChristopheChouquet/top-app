//Importation du model requis pour les nouveaux tops
import Top from "../models/TopModel.js";
 
 
export const getAllTops = (req, res, next) => {
    Top.find()
    .then(tops => res.status(200).json(tops))
    .catch(error => res.status(400).json({ error }));
  };


export const saveTop = (req, res, next) => {
    

    const newTop = new Top({
        titre: req.body.titre,
        motCle: req.body.motCle,
        choix: {}
    });
    
    for (let i = 1; i <= 10; i++) {
        newTop.choix[`choix${i}`] = req.body.choix[`choix${i}`];
    }

    newTop.save()
    .then((top) => res.status(201).json({ message: 'Top Créé !', top }))
    .catch(error => res.status(400).json({ error }));
    
};
