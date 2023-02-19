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
          console.log(response); 
            setUserAccountisOK(true);
            setMsgCompte('');
            console.log("ok connect");
            navigate('/');
        }).catch(() => { 
            setUserAccountisOK(false);
            setMsgCompte('Aucun compte associé');
            console.log("pas le droit connect");
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