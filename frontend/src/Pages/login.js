import { useEffect, useState } from 'react';
import axios from "axios";

import Formlogin from '../Components/Formlogin';
import { useNavigate } from 'react-router-dom';

import { UserContext } from '../UserContext';
import { useContext } from 'react';


function Login() {

  //Gestion du useState de vérification si le compte existe ou non
  const [UserAccountisOK, setUserAccountisOK] = useState(false);
  //Gestion du message d'erreur
  const [MsgCompte, setMsgCompte] = useState('');
  // initialisation de l'objet navigate
  const navigate = useNavigate();  
  const { userDonne, setUserDonne } = useContext(UserContext);


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

            //Je mets mon UserContext à jour avec les donnée de l'utilisateur connecté
            setUserDonne(response.data);
            //Je mets également ces donnée dans le localStorage en cas de rafraichissement de la page 
            localStorage.setItem('userData', JSON.stringify(response.data));



            setUserAccountisOK(true);
            setMsgCompte('');
            navigate('/loader');
        }).catch(() => { 
            setUserAccountisOK(false);
            setMsgCompte('Aucun compte associé');
        }); 

    }

    /* useEffect(() => {
      console.log('mon usercontext', userDonne);
    }, [userDonne]); */


  return (

    <Formlogin 
      datas={loginConnect}
      isExistAccount={UserAccountisOK}
      MsgCompte={MsgCompte} 
    /> 

  );
}

export default Login;