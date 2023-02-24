import { useState } from 'react';
import axios from "axios";

import Formlogin from '../Components/Formlogin';
import { useNavigate } from 'react-router-dom';


function Login() {

  //Gestion du useState de vérification si le compte existe ou non
    const [UserAccountisOK, setUserAccountisOK] = useState(false);

  //Gestion du message d'erreur
    const [MsgCompte, setMsgCompte] = useState('');

  // initialisation de l'objet navigate
    const navigate = useNavigate();   

  //Gestion de la connexion user
    function loginConnect(data) {

      const InfoUser = {
        email: data.email,
        password: data.password
      };
      
      axios({
          method: 'post',
          url: 'http://localhost:5000/login',
          data: InfoUser
        }).then(function (response) {
          
          // Définition du nom du cookie et de la valeur à stocker
            const cookieName = 'auth';
            const tokenValue = response.data.token;

            // Définition de la date d'expiration du cookie (facultatif)
            const expirationDate = new Date();
            expirationDate.setDate(expirationDate.getDate() + 1); // Expire dans 1 jours

            // Création de la chaîne de caractères qui représente le cookie
            const cookieString = `${cookieName}=${tokenValue};expires=${expirationDate.toUTCString()};path=/`;

            // Stockage du cookie dans le navigateur
            document.cookie = cookieString;

            setUserAccountisOK(true);
            setMsgCompte('');
            navigate('/');
        }).catch(() => { 
            setUserAccountisOK(false);
            setMsgCompte('Aucun compte associé');
        }); 

    }


  return (

    <Formlogin 
      datas={loginConnect}
      isExistAccount={UserAccountisOK}
      MsgCompte={MsgCompte} 
    /> 

  );
}

export default Login;