import { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'

import FormloginCreate from '../Components/FormloginCreate';

function LoginCreate() {

  //Settigs des alertes
    const Toast = Swal.mixin({
      toast: true,
      position: 'bottom',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: false
    })

  //Gestion du useState de vérification si le compte existe ou non
    const [isExistAccount, setisExistAccount] = useState(true);

  //Gestion du message d'erreur
    const [MsgCompte, setMsgCompte] = useState('');

  //Ajout des nouveuax users dans la base de donnée
    function AddUser(data) {
      console.log(data);
      // Enregistrement du nouvel user account
        axios({
          method: 'post',
          url: 'http://localhost:5000/signup',
          data: data
        }).then((response) => {
          setisExistAccount(false)
          Toast.fire({
            icon: 'success',
            title: response.data.message,         
          })
        }).catch(({ response }) => { 
          setMsgCompte(response.data.message);
        })

    }


  return (
    <>
      <FormloginCreate 
      datas={AddUser}
      isExistAccount={isExistAccount}
      MsgCompte={MsgCompte}
      />
    </>
    
  );
}

export default LoginCreate;

