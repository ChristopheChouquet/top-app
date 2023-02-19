import axios from "axios";
import { useNavigate    } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import { useEffect, useState } from "react";

function Home() {

    // initialisation de l'objet navigate
        const [top, setTop] = useState([]); 

    useEffect(() => {
        axios({
            method: 'get',
            url: 'http://localhost:5000/tops'
        }).then((response) => {
            console.log(response.data); 
            setTop(response.data);
        }).catch((error) => { 
            console.error(error);
        }); 
    }, []);

    // initialisation de l'objet navigate
        const navigate = useNavigate(); 

    

    //Gestion de la connexion user
        function logout() {  
            
            axios({
                method: 'post',
                url: 'http://localhost:5000/logout'
            }).then(function (response) {
                console.log(response); 
                navigate('/login');
            }).catch(() => { 
                
            }); 
    
        }


    return(
        <>
            <Header/>
            <div id="home">
                <h1>C'est le Wall !!</h1>
                <button type="submit" onClick={logout}>deco</button>

                {top.map(top => (
                    <div key={top._id}>
                        <h3>{top.titre}</h3>
                        <p>{top.motCle}</p>
                        <p>{top.choix.choix1}</p>
                        <p>{top.choix.choix2}</p>
                        <p>{top.choix.choix3}</p>
                        <p>{top.choix.choix4}</p>
                        <p>{top.choix.choix5}</p>
                        <p>{top.choix.choix6}</p>
                        <p>{top.choix.choix7}</p>
                        <p>{top.choix.choix8}</p>
                        <p>{top.choix.choix9}</p>
                        <p>{top.choix.choix10}</p>
                    </div>
                ))}
            </div>
            <Footer/>
        </>
    )
}

export default Home;