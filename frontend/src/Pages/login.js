import { useState } from 'react';
import axios from "axios";

import Formlogin from '../Components/Formlogin';


function Login() {

  //Gestion du useState de vérification si le compte existe ou non
    const [UserAccountisOK, setUserAccountisOK] = useState(false);

  //Gestion du message d'erreur
    const [MsgCompte, setMsgCompte] = useState('');

  //Gestion de la connexion user
    function loginConnect(data) {

      const InfoUser = {email: data.email, password: data.password};

      // Recuperation des account user
        const form_data = new FormData();
        for ( var key in InfoUser ) {
            form_data.append(key, InfoUser[key]);
        }
        form_data.append('ConnectUSer', 'ConnectUSer');
        axios({
          method: 'post',
          url: 'http://localhost/WISHLIST%20REACT/whishlist_v2/src/Datas/datas_ctrl.php',
          data: form_data
        }).then(function (response) {
          if (response.data !== 'NOPE') {
            sessionStorage.setItem('UserAccountisOK', true);
            setUserAccountisOK(true);
            setMsgCompte('');
            
          }else{
            sessionStorage.setItem('UserAccountisOK', false);
            setUserAccountisOK(false);
            setMsgCompte('Aucun compte associé');
          }
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