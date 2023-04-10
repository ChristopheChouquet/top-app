//import axios from "axios";
import { useEffect } from "react";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

function FavDay() {

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
            
    // eslint-disable-next-line
    }, []); 


    useEffect(() => {

        /* axios({
            method: 'get',
            url: 'http://localhost:5000/favday'
        }).then((response) => {
            setUser(response.data);
        }).catch((error) => {  
            console.error(error);
        });  */  

    }, []);

    return(
        <>
            <Header/>
            <div className="bg-primary h-screen">
                <h1 className="pt-20 text-center text-tertiary-100 font-black">FAV DAY EN COURS</h1>
            </div>
            <Footer SelectedIcon={"3"}/>
        </>
    )
    
}
export default FavDay;