//Express est un framework qui permet de simplifier la mise en place de serveurs node.
//On importe express (npm install express pour l'obtenir).
const express = require('express');

//Ce module vous permet d’interpréter, d’où le nom “parser”, le corps JSON d’une réponse HTTP.
//On importe body-parser (npm install body-parser pour l'obtenir).
  const bodyParser = require('body-parser');

//Mongoose est un package qui facilite les interactions avec notre base de données MongoDB.
//On importe mongoose (npm install mongoose pour l'obtenir).
  const mongoose = require('mongoose');


//On importe le fichier ./routes/stuff.js et ./routes/user.js
  const userRoutes = require('./routes/user');
  


//Connexion a mongoose Atlas, la bdd mongoDB
  mongoose.set('strictQuery', false);
  mongoose.connect('mongodb+srv://tof:Montotof14@cluster0.dsfuudj.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));
 


const app = express();


//Fonction express appelée MIDDLEWARE recevant "request" et "response"
//Recois aussi une chaine de cractere correspondant au chemin vers le front end
//Il possède le cas échéant la méthode next() permettant de passer à la MIDDLEWARE suivante
    

//Permet de déblouqer les appels entre des serveurs différents ( la par exemple entre localhost:3000, celui du front et localhost:4200,celui du back)
//Doit être le tout premier MIDDLEXARE
    app.use((req, res, next) => {
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        next();
    });

//Intercepte toute requete de type JSON pour le mettre dans le body (utile pour le POST)
  app.use(bodyParser.json());

//On configure les chemins vers routes
  app.use('/api/auth', userRoutes);

//On exporte app
  module.exports = app;