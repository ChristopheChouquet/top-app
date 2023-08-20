//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
//On importe mongoose (npm install mongoose pour l'obtenir).
import mongoose from "mongoose";

//mongoose-unique-validator est un package qui sert a rendre unqiue une validation comme ci-dessous avoir une seule personne qui se connecte avec le mail.
//On importe mongoose-unique-validator (npm install mongoose-unique-validator pour l'obtenir).
import uniqueValidator from "mongoose-unique-validator";
 
const User = mongoose.Schema({
    avatar:{
        type: String,
        required: true
    },
    banniere:{
        type: String,
        required: true
    },
    pseudo:{
        type: String,
        required: true
    },
    tagName:{
        type: String,
        required: true,
        unique: true
    },
    motCles: {
        chip1: {
            type: String
        },
        chip2: {
            type: String
        },
        chip3: {
            type: String
        },
        chip4: {
            type: String
        },
        chip5: {
            type: String
        }
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    abonnement: [{
        type: String,
        default: null
    }],
    date: {
        type: Date,
        default: Date.now
    }
});

//Un seul utilisateur par adresse mail
    User.plugin(uniqueValidator); 
 
export default mongoose.model('Users', User);