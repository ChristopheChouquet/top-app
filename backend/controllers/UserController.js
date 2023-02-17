//bcrypt permet de hash les mot de passe.
//On importe bcrypt (npm install bcrypt pour l'obtenir).
import bcrypt from 'bcrypt';

//Importation du model requis pour les nouveaux
import User from "../models/UserModel.js";
 
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}
 

export const getUserByemail = (req, res) => {
    User.findOne({email: req.params.email}).exec()
    .then(user => {
        res.json(user);
    })
    .catch(error => {
        res.status(404).json({ error });
    });
};
 
export const saveUser = (req, res, next) => {
    //On hash le mot de passe recu, 10 correspond au nombre d'itération, cela rend plus sécure mais pas trop lent 
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
 
export const updateUser = async (req, res) => {
    try {
        const updateduser = await User.updateOne({_id:req.params.id}, {$set: req.body});
        res.status(200).json(updateduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}
 
export const deleteUser = async (req, res) => {
    try {
        const deleteduser = await User.deleteOne({_id:req.params.id});
        res.status(200).json(deleteduser);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
}