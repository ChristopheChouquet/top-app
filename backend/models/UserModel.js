//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
//On importe mongoose (npm install mongoose pour l'obtenir).
import mongoose from "mongoose";

//mongoose-unique-validator est un package qui sert a rendre unqiue une validation comme ci-dessous avoir une seule personne qui se connecte avec le mail.
//On importe mongoose-unique-validator (npm install mongoose-unique-validator pour l'obtenir).
import uniqueValidator from "mongoose-unique-validator";
 
const User = mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});
 
export default mongoose.model('Users', User);