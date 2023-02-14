//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
//On importe mongoose (npm install mongoose pour l'obtenir).
const mongoose = require('mongoose');

//mongoose-unique-validator est un package qui sert a rendre unqiue une validation comme ci-dessous avoir une seule personne qui se connecte avec le mail.
//On importe mongoose-unique-validator (npm install mongoose-unique-validator pour l'obtenir).
    const uniqueValidator = require('mongoose-unique-validator');


//Construction du schéma de notre BDD
    const userSchema = mongoose.Schema({
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }
    });

//Un seul utilisateur par adresse mail
    userSchema.plugin(uniqueValidator); 

//On exporte notre schéma
    module.exports = mongoose.model('User', userSchema);