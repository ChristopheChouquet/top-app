import FormTopCreate from '../Components/FormTopCreate';
import Header from '../Components/Header';
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import Footer from '../Components/Footer';


function TopCreate() {

    // initialisation de l'objet navigate
    const navigate = useNavigate(); 

    useEffect(() => {
        //On récupère le cookie
            const cookie = document.cookie;
        // Recherche du token d'authentification dans le cookie
            const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));
        // Extrait la valeur du token d'authentification
            const tokenValue = token ? token.split('=')[1] : null;
            var verifAuth = typeof tokenValue !== 'undefined' && tokenValue !== null ? true : false;
            !verifAuth && navigate('/login');

        //On enlève les classes des icones du footer
        const footer = document.getElementById('footer').children[0].children[0];
        for (let index = 0; index < 3; index++) {
            const footerSVG = footer.children[index].children[0].children;
            for (let indexSVG = 0; indexSVG < footerSVG.length; indexSVG++) {
                const element = footerSVG[indexSVG];
                element.classList.remove('stroke-primary');
                element.classList.add('stroke-tertiary-300'); 
            }
        }
            
            
            

    // eslint-disable-next-line
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
        console.log('datasForm', datasForm);

        const cookie = document.cookie;

        // Recherche du token d'authentification dans le cookie
        const token = cookie.split(';').find(c => c.trim().startsWith(`auth`));

        // Extrait la valeur du token d'authentification
        const tokenValue = token ? token.split('=')[1] : null;

        // Enregistrer le nouveau top 
        axios({
            method: 'post',
            url: 'http://localhost:5000/tops',
            data: datasForm,
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
            <FormTopCreate datas={SaveTop} />
            <Footer/>
        </>
        
    )
    
}

export default TopCreate;