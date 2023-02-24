import '../styles/CreateTop.css';

import FormTopCreate from '../Components/FormTopCreate';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';


function TopCreate() {

    // initialisation de l'objet navigate
    const navigate = useNavigate(); 

    useEffect(() => {
        const cookie = document.cookie;

        // Recherche du token d'authentification dans le cookie
        const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));

        // Extrait la valeur du token d'authentification
        const tokenValue = token ? token.split('=')[1] : null;
        var verifAuth = typeof tokenValue !== 'undefined' && tokenValue !== null ? true : false;
        !verifAuth && navigate('/login');
    }, []);

    

    //Settigs des alertes
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false
        })

        

    function SaveTop(datasForm) {
        

        const cookie = document.cookie;

        // Recherche du token d'authentification dans le cookie
        const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));

        // Extrait la valeur du token d'authentification
        const tokenValue = token ? token.split('=')[1] : null;

        const newTop = {
          titre: datasForm.titre,
          motCle: datasForm.motCle,
          choix: {
            choix1: datasForm.choix01,
            choix2: datasForm.choix02,
            choix3: datasForm.choix03,
            choix4: datasForm.choix04,
            choix5: datasForm.choix05,
            choix6: datasForm.choix06,
            choix7: datasForm.choix07,
            choix8: datasForm.choix08,
            choix9: datasForm.choix09,
            choix10: datasForm.choix10,
          }
        };

        // Enregistrer le nouveau top 
        axios({
            method: 'post',
            url: 'http://localhost:5000/tops',
            data: newTop,
            headers: {
              Authorization: 'Bearer ' + tokenValue
            }
        }).then(function () {
            Toast.fire({
                icon: 'success',
                title: "Le top a bien été ajouté !",         
            })
            navigate('/');
        }).catch(({ error }) => { 
            console.log(error); 
        });

    }


    return(
        <>
            <Header/>
            <FormTopCreate datas={SaveTop}/>
            <Footer/>
        </>
    )
    
}

export default TopCreate;