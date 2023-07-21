//bcrypt permet de hash les mot de passe.
//On importe bcrypt (npm install bcrypt pour l'obtenir).
import bcrypt from 'bcrypt';

//jsonwebtoken permet créer et viérifier des tokens d'authentifications.
//On importe jsonwebtoken (npm install jsonwebtoken pour l'obtenir).
import jwt  from 'jsonwebtoken';


//Importation du model requis pour les nouveaux
import User from "../models/UserModel.js";

//Fonction pour éviter les que les abonnements dans la BDD ne soit unique
/* User.collection.dropIndex({ abonnement: 1 }, (err, result) => {
    if (err) {
      console.log('Erreur lors de la suppression de l\'index unique : ', err);
    } else {
      console.log('Index unique supprimé avec succès : ', result);
    }
  }); */

//Pour l'upload des fichiers
import axios from 'axios';
import fs from 'fs';

 
export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const getUsersById = (req, res, next) => {
    const userId = req.params.userId;

    User.find({ _id: userId })
    .then(tops => res.status(200).json(tops))
    .catch(error => res.status(400).json({ error }));
};

export const getUserProfil = async (req, res) => {
    const tagName = req.params.tagName;

    User.findOne({ tagName: tagName })
    .then(user => res.status(200).json(user))
    .catch(error => res.status(400).json({ error }));
}
 


export const saveUser = (req, res, next) => {
    //On hash le mot de passe recu, 10 correspond au nombre d'itération, cela rend plus sécure mais pas trop lent 
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
        const user = new User({
            avatar: req.body.avatar,
            banniere: req.body.banniere,
            pseudo: req.body.pseudo,
            tagName: req.body.tagName,
            email: req.body.email,
            password: hash,
            motCles: req.body.motCles
        });
        user.save()
        .then(() => res.status(201).json({ message: 'Utilisateur Créé !'}))
        .catch(error => res.status(400).json({ message: 'Utilisateur déja existant !' }));
    })
    .catch(error => res.status(500).json({ error }));
};
 

//Mise à jour des utilisateur depuis le profil
export const updateUser = (req, res) => {
    const { IDuser, avatar, pseudo, motCles } = req.body;

    if (avatar !== null) {
        axios
        .get(avatar, { responseType: 'arraybuffer' })
        .then((response) => {
            // Écrivez le contenu de l'image dans le fichier
            const fileName = IDuser + "_avatar.jpg"; // Nom de fichier souhaité
            const destinationPath = "../frontend/public/img/avatar/" + fileName; // Remplacez par le chemin de votre dossier final
    
            fs.writeFile(destinationPath, response.data, 'binary', (err) => {
            if (err) {
                console.error("Erreur lors de l'enregistrement de l'image :", err);
                return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'image" });
            }

                User.updateOne({ _id: IDuser }, { $set: { avatar: "img/avatar/" + fileName, pseudo: pseudo, motCles: motCles } })
                    .then(() => {
                        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
                    })
                    .catch((error) => {
                        res.status(400).json({ message: error.message });
                    });
            
            });
        })
        .catch((error) => {
            console.error("Erreur lors du téléchargement de l'image :", error);
            return res.status(500).json({ error: "Erreur lors du téléchargement de l'image" });
        });
        
    }else{
        User.updateOne({ _id: IDuser }, { $set: { pseudo: pseudo, motCles: motCles } })
            .then(() => {
                res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
            })
            .catch((error) => {
                res.status(400).json({ message: error.message });
            });
    }
    

    
  };





//Mise à jour des utilisateur depuis le profil
export const updateAvatarUser = (req, res) => {
    const { avatar, IDuser } = req.body; // Obtenez l'URL de l'image du corps de la requête
  
    axios
      .get(avatar, { responseType: 'arraybuffer' })
      .then((response) => {
        // Écrivez le contenu de l'image dans le fichier
        const fileName = IDuser + "_avatarCropped.jpg"; // Nom de fichier souhaité
        const destinationPath = "../frontend/public/img/avatar/" + fileName; // Remplacez par le chemin de votre dossier final
  
        fs.writeFile(destinationPath, response.data, 'binary', (err) => {
          if (err) {
            console.error("Erreur lors de l'enregistrement de l'image :", err);
            return res.status(500).json({ error: "Erreur lors de l'enregistrement de l'image" });
          }
    
          // Envoyez une réponse indiquant que l'image a été enregistrée avec succès
          res.json({ message: "Image enregistrée avec succès" });

          console.log("img/avatar/" + fileName);

          /* User.updateOne({ _id: IDuser }, { $set: { avatar: "img/avatar/" + fileName } })
            .then(() => {
                res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
            })
            .catch((error) => {
                res.status(400).json({ message: error.message });
            }); */
          
        });
      })
      .catch((error) => {
        console.error("Erreur lors du téléchargement de l'image :", error);
        return res.status(500).json({ error: "Erreur lors du téléchargement de l'image" });
      });
};




//Ajout d'un abonnement dans les donnée de l'utilisateur actuel
export const addUserAbo = (req, res, next) => {
    const { UserCurrent, UserAbo } = req.body;
    
    User.findById(UserCurrent)
        .then(user => {
            user.abonnement.push(UserAbo);
            return user.save();
        })
        .then(() => res.status(200).json({ message: "Abonnement mis à jour avec succès" }))
        .catch(error => res.status(400).json({ error }));

};




//suppresion d'un abonnement dans les donnée de l'utilisateur actuel
export const delUserAbo = (req, res, next) => {
    const { UserCurrent, UserAbo } = req.body;
    User.updateOne({ _id: UserCurrent }, { $pull: { abonnement: UserAbo }})
        .then(() => res.status(200).json({ message: "Abonnement supprimé avec succès" }))
        .catch(error => res.status(400).json({ error }));
};

 
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
                    //On cré le token qui comprend l'id de l'user, la phrase secrete et le temps d'expiration
                    const token = jwt.sign(
                        { userId: user._id },
                        'RANDOM_TOKEN_SECRET_kfjhfsdjfhsdhfdsj6767232300YYHDBD',
                        { expiresIn: '24h' }
                    );
                    //On inclut le token dans un cookie avec la méthode res.cookie()
                    res.cookie('token', token);    
                    //On inclut le token dans le header Authorization
                    res.set('Authorization', `Bearer ${token}`);
                    //On revoie l'id et le token dans la réponse
                    res.status(200).json({
                        userId: user._id,
                        pseudo: user.pseudo, 
                        tagName: user.tagName, 
                        email: user.email,
                        token: token,
                        
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