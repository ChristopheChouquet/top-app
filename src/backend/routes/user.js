//Express est un framework qui permet de simplifier la mise en place de serveurs node.
//On importe express (npm install express pour l'obtenir).
const express = require('express');

//la calsse express.Router() permet de créer des gestionnaires de routes.
    const router = express.Router();

//On importe notre fichier user.js    
    const userCtrl = require('../controllers/user');

//On applique nos fonctions créés dans ../controllers/user aux déférentes méthodes GET, POST, PUT et DELETE. 
    router.post('/createlogin', userCtrl.signup);
    router.post('/', userCtrl.login);
   
//On exporte router
    module.exports = router;