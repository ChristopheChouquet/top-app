import '../styles/CreateTop.css';

import FormTopCreate from '../Components/FormTopCreate';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function TopCreate() {

    // initialisation de l'objet navigate
        const navigate = useNavigate(); 

    //Settigs des alertes
        const Toast = Swal.mixin({
            toast: true,
            position: 'bottom',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: false
        })

        

    function SaveTop(datasForm) {

        const newTop = {
          titre: datasForm.titre,
          motCle: datasForm.motCle,
          choix: {
            choix1: datasForm.choix1,
            choix2: datasForm.choix2,
            choix3: datasForm.choix3,
            choix4: datasForm.choix4,
            choix5: datasForm.choix5,
            choix6: datasForm.choix6,
            choix7: datasForm.choix7,
            choix8: datasForm.choix8,
            choix9: datasForm.choix9,
            choix10: datasForm.choix10,
          }
        };

        // Enregistrer le nouveau top 
        axios({
            method: 'post',
            url: 'http://localhost:5000/tops',
            data: newTop
        }).then(function () {
            Toast.fire({
                icon: 'success',
                title: "Le top a bien été ajouté !",         
            })
            navigate('/');
        }).catch(({ response }) => { 
            console.log(response); 
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