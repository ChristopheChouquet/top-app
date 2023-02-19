//bcrypt permet de hash les mot de passe.
//On importe bcrypt (npm install bcrypt pour l'obtenir).
import bcrypt from 'bcrypt';

//jsonwebtoken permet créer et viérifier des tokens d'authentifications.
//On importe jsonwebtoken (npm install jsonwebtoken pour l'obtenir).
import jwt  from 'jsonwebtoken';


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
        .catch(error => res.status(400).json({ message: 'Utilisateur déja existant !' }));
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

//On créé le middleware permettant de se log
export const login = (req, res, next) => {
    
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
                    //On inclut le token dans un cookie avec la méthode res.cookie()
                    res.cookie('token', jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET',
                        { expiresIn: '24h' }
                    ));
                    //On revoie l'id et le token dans la réponse
                    res.status(200).json({
                        userId: user._id, 
                        token: jwt.sign(
                            { userId: user._id },
                            'RANDOM_TOKEN_SECRET',
                            { expiresIn: '24h' }
                        )
                    });
                }
            })
            .catch(error => res.status(500).json({ error }));
        }
    })
    .catch(error => res.status(500).json({ error }));
};


//On créé le middleware permettant de se deco
export const logout = (req, res, next) => {
    
    res.clearCookie('token');
    res.status(200).json({ message: 'Déconnecté avec succès' });
};