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

      // Récupération des données du formulaire
      const newUserAccount = {
        email: data.email,
        password: data.password
      };

      // Recuperation des account user
        axios({
          method: 'get',
          url: `http://localhost:5000/users/${newUserAccount.email}`
        })
        .then(function (response) { 
          if ( response.data ) {
            setisExistAccount(true)
            setMsgCompte('Le compte existe déja');
          }else{
            // Enregistrement du nouvel user account
            axios({
              method: 'post',
              url: 'http://localhost:5000/users',
              data: newUserAccount
            }).then(function () {
              setisExistAccount(false)
              Toast.fire({
                icon: 'success',
                title: "Le compte a bien été créé !",         
              })
            }).catch(({ response }) => { 
              console.log(response); 
            })
          }   
        }); 

    }


  return (
    <FormloginCreate 
      datas={AddUser}
      isExistAccount={isExistAccount}
      MsgCompte={MsgCompte}
    />
  );
}

export default LoginCreate;

